#Requires -RunAsAdministrator

Import-Module -Name (Join-Path $PSScriptRoot "tools\cli") -Force
Import-Module -Name (Join-Path $PSScriptRoot "tools\create-jss-project") -Force

Clear-Host

$solutionName = Read-ValueFromHost -Question "Please enter a valid solution name`n(Capital first letter, letters and numbers only, min. 3 char)" -ValidationRegEx "^[A-Z]([a-z]|[A-Z]|[0-9]){2}([a-z]|[A-Z]|[0-9])*$" -required

$topology = "xm1"

Write-Host "$($topology) (CD role excluded by default) topology applied by default." -ForegroundColor Magenta

$addSXA = Confirm -Question "Would you like to add SXA module to your docker setup?" -DefaultYes
$addSMS = Confirm -Question "Would you like to add Sitecore Management Services module to your docker setup?" -DefaultYes
$addHeadless = Confirm -Question "Would you like to add Sitecore Headless Services module to your docker setup?" -DefaultYes
$createJSSApp = Confirm -Question "Would you like to create JSS app (nextjs) to your docker setup?" -DefaultYes
$addCD = Confirm -Question "Would you like to add CD role to your docker setup?"

Install-Kit -Topology $topology -AddSXA $addSXA -AddSMS $addSMS -AddHeadless $addHeadless -CreateJSSApp $createJSSApp -AddCD $addCD
Rename-SolutionFile $solutionName
Install-SitecoreDockerTools
$hostDomain = "$($solutionName.ToLower()).localhost"
$hostDomain = Read-ValueFromHost -Question "Domain hostname (press enter for $($hostDomain))" -DefaultValue $hostDomain -Required

do {
    $licenseFolderPath = Read-ValueFromHost -Question "Path to a folder that contains your Sitecore license.xml file `n- must contain a file named license.xml file (press enter for c:\sitecore\)" -DefaultValue "c:\sitecore\" -Required
} while (!(Test-Path (Join-Path $licenseFolderPath "license.xml")))

Copy-Item (Join-Path $licenseFolderPath "license.xml") ".\docker\license\"
Write-Host "Copied license.xml to .\docker\license\" -ForegroundColor Magenta

Initialize-EnvFile -SolutionName $solutionName -HostDomain $hostDomain -Topology $topology -AddSMS $addSMS -CreateJSSApp $createJSSApp $addHeadless -AddSXA $addSXA -AddCD $addCD

Initialize-HostNames $hostDomain

if ($createJSSApp) {
    Add-JSSApplication -SolutionName $solutionName -CMHost "cm.$hostDomain"
}

Write-Host "ENVIRONMENT INITIALIZATION IS COMPLETED. PLEASE USE THE .\start.ps1 TO START THE DOCKER ENVIRONMENT..." -ForegroundColor DarkGreen