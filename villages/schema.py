from ninja import ModelSchema, Schema
from .models import Village


class VillageSchema(ModelSchema):
    class Meta:
        model = Village
        fields = ["id", "name"]


class VillageCreateSchema(Schema):
    name: str
