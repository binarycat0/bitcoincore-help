import os
from distutils.util import strtobool

BITCOINCORE_HOST = os.getenv('BITCOINCORE_HOST', '127.0.0.1')
BITCOINCORE_PORT = os.getenv('BITCOINCORE_PORT', '19011')
BITCOINCORE_PROTOCOL = os.getenv('BITCOINCORE_PROTOCOL', 'http')

BITCOINCORE_USER = os.getenv('BITCOINCORE_USER', 'admin')
BITCOINCORE_PASSWORD = os.getenv('BITCOINCORE_PASSWORD', 'password')

BITCOINCORE_API = '{}://{}:{}'.format(
    BITCOINCORE_PROTOCOL,
    BITCOINCORE_HOST,
    BITCOINCORE_PORT
)

DEBUG = strtobool(os.getenv('DEBUG', 'false'))
LOGGING_LEVEL = os.getenv('LOGGING_LEVEL', 'DEBUG' if DEBUG else 'INFO')

LOGGING_CONFIG = {
    'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s',
    'level': LOGGING_LEVEL,
}
