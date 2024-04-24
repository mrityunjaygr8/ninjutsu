from uuid import uuid4
from django.db import models
from villages.models import Village


# Create your models here.
class Nin(models.Model):
    name = models.CharField(max_length=200)
    id = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    village = models.ForeignKey(
        Village, blank=True, null=True, on_delete=models.SET_NULL
    )
