cd ../
cls
SET /p ModelName=Enter Model Name [path/Model]:
php artisan make:model %ModelName%
pause
