from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pathlib import Path

router = APIRouter()

@router.get("/")
async def read_index():
    return FileResponse('frontend/build/index.html')

@router.get("/{full_path:path}")
async def read_static(full_path: str):
    file_path = Path(f'frontend/build/{full_path}')
    if file_path.exists():
        return FileResponse(file_path)
    else:
        raise HTTPException(status_code=404, detail="File not found")
