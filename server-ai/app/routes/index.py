from fastapi import APIRouter
from app.utils.doc_scan import doc_scan

router = APIRouter()

@router.get('/')
async def root():
    doc_scan()
    return {"/": "succeed"}