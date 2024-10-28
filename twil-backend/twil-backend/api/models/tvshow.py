import uuid
from typing import Optional, Union
from pydantic import BaseModel, Field
from datetime import date

class TvShow(BaseModel):
    title: str = Field(...)
    premiered: Union[date, None]
    imdb: Optional[str]
    rating: Optional[float]
    tvmaze_id: Optional[int]
    summary: Optional[str]