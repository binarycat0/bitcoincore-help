import argparse
import logging

import aiohttp_cors
from aiohttp import web

from bitcoincore import api
from commons.utils import response_ok, response_error
from settings import LOGGING_CONFIG

logging.basicConfig(
    **LOGGING_CONFIG
)

routes = web.RouteTableDef()


@routes.get('/')
@routes.get('/{message}')
async def index(request: web.Request) -> web.StreamResponse:
    message = request.match_info.get('message', 'index')
    return web.json_response(data=response_ok(None, message))


@routes.get('/help/')
@routes.get('/help/{command}')
async def help(request: web.Request) -> web.StreamResponse:
    command = request.match_info.get('command', None)
    ok, result = await api.get_help(command)

    if ok:
        data = response_ok(result, 'ok')
    else:
        data = response_error(result)

    return web.json_response(data=data)


@routes.post('/test_request/')
async def test_request(request: web.Request) -> web.StreamResponse:
    body = await request.json()

    params = body.get('params', [])
    method = body.get('method', None)


    if not method:
        return web.json_response(data=response_error('method is required parameter'))

    ok, result = await api.send_test_request(method, params)

    return web.json_response(data=response_ok(result, 'ok'))


async def main_web_app():
    app = web.Application()
    app.add_routes(routes=routes)

    # Configure default CORS settings.
    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
        )
    })

    # Configure CORS on all routes.
    for route in list(app.router.routes()):
        cors.add(route)

    return app


def main(**params):
    web.run_app(main_web_app(), **params)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="aiohttp server")
    parser.add_argument('--host', type=str, default='127.0.0.1', help='host')
    parser.add_argument('--port', type=int, default=8000, help='port')
    args = parser.parse_args()

    main(host=args.host, port=args.port)
