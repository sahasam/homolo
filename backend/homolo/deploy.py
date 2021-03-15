from homolo.base import *

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'db',
        'PORT': '5432',
    }
}

ALLOWED_HOSTS = ['172.20.0.3']

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000"
]
