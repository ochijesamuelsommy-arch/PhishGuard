from urllib.parse import urlparse


def get_domain_info(url: str):
    parsed = urlparse(url)

    protocol = parsed.scheme.upper()

    hostname = parsed.hostname or "Unknown"

    port = parsed.port

    if port is None:
        port = 443 if parsed.scheme == "https" else 80

    path = parsed.path if parsed.path else "/"

    return {
        "domain": hostname,
        "protocol": protocol,
        "hostname": hostname,
        "port": port,
        "path": path,
        "https": parsed.scheme == "https"
    }