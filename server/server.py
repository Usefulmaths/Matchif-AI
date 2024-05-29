from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.config.config import config
from src.routes import job_postings, static_files

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(job_postings.router, prefix="/api/job_postings")
app.include_router(static_files.router, prefix="/static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
