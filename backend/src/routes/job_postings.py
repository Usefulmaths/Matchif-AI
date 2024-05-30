from fastapi import APIRouter, HTTPException, File, UploadFile, Depends
from pathlib import Path
import os
from typing import List, Dict, Any
import logging

from src.clients.weaviate_client import WeaviateClient
from src.services.user_service import UserService
from src.services.job_service import JobService
from src.utils.pdf_utils import extract_text_from_pdf

logger = logging.getLogger(__name__)
router = APIRouter()

UPLOAD_DIR = "uploads"


def save_file(file: UploadFile, upload_dir: str = UPLOAD_DIR) -> Path:
    """Save the uploaded file to the specified directory."""
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    file_location = Path(upload_dir) / file.filename
    os.makedirs(file_location.parent, exist_ok=True)
    with file_location.open("wb") as f:
        f.write(file.file.read())
    return file_location


def remove_file(file_location: Path) -> None:
    """Remove the specified file if it exists."""
    if file_location.exists():
        file_location.unlink()


def add_user_profile_and_get_vector(
    user_service: UserService, pdf_text: str
) -> List[float]:
    """Add user profile to Weaviate and get the corresponding vector."""
    uuid = user_service.add_user_profile(user_description=pdf_text)
    data_object = user_service.fetch_user_profile_by_uuid(uuid)
    return data_object.vector["default"]


def get_job_postings(
    job_service: JobService, user_profile_vector: List[float], limit: int = 10
) -> List[Dict[str, Any]]:
    """Retrieve job postings from Weaviate that match the user profile vector."""
    job_postings = job_service.get_job_postings_near_vector(
        user_profile_vector, limit=limit
    )
    return [
        {
            "title": obj.properties.get("title", "N/A"),
            "company": obj.properties.get("company_name", "N/A"),
            "location": obj.properties.get("location", "N/A"),
            "min_salary": obj.properties.get("min_salary", 0.0),
            "max_salary": obj.properties.get("max_salary", 0.0),
            "currency": obj.properties.get("currency", "N/A"),
            "work_type": obj.properties.get("formatted_work_type", "N/A"),
            "experience_level": obj.properties.get("formatted_experience_level", "N/A"),
            "application_url": obj.properties.get("application_url", "N/A"),
            "description": obj.generated,
            
        }
        for obj in job_postings
    ]


async def get_services() -> Dict[str, Any]:
    """Get initialised services for dependency injection."""
    client = WeaviateClient().get_client()
    return {"user_service": UserService(client), "job_service": JobService(client)}


@router.post("/upload_and_create_profile")
async def upload_and_create_profile(
    file: UploadFile = File(...), services: Dict[str, Any] = Depends(get_services)
) -> Dict[str, Any]:
    """Endpoint to upload a PDF, create a user profile, and get matching job postings."""
    file_location = save_file(file)

    try:
        # Extract text from PDF
        text = extract_text_from_pdf(file_location)

        # Add user profile and get vector
        user_profile_vector = add_user_profile_and_get_vector(
            services["user_service"], text
        )

        # Retrieve job postings
        job_postings_data = get_job_postings(
            services["job_service"], user_profile_vector
        )

        return {"job_postings": job_postings_data}

    except HTTPException as e:
        logger.error(f"HTTPException: {e.detail}")
        raise e
    except Exception as e:
        logger.error(f"Exception: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up by removing the uploaded file
        remove_file(file_location)
