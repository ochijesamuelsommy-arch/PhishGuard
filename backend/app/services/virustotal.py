import requests
import time
from app.config import VIRUSTOTAL_API_KEY


def check_url(url: str):
    headers = {
        "x-apikey": VIRUSTOTAL_API_KEY
    }

    response = requests.post(
        "https://www.virustotal.com/api/v3/urls",
        headers=headers,
        data={"url": url}
    )

    analysis_id = response.json()["data"]["id"]

    while True:
        result = requests.get(
            f"https://www.virustotal.com/api/v3/analyses/{analysis_id}",
            headers=headers
        )

        data = result.json()

        if data["data"]["attributes"]["status"] == "completed":
            break

        time.sleep(1)

    stats = data["data"]["attributes"]["stats"]

    malicious = stats["malicious"]
    suspicious = stats["suspicious"]

    if malicious > 0:
        status = "DANGEROUS"
        risk_score = 100
        message = "This URL has been flagged as malicious."

    elif suspicious > 0:
        status = "SUSPICIOUS"
        risk_score = 70
        message = "This URL looks suspicious. Be careful."

    else:
        status = "SAFE"
        risk_score = 0
        message = "No security vendor detected this URL as malicious."

    return {
        "url": url,
        "status": status,
        "risk_score": risk_score,
        "message": message,
        "harmless": stats["harmless"],
        "malicious": malicious,
        "suspicious": suspicious,
        "undetected": stats["undetected"]
    }