# dev.ps1 — Build, unblock OneDrive-blocked DLLs, then run the API
# Usage: .\dev.ps1

Write-Host "Building solution..." -ForegroundColor Cyan
dotnet build --no-restore 2>&1 | Where-Object { $_ -match "error|succeeded|failed" }

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Aborting." -ForegroundColor Red
    exit 1
}

Write-Host "Unblocking OneDrive-flagged DLLs..." -ForegroundColor Yellow
Get-ChildItem -Path "." -Recurse -Include "*.dll","*.exe","*.pdb" | Unblock-File -ErrorAction SilentlyContinue
Write-Host "Done. Starting API on http://localhost:5155..." -ForegroundColor Green

dotnet run --no-build --project src/FarmerMarket.API
