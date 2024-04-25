from ninja import ModelSchema, Schema, FilterSchema
from .models import Nin
from villages.schema import VillageSchema
from pydantic import UUID4, Field
from typing import Optional
from django.db.models import Q

class NinSchema(ModelSchema):
    village: VillageSchema | None = None

    class Meta:
        model = Nin
        fields = "__all__"


class NinCreateSchema(Schema):
    village_id: UUID4 | None = None
    name: str

class NinFilterSchema(FilterSchema):
    village_name: Optional[str] = Field(None, q="village__name")
    village_id: Optional[UUID4] = None
    only_unaffiliated: Optional[bool] = None

    def filter_only_unaffiliated(self, value: bool) -> Q:
        return Q(village__isnull=True) if value is True else Q()