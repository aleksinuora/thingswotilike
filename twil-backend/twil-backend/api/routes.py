from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List, Union

from api.models.person import Person, PersonSearchResult, PersonToAdd
from api.models.credit import Credits, WatchListEntry, WatchListEntryToAdd
from api.models.tvshow import TvShow
from api.outgoing_requests import find_tv_person, get_tv_credits

router = APIRouter()

@router.get("/people", response_description="Get a list of followed people", response_model=List[Person])
def list_people(request: Request):
    people = list(request.app.db['people'].find(limit=50))
    return people

@router.get("/people/{id}", response_description="Get a person by id", response_model=Union[Person, None])
def get_person(id: str, request: Request):
    if (person := request.app.db['people'].find_one({'_id': id})) is not None:
        return person
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Could not find person with ID {id} in the database')

@router.get('/credits/aggregate_credits/{id}', response_description='Get a person\'s crew credits by outside api id', response_model=Credits)
def aggregate_credits(id: int, request: Request):
    response = get_tv_credits(id)
    return jsonable_encoder(response)

@router.get('/credits', response_description='Get all credits in the database', response_model=List[Credits])
def get_credits(request: Request):
    credits = list(request.app.db['credit'].find(limit=100))
    return credits

@router.get('/watch_list', response_description='Get watch list of interesting works', response_model=List[WatchListEntry])
def get_watch_list(request: Request):
    watch_list = list(request.app.db['watch_list'].find(limit=100))
    return watch_list

@router.get('/credits/{id}', response_description='Get collected credits by person id', response_model=Credits)
def get_credits_by_id(id: str, request: Request):
    if (credits := request.app.db['credit'].find_one({'person_id': id})) is not None:
        return credits
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Could not find credits for a person with ID {id} in the database')

@router.get('/people/search/{name}', response_description='Search for a person by name', response_model=List[PersonSearchResult])
def search_person(name: str, request: Request):
    response = find_tv_person(name)
    return response

@router.post('/people/', response_description="Create a listing for a person", status_code=status.HTTP_201_CREATED, response_model=Union[Person, None])
def create_person(request: Request, person_to_add: PersonToAdd = Body(...)):
    if request.app.db['people'].count_documents({'name': person_to_add.name}, limit = 1) != 0:
        return request.app.db['people'].find_one({'name': person_to_add.name})
    api_specific_id = person_to_add.api_specific_id
    new_name = person_to_add.name
    person_to_add = jsonable_encoder(Person(
        name = new_name,
        tvmaze_id = api_specific_id,
        credits_id = None
    ))
    new_person = request.app.db['people'].insert_one(person_to_add)    
    credits_to_add = get_tv_credits(api_specific_id)
    credits_to_add.person_id = new_person.inserted_id
    credits_to_add.person_name = new_name
    new_credits = request.app.db['credit'].insert_one(jsonable_encoder(credits_to_add))
    added_person = request.app.db['people'].update_one(
        {'_id': new_person.inserted_id}, {"$set": {'credits_id': new_credits.inserted_id}}
    )
    added_person = request.app.db['people'].find_one(
        {'_id': new_person.inserted_id}
    )

    return added_person

@router.post('/watch_list', response_description='Add an entry to the watch list', status_code=status.HTTP_201_CREATED, response_model=WatchListEntry)
def create_watch_list_entry(request: Request, entry_to_add: WatchListEntryToAdd = Body(...)):
    if request.app.db['watch_list'].count_documents({'tvmaze_id': entry_to_add.credit_details.work.tvmaze_id}, limit = 1) == 0:
        entry = jsonable_encoder(WatchListEntry(
            person_name = entry_to_add.person_name,
            credit_details = entry_to_add.credit_details
        ))
        added_entry = request.app.db['watch_list'].insert_one(entry)
        return_entry = request.app.db['watch_list'].find_one(
            {'_id': added_entry.inserted_id}
        )
        return return_entry
    
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f'Entry already exists')
    

@router.delete('/people/{id}', response_description='Remove a person')
def delete_person(id: str, request: Request, response: Response):
    deleted_person = request.app.db['people'].delete_one({'_id': id})
    request.app.db['credit'].delete_many({'person_id': id})

    if deleted_person.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'No person with ID {id} found')