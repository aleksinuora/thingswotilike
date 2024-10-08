from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))

class ApiUrls:
    TV_API_URL = environ.get('TV_API_URL')

DB_URI = environ.get('MONGODB_URI')