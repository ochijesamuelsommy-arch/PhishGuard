from urllib.parse import urlparse

def is_valid_url(url: str):
    parsed = urlparse(url)
    return all([parsed.scheme, parsed.netloc])