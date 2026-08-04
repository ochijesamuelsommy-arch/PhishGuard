import requests
from datetime import datetime


def get_whois_info(domain):
    try:
        url = f"https://rdap.org/domain/{domain}"

        response = requests.get(url, timeout=10)

        if response.status_code != 200:
            raise Exception("RDAP lookup failed")

        data = response.json()

        registrar = "Unknown"

        if "entities" in data:
            for entity in data["entities"]:
                roles = entity.get("roles", [])
                if "registrar" in roles:
                    vcard = entity.get("vcardArray", [])
                    if len(vcard) > 1:
                        for field in vcard[1]:
                            if field[0] == "fn":
                                registrar = field[3]
                                break

        creation_date = None
        expiration_date = None

        for event in data.get("events", []):
            if event.get("eventAction") == "registration":
                creation_date = event.get("eventDate")

            if event.get("eventAction") == "expiration":
                expiration_date = event.get("eventDate")

        age_days = "Unknown"

        if creation_date:
            created = datetime.fromisoformat(
                creation_date.replace("Z", "+00:00")
            )

            age_days = (
                datetime.now(created.tzinfo) - created
            ).days

            creation_date = created.strftime("%Y-%m-%d")

        else:
            creation_date = "Unknown"

        if expiration_date:
            expires = datetime.fromisoformat(
                expiration_date.replace("Z", "+00:00")
            )

            expiration_date = expires.strftime("%Y-%m-%d")

        else:
            expiration_date = "Unknown"

        return {
            "registrar": registrar,
            "creation_date": creation_date,
            "expiration_date": expiration_date,
            "age_days": age_days,
        }

    except Exception:
        return {
            "registrar": "Unknown",
            "creation_date": "Unknown",
            "expiration_date": "Unknown",
            "age_days": "Unknown",
        }