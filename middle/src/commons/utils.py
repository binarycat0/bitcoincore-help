STATUS_OK = 'ok'
STATUS_ERROR = 'error'

response_ok = lambda result, message: dict(status=STATUS_OK, result=result, message=message)
response_error = lambda message: dict(status=STATUS_ERROR, message=message)
