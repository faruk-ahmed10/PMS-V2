cd ../
cls
SET /p ControllerName=Enter Controller Name [path/Controller]:
php artisan make:controller %ControllerName%
pause
