from typing_extensions import Self
from ninja import ModelSchema, Schema
from typing import List, Optional

from pydantic import UUID4, model_validator
from .models import Team
from villages.schema import VillageSchema
from nin.schema import NinSchema

class TeamSchema(ModelSchema):
    village: VillageSchema | None = None
    members: List[NinSchema] | None = None
    leader: NinSchema | None = None

    class Meta:
        model = Team
        fields = "__all__"

class TeamCreateSchema(Schema):
    name: str
    village_id: Optional[UUID4] | None = None
    member_ids: Optional[List[UUID4]] | None = None
    leader_id: Optional[UUID4] | None = None

    @model_validator(mode="after")
    def validate_leader_in_members(self) -> Self:
        if (self.leader_id or self.member_ids) and not (self.leader_id and self.member_ids):
            raise ValueError("If either the leader id or the member ids is specified, the other must also be specified")
        if self.leader_id and self.member_ids and self.leader_id not in self.member_ids:
            raise ValueError("Leader must be in the members list.")
        return self