@echo off
title PhishGuard Launcher

echo.
echo ==========================================
echo        Starting PhishGuard...
echo ==========================================
echo.

REM Get project root
set ROOT=%~dp0

echo [1/3] Starting Backend...

start "PhishGuard Backend" cmd /k ^
"cd /d "%ROOT%backend" && ^
.\venv\Scripts\python.exe -m uvicorn main:app --reload"

echo.

echo Waiting for backend...
timeout /t 3 > nul

echo [2/3] Starting Frontend...

start "PhishGuard Frontend" cmd /k ^
"cd /d "%ROOT%frontend" && ^
npm run dev"

echo.

echo Waiting for frontend...
timeout /t 4 > nul

echo [3/3] Opening Browser...

start http://localhost:5173

echo.
echo ==========================================
echo     PhishGuard started successfully!
echo ==========================================
echo.

pause