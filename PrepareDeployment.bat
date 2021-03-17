SET DeploymentDirName="Deployment"
SET FrontEndBuildDir="Source\Front-End\pms-v2\build"
SET FrontEndBuildOutputDir=%DeploymentDirName%
SET BackEndBuildDir="Source\Back-End\pms-v2-api"
SET BackEndBuildOutputDir=%DeploymentDirName%\api

cls

SET /p FreshDeployment=Do you want to run a fresh deployment? [y/n]: 

IF "%FreshDeployment%"=="y" (
	cls
	if exist %cd%\%DeploymentDirName% Rmdir /S %cd%\%DeploymentDirName%
)

cls


if not exist %cd%\%DeploymentDirName% mkdir %cd%\%DeploymentDirName%

xcopy  %cd%\%FrontEndBuildDir% %cd%\%FrontEndBuildOutputDir% /s /e /y /i

PowerShell -Command "Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::Show('Front End Files Copied Successfully! Press Ok To Continue!')"


if not exist %cd%\%BackEndBuildOutputDir% mkdir %cd%\%BackEndBuildOutputDir%

xcopy  %cd%\%BackEndBuildDir% %cd%\%BackEndBuildOutputDir% /s /e /y /i

PowerShell -Command "Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::Show('Back End Files Copied Successfully! Press Ok To Continue!')"

exit
