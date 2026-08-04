import requests


PHISHTANK_URL = "https://checkurl.phishtank.com/checkurl/"


def check_phishtank(url: str):
    try:
        response = requests.post(
            PHISHTANK_URL,
            data={
                "url": url,
                "format": "json"
            },
            timeout=10
        )

        if response.status_code != 200:
            return {
                "found": False,
                "verified": False,
                "message": "Unable to contact PhishTank."
            }

        data = response.json()

        results = data.get("results", {})

        return {
            "found": results.get("in_database", False),
            "verified": results.get("verified", False),
            "valid": results.get("valid", False),
            "phish_id": results.get("phish_id"),
        }

    except Exception as e:
        return {
            "found": False,
            "verified": False,
            "message": str(e)
        }