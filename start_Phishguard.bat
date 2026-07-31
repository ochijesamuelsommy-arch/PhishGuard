@echo off
title PhishGuard Launcher

echo ======================================
echo        Starting PhishGuard...
echo ======================================

REM Start Backend
start "PhishGuard Backend" cmd /k "cd /d "%~dp0backend" && .\venv\Scripts\python.exe -m uvicorn main:app --reload"

REM Wait 2 seconds
timeout /t 2 >nul

REM Start Frontend
start "PhishGuard Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

exit