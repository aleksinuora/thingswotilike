import pymongo
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from api.routes import router as people_router
from config import DB_URI


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.mongodb_client = pymongo.MongoClient(DB_URI)
    app.db = app.mongodb_client["Twil"]
    print("Connected to MongoDB")
    print(app.db.list_collection_names())
    yield
    print("Closing connection")
    app.mongodb_client.close()

app = FastAPI(lifespan=lifespan)
origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
app.include_router(people_router, tags=["people"], prefix="/api")

@app.get('/')
async def frontpage():
    print('testing')
    return 'testing'