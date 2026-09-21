@echo off
title John Matthew Marcelo - Portfolio Launcher
echo =======================================================
echo   Launching John Matthew A. Marcelo's Portfolio Locally
echo =======================================================
echo.

cd /d "%~dp0"

echo [1/2] Starting Mock REST API Server on http://localhost:8000 ...
start "Mock API Server (Port 8000)" cmd /k "cd mock-server && python server.py"

echo [2/2] Starting Frontend Web Server on http://localhost:3000 ...
start "Frontend Web Server (Port 3000)" cmd /k "python -m http.server 3000"

echo Waiting 2 seconds for servers to initialize...
timeout /t 2 /nobreak > nul

echo Opening Portfolio in your default web browser...
start http://localhost:3000/

echo.
echo =======================================================
echo   Portfolio is now live at: http://localhost:3000/
echo   API is now live at:       http://localhost:8000/
echo =======================================================
echo You can keep the server windows running while browsing.
pause

