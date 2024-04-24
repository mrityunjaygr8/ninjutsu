from ninja import NinjaAPI
from villages.api import village_router
from nin.api import nin_router
from .orjson import ORJSONRenderer, ORJSONParser

api = NinjaAPI(renderer=ORJSONRenderer(), parser=ORJSONParser())

api.add_router("villages", village_router)
api.add_router("nin", nin_router)


@api.get("/ping")
def ping(request, name="person"):
    return f"pong {name}"
