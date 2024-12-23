from typing import List, Optional, Union
import uuid
from pydantic import BaseModel, Field
from api.models.tvshow import TvShow

from constants import MediumEnum

class CreditDetails(BaseModel):
    work: Union[TvShow, str]
    medium: MediumEnum
    role_type: str = Field(...)

class Credits(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    person_id: Optional[str]
    person_name: Optional[str]
    credit_details: List[CreditDetails]
    
class WatchListEntry(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias='_id')
    person_name: str = Field(...)
    credit_details: CreditDetails

class WatchListEntryToAdd(BaseModel):
    person_name: str = Field(...)
    credit_details: CreditDetails
