from urllib.parse import urlparse
import dns.resolver
import requests


def get_domain_info(url: str):
    parsed = urlparse(url)

    protocol = parsed.scheme.upper()
    hostname = parsed.hostname or "Unknown"

    port = parsed.port
    if port is None:
        port = 443 if parsed.scheme == "https" else 80

    path = parsed.path if parsed.path else "/"

    ip_address = "Unavailable"
    country = "Unknown"
    city = "Unknown"
    organization = "Unknown"
    asn = "Unknown"

    try:
        # Resolve the IP address
        answers = dns.resolver.resolve(hostname, "A")
        ip_address = answers[0].to_text()

        # Query ipinfo.io
        response = requests.get(
            f"https://ipinfo.io/{ip_address}/json",
            timeout=5
        )

        if response.status_code == 200:
            data = response.json()

            country = data.get("country", "Unknown")
            city = data.get("city", "Unknown")
            organization = data.get("org", "Unknown")

            # Extract ASN from org
            if organization.startswith("AS"):
                parts = organization.split(" ", 1)
                asn = parts[0]
                if len(parts) > 1:
                    organization = parts[1]

    except Exception as e:
        print(f"Domain lookup error: {e}")

    return {
        "domain": hostname,
        "protocol": protocol,
        "hostname": hostname,
        "port": port,
        "path": path,
        "https": parsed.scheme == "https",
        "ip_address": ip_address,
        "country": country,
        "city": city,
        "organization": organization,
        "asn": asn
    }