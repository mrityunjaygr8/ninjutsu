from typing import List


from ninja.pagination import RouterPaginated
from .schema import VillageSchema, VillageCreateSchema
from .models import Village

from pydantic import UUID4
from ninjutsu.schema import NotFoundError
from django.shortcuts import get_object_or_404

village_router = RouterPaginated()


@village_router.get("/", response=List[VillageSchema])
def get_villages(request):
    return Village.objects.all()


@village_router.post("/", response=VillageSchema)
def create_village(request, village: VillageCreateSchema):
    created_village = Village.objects.create(**village.dict())
    return created_village


@village_router.delete("{village_id}", response={204: None, 404: NotFoundError})
def delete_ninja(request, village_id: UUID4):
    village = get_object_or_404(Village, id=village_id)
    village.delete()
    return 204, None