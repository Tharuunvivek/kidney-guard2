$source = Get-Location
$destination = "KidneyGuard_Transfer"
$zipFile = "KidneyGuard_Project.zip"

Write-Host "Preparing transfer package..."
Write-Host "Source: $source"

# 1. Create a clean temporary directory
if (Test-Path $destination) {
    Remove-Item -Path $destination -Recurse -Force
}
New-Item -ItemType Directory -Path $destination | Out-Null

# 2. Copy files using Robocopy (Robust File Copy) to exclude node_modules and .git
# /S = Subdirectories, /XD = Exclude Directories
$robocopyParams = @(
    $source,
    $destination,
    "/S",
    "/XD", "node_modules", ".git", "KidneyGuard_Transfer", ".gemini", ".history",
    "/XF", "*.zip", "*.log"
)

Write-Host "Copying files (excluding node_modules)..."
Start-Process robocopy -ArgumentList $robocopyParams -NoNewWindow -Wait

# 3. Zip the clean directory
Write-Host "Compressing to $zipFile..."
if (Test-Path $zipFile) {
    Remove-Item -Path $zipFile -Force
}
Compress-Archive -Path "$destination\*" -DestinationPath $zipFile

# 4. Cleanup
Remove-Item -Path $destination -Recurse -Force

Write-Host "=========================================="
Write-Host "SUCCESS! Created: $zipFile"
Write-Host "You can now copy '$zipFile' to your new device."
Write-Host "=========================================="
