def generate_ai_analysis(scan_result):
    reasons = scan_result["local_scan"]["reasons"]

    if scan_result["status"] == "SAFE":
        return {
            "title": "AI Security Analysis",
            "summary": (
                "This website appears to be safe based on all completed security checks."
            ),
            "recommendation": (
                "You can proceed, but always verify sensitive information before entering passwords or payment details."
            )
        }

    explanation = []

    for reason in reasons:
        explanation.append(reason)

    return {
        "title": "AI Security Analysis",
        "summary": (
            "Several phishing indicators were detected during analysis."
        ),
        "recommendation": (
            "Avoid visiting this website unless you completely trust the source."
        ),
        "indicators": explanation
    }