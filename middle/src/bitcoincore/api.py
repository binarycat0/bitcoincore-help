import logging
import typing
from copy import copy

import aiohttp

from settings import BITCOINCORE_API, BITCOINCORE_PASSWORD, BITCOINCORE_USER

logger = logging.getLogger(__name__)


def with_session(func: typing.Callable):
    async def wrap(*args, **kwargs):
        async with aiohttp.ClientSession(auth=aiohttp.BasicAuth(BITCOINCORE_USER, BITCOINCORE_PASSWORD)) as session:
            params = copy(kwargs)
            params.update(session=session)
            return await func(*args, **params)

    return wrap


@with_session
async def json_rpc_request(request_method, request_id, *request_params, **kwargs):
    session = kwargs.get('session')
    data = dict(jsonrpc="1.0", method=request_method, id=request_id, params=request_params)

    async with session.post(BITCOINCORE_API, json=data, ) as response:
        logger.debug('%s %s', response.status, response.content_type)
        logger.debug('response.reason %s', response.reason)

        if not response.status == 200:
            text = await response.text()
            logger.debug('response.text %s', text)

            try:
                json = await response.json()
                return False, json.get('error')
            except Exception as ex:
                return False, '{} {} {}'.format(response.status, response.reason, text)

        try:
            json = await response.json()
        except Exception as ex:
            logger.error(ex)
            return False, str(ex)

        error = json.get('error')
        if error:
            return False, error

        return True, json.get('result')


async def get_help(command: None) -> typing.Tuple[bool, str]:
    params = [] if command is None else [command]
    return await json_rpc_request('help', 'getbitcoincorehelp', *params)


async def send_test_request(method_name, params) -> typing.Tuple[bool, typing.Any]:
    logger.debug('method_name %s', method_name)
    logger.debug('params %s', params)

    return await json_rpc_request(method_name, 'test_request', *params)
