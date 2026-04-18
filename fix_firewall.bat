@echo off
echo.
echo =======================================================
echo FIXING WINDOWS FIREWALL FOR KIDNEY GUARD (PORT 5000)
echo =======================================================
echo.
echo Requesting administrator privileges if needed...
netsh advfirewall firewall add rule name="Kidney Guard API" dir=in action=allow protocol=TCP localport=5000
echo.
if %errorlevel% equ 0 (
    echo SUCCESS! Your firewall is now allowing data from the ESP32!
) else (
    echo FAILED! Please Right-Click this file and select "Run as Administrator".
)
echo.
pause
