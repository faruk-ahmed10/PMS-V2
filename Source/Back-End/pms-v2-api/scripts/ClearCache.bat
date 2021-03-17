cd ../

php artisan cache:clear && php artisan route:clear && php artisan view:clear && php artisan config:cache

PowerShell -Command "Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::Show('All caches cleared Successfully! Tap Ok To Continue!')"

exit
