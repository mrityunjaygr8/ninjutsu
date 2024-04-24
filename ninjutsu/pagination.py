from ninja.pagination import PaginationBase
from ninja import Schema
from pydantic import Field
from django.db.models import QuerySet
from typing import Any, List
from ninja.conf import settings


class CustomPageNumberPagination(PaginationBase):
    class Input(Schema):
        page: int = Field(1, ge=1)
        page_size: int = Field(settings.PAGINATION_PER_PAGE, ge=1)

    class Output(Schema):
        items: List[Any]
        page: int
        page_size: int
        items_count: int
        page_count: int

    def paginate_queryset(
        self,
        queryset: QuerySet,
        pagination: Input,
        **params: Any,
    ) -> Any:
        offset = (pagination.page - 1) * pagination.page_size
        total_items = self._items_count(queryset)
        page_count = (total_items + pagination.page_size - 1) // pagination.page_size
        return {
            "items": queryset[offset : offset + pagination.page_size],
            "page": pagination.page,
            "page_size": pagination.page_size,
            "items_count": total_items,
            "page_count": page_count,
        }  # noqa: E203
