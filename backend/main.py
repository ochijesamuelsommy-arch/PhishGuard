from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.services.scanner import scan_url
from app.services.virustotal import check_url
from app.services.domain_info import get_domain_info
from app.services.ssl_info import get_ssl_info
from app.services.whois_info import get_whois_info
from app.services.google_safe_browsing import check_safe_browsing

app = FastAPI()

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


@app.get("/domain")
def domain(url: str):
    return get_domain_info(url)


@app.get("/ssl")
def ssl(url: str):
    info = get_domain_info(url)
    return get_ssl_info(info["hostname"])


@app.get("/whois")
def whois_lookup(url: str):
    info = get_domain_info(url)
    return get_whois_info(info["hostname"])


@app.get("/virustotal")
def virustotal(url: str):
    return check_url(url)


@app.get("/safebrowsing")
def safebrowsing(url: str):
    return check_safe_browsing(url)