import uuid
from typing import Optional, List, Union
from pydantic import BaseModel, Field


class Person(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    tvmaze_id: Optional[int]
    credits_id: Optional[str]

    class Config:
        populate_by_name = True

class PersonToAdd(BaseModel):
    name: str = Field(...)
    api_specific_id: int = Field(...)

class PersonUpdate(BaseModel):
    name: Optional[str]
    tvmaze_id: Optional[int]
    credits_id: Optional[str]

class PersonSearchResult(BaseModel):
    score: Union[int, float, None]
    name: str = Field(...)
    tvmaze_id: Optional[int]
