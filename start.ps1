#Requires -RunAsAdministrator
param(    
    [switch]$StopBeforeStarting,
    [switch]$SkipBuild
)

Import-Module -Name (Join-Path $PSScriptRoot "tools\cli") -Force

if ($StopBeforeStarting) {
    Write-Host "Stopping any active and running containers before starting..." -ForegroundColor DarkYellow
    Stop-Docker -TakeDown -PruneSystem
}
  
$hostDomain = Get-EnvValueByKey 'HOST_DOMAIN'
  
Initialize-Certificates -hostDomain $hostDomain
  
# Stop the IIS
Write-Host "Stopping IIS..." -ForegroundColor Yellow
iisreset.exe /stop
  
if ($SkipBuild) {
    Start-Docker -SkipBuild
}
else {
    Start-Docker
}
# if ($Build) {
    
# }
# elseif ($BuildOnly) {
#     Start-Docker -BuildOnly
# }
# else {
#     Start-Docker
# }
  