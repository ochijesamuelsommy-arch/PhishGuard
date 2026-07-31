from app.services.validator import is_valid_url
from app.services.domain_info import get_domain_info


def scan_url(url: str):
    if not is_valid_url(url):
        return {
            "url": url,
            "status": "INVALID URL",
            "overall_risk_score": 0,
            "confidence": "High",
            "message": "Please enter a valid URL.",
            "local_scan": {
                "score": 0,
                "status": "Invalid URL",
                "reasons": ["Please enter a valid URL."]
            },
            "domain_info": None
        }

    score = 100
    reasons = []

    if "@" in url:
        score -= 30
        reasons.append("URL contains '@'.")

    if len(url) > 75:
        score -= 20
        reasons.append("URL is unusually long.")

    if url.startswith("http://"):
        score -= 20
        reasons.append("Website is not using HTTPS.")

    suspicious_words = [
        "login",
        "verify",
        "bank",
        "secure",
        "update",
        "account"
    ]

    for word in suspicious_words:
        if word in url.lower():
            score -= 10
            reasons.append(f"Contains suspicious word: {word}")

    local_score = max(score, 0)

    if local_score >= 70:
        final_status = "SAFE"
        confidence = "High"
        message = "No phishing indicators detected."
    else:
        final_status = "SUSPICIOUS"
        confidence = "Medium"
        message = "Exercise caution before visiting this website."

    return {
        "url": url,
        "status": final_status,
        "overall_risk_score": 100 - local_score,
        "confidence": confidence,
        "message": message,
        "local_scan": {
            "score": local_score,
            "status": final_status,
            "reasons": reasons
        },
        "domain_info": get_domain_info(url)
    }