from django.db import models
from villages.models import Village
from uuid import uuid4
from nin.models import Nin
from django.core.exceptions import ValidationError

# Create your models here.
class Team(models.Model):
    name = models.CharField(max_length=200)
    id = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    village = models.ForeignKey(
        Village, blank=True, null=True, on_delete=models.SET_NULL
    )
    members = models.ManyToManyField(
        Nin, related_name="teams"
    )
    leader = models.ForeignKey(Nin, blank=True, null=True, on_delete=models.SET_NULL, related_name="leader")

    def clean(self):
        super().clean()
        if self.leader and self.leader not in self.members.all():
            raise ValidationError("The leader must be a member of the team.")
