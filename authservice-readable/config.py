import os
TESTING = False
DEBUG = True
FLASK_ENV = 'development'
SECRET_KEY = 'GDtfDCFYjD'
REDIS_URL = "redis://:@redis_db:6379/0"
BASE_URL = "/api/v1"
JWT_SECRET = os.getenv("JWT_SECRET")
