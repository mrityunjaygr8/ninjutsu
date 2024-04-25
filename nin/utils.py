from pydantic import UUID4
from .models import Nin

def nin_exists(id: UUID4) -> bool:
    return Nin.objects.filter(id=id).exists()