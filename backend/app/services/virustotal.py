import requests
import time
from app.config import VIRUSTOTAL_API_KEY


def check_url(url: str):
    headers = {
        "x-apikey": VIRUSTOTAL_API_KEY
    }

    try:
        response = requests.post(
            "https://www.virustotal.com/api/v3/urls",
            headers=headers,
            data={"url": url},
            timeout=10
        )

        print("POST STATUS:", response.status_code)
        print("POST RESPONSE:", response.text)

        response.raise_for_status()

        analysis_id = response.json()["data"]["id"]

        max_attempts = 20

        for _ in range(max_attempts):

            result = requests.get(
                f"https://www.virustotal.com/api/v3/analyses/{analysis_id}",
                headers=headers,
                timeout=10
            )

            print("GET STATUS:", result.status_code)
            print("GET RESPONSE:", result.text)

            result.raise_for_status()

            data = result.json()

            if data["data"]["attributes"]["status"] == "completed":
                break

            time.sleep(1)

        else:
            return {
                "url": url,
                "status": "UNKNOWN",
                "risk_score": 0,
                "message": "VirusTotal analysis timed out.",
                "harmless": 0,
                "malicious": 0,
                "suspicious": 0,
                "undetected": 0
            }

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
            "undetected": stats["undetected"]
        }

    except requests.RequestException as e:
        return {
            "url": url,
            "status": "ERROR",
            "risk_score": 0,
            "message": f"VirusTotal request failed: {str(e)}",
            "harmless": 0,
            "malicious": 0,
            "suspicious": 0,
            "undetected": 0
        }