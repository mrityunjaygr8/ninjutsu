from typing import List
from ninja import  Query
from .schema import NinCreateSchema, NinSchema, NinFilterSchema
from .models import Nin
from villages.models import Village
from ninja.pagination import RouterPaginated
from ninjutsu.pagination import CustomPageNumberPagination
from ninjutsu.schema import NotFoundError

nin_router = RouterPaginated()


@nin_router.get("/", response=List[NinSchema])
def get_nins(request, filters: NinFilterSchema = Query(...)):
    nins = Nin.objects.all()
    nins = filters.filter(nins)
    return nins


@nin_router.post("/", response={201: NinSchema, 404: NotFoundError})
def create_nin(request, nin: NinCreateSchema):
    if nin.village_id:
        village_exists = Village.objects.filter(id=nin.village_id).exists()
        if not village_exists:
            return 404, {"message": "Specified village does not exist"}
    create_nin = Nin.objects.create(**nin.dict())
    return 201, create_nin
