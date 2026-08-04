import socket
import ssl
from datetime import datetime


def get_ssl_info(hostname):
    try:
        context = ssl.create_default_context()

        with socket.create_connection((hostname, 443), timeout=5) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert = ssock.getpeercert()

        issued_to = dict(x[0] for x in cert["subject"]).get("commonName", "Unknown")
        issuer = dict(x[0] for x in cert["issuer"]).get("commonName", "Unknown")

        valid_from = datetime.strptime(
            cert["notBefore"],
            "%b %d %H:%M:%S %Y %Z"
        )

        valid_to = datetime.strptime(
            cert["notAfter"],
            "%b %d %H:%M:%S %Y %Z"
        )

        days_remaining = (valid_to - datetime.utcnow()).days

        return {
            "status": "Valid",
            "issued_to": issued_to,
            "issuer": issuer,
            "valid_from": valid_from.strftime("%Y-%m-%d"),
            "valid_to": valid_to.strftime("%Y-%m-%d"),
            "days_remaining": days_remaining
        }

    except Exception as e:
        return {
            "status": "Unavailable",
            "issued_to": "Unknown",
            "issuer": "Unknown",
            "valid_from": "-",
            "valid_to": "-",
            "days_remaining": "-",
            "error": str(e)
        }