from config import ApiUrls
import requests

from api.models.person import PersonSearchResult
from api.models.credit import Credits, CreditDetails
from api.models.tvshow import TvShow
from constants import MediumEnum

def find_tv_person(name):
    response = requests.get(f'{ApiUrls.TV_API_URL}search/people?q={name}').json()
    def parse_result(search_result):
        parsed_result = PersonSearchResult(
            score = search_result['score'],
            name = search_result['person']['name'],
            tvmaze_id = int(search_result['person']['id'])
        )
        return parsed_result
    search_results = list(map(parse_result, response))
    return search_results

def get_tv_credits(id):
    response = requests.get(f'{ApiUrls.TV_API_URL}people/{id}/crewcredits?embed=show').json()
    def parse_credit(credit):
        parsed_credit = CreditDetails(
            work = TvShow(
                title = credit['_embedded']['show']['name'],
                premiered = credit['_embedded']['show']['premiered'],
                imdb = credit['_embedded']['show']['externals']['imdb'],
                rating = credit['_embedded']['show']['rating']['average'],
                tvmaze_id = int(credit['_embedded']['show']['id']),
                summary = credit['_embedded']['show']['summary']
            ),
            medium = MediumEnum.TELEVISION,
            role_type = credit['type']
        )
        return parsed_credit
    credit_list = list(map(parse_credit, response))
    return Credits(person_id=None, person_name=None, credit_details=credit_list)