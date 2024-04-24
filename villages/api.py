from ninja import Router
from typing import List

from ninjutsu.pagination import CustomPageNumberPagination

from ninja.pagination import paginate
from .schema import VillageSchema, VillageCreateSchema
from .models import Village

village_router = Router()


@village_router.get("/", response=List[VillageSchema])
@paginate(CustomPageNumberPagination)
def get_villages(request):
    return Village.objects.all()


@village_router.post("/", response=VillageSchema)
def create_village(request, village: VillageCreateSchema):
    created_village = Village.objects.create(**village.dict())
    return created_village
