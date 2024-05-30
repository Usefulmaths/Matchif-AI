from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from src.config.config import Config
from src.routes import job_postings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=Config().get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(job_postings.router, prefix="/api/job_postings")

# Mount the static files at the root URL
app.mount("/", StaticFiles(directory="/app/frontend/build", html=True), name="static")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
