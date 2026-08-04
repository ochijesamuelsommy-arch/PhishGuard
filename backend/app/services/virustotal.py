import requests
import time
from app.config import VIRUSTOTAL_API_KEY


def check_url(url: str):
    headers = {"x-apikey": VIRUSTOTAL_API_KEY}

    try:
        # Submit URL
        response = requests.post(
            "https://www.virustotal.com/api/v3/urls",
            headers=headers,
            data={"url": url},
            timeout=10,
        )

        response.raise_for_status()

        analysis_id = response.json()["data"]["id"]

        # Wait for analysis
        for _ in range(30):

            result = requests.get(
                f"https://www.virustotal.com/api/v3/analyses/{analysis_id}",
                headers=headers,
                timeout=10,
            )

            result.raise_for_status()

            data = result.json()

            attributes = data["data"]["attributes"]
            stats = attributes["stats"]

            # Wait until VirusTotal has actual results
            if (
                stats["harmless"] > 0
                or stats["malicious"] > 0
                or stats["suspicious"] > 0
                or stats["undetected"] > 0
            ):
                break

            time.sleep(2)

        malicious = stats["malicious"]
        suspicious = stats["suspicious"]

        if malicious > 0:
            status = "DANGEROUS"
            risk_score = 100
            message = "This URL has been flagged as malicious."

        elif suspicious > 0:
            status = "SUSPICIOUS"
            risk_score = 70
            message = "This URL looks suspicious."

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
            "undetected": stats["undetected"],
        }

    except Exception as e:
        return {
            "url": url,
            "status": "ERROR",
            "risk_score": 0,
            "message": str(e),
            "harmless": 0,
            "malicious": 0,
            "suspicious": 0,
            "undetected": 0,
        }