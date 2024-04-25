from typing import List


from ninja.pagination import RouterPaginated
from .schema import VillageSchema, VillageCreateSchema
from .models import Village

village_router = RouterPaginated()


@village_router.get("/", response=List[VillageSchema])
def get_villages(request):
    return Village.objects.all()


@village_router.post("/", response=VillageSchema)
def create_village(request, village: VillageCreateSchema):
    created_village = Village.objects.create(**village.dict())
    return created_village
