from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.services.scanner import scan_url
from app.services.virustotal import check_url

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Welcome to PhishGuard!"}


@app.get("/scan")
def scan(url: str):
    return scan_url(url)


@app.get("/virustotal")
def virustotal(url: str):
    return check_url(url)