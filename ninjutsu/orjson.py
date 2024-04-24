import orjson
from ninja.parser import Parser
from ninja.renderers import BaseRenderer
from typing import Dict, Any
from django.http import HttpRequest


class ORJSONParser(Parser):
    def parse_body(self, request: HttpRequest) -> Dict[str, Any]:
        return orjson.loads(request.body)


class ORJSONRenderer(BaseRenderer):
    media_type = "application/json"

    def render(self, request: HttpRequest, data: Any, *, response_status: int) -> Any:
        return orjson.dumps(data)
