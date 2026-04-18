@echo off
echo Stopping old processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo Starting Kidney Guard System...

:: Start Backend
start "Kidney Guard Backend" cmd /k "cd backend && npm install && node server.js"

:: Wait a moment for backend to start
timeout /t 5 /nobreak >nul

:: Start Frontend
start "Kidney Guard Frontend" cmd /k "npm install && npm run dev"

:: Wait for frontend to initialize
timeout /t 5 /nobreak >nul

:: Open Browser
start http://localhost:8080

echo System started! You can close this window if you want, but keep the other two windows open.
pause
