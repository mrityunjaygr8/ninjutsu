from ninja.pagination import RouterPaginated
from django.shortcuts import get_object_or_404

from typing import List

from pydantic import UUID4

from nin.models import Nin
from ninjutsu.schema import NotFoundError
from team.models import Team
from team.schema import TeamCreateSchema, TeamSchema

from villages.utils import village_exists
from nin.utils import nin_exists

team_router = RouterPaginated()

@team_router.get("/", response=List[TeamSchema])
def list_teams(request):
    teams = Team.objects.all()
    return teams

@team_router.post("/", response={201: TeamSchema, 404:NotFoundError})
def create_team(request, team_values: TeamCreateSchema):
    if team_values.village_id:
        exists = village_exists(team_values.village_id)
        if not exists:
            return 404, {"message": f"Village id: {team_values.village_id} does not exists"}

    if team_values.member_ids:
        for member_id in team_values.member_ids:
            exists = nin_exists(member_id)
            if not exists:
                return 404, {"message": f"Nin id: {member_id} does not exists"}
    team_as_dict = team_values.dict()
    members = team_as_dict.pop("member_ids")
    leader_id = team_as_dict.pop("leader_id")
    team = Team.objects.create(**team_as_dict)
    team.leader = Nin.objects.get(id=leader_id)
    team.members.add(*members)
    team.save()
    return 201, team

@team_router.delete("{team_id}", response={204: None, 404: NotFoundError})
def delete_team(request, team_id: UUID4):
    team = get_object_or_404(Team, id=team_id)
    team.delete()
    return 204, None