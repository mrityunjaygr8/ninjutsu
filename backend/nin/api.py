from typing import List
from django.shortcuts import get_object_or_404
from ninja import  Query
from pydantic import UUID4
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


@nin_router.delete("{ninja_id}", response={204: None, 404: NotFoundError})
def delete_ninja(request, ninja_id: UUID4):
    ninja = get_object_or_404(Nin, id=ninja_id)
    ninja.delete()
    return 204, None