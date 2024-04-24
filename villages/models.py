from uuid import uuid4
from django.db import models

# Create your models here.


class Village(models.Model):
    name = models.CharField(max_length=200)
    id = models.UUIDField(primary_key=True, editable=True, default=uuid4)
