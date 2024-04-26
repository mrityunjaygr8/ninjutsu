from pydantic import UUID4
from .models import Village

def village_exists(id: UUID4) -> bool:
    return Village.objects.filter(id=id).exists()