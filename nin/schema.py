from ninja import ModelSchema, Schema
from .models import Nin
from villages.schema import VillageSchema
from pydantic import UUID4


class NinSchema(ModelSchema):
    village: VillageSchema | None = None

    class Meta:
        model = Nin
        fields = "__all__"


class NinCreateSchema(Schema):
    village_id: UUID4 | None = None
    name: str
