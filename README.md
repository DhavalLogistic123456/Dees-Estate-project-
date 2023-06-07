# if web-pack command not wokring

rm -rf node_modules
rm package-lock.json yarn.lock
npm cache clear --force
npm install

composer install
sudo find ./ -type f -exec chmod 664 {} \;
sudo find ./ -type d -exec chmod 775 {} \;

sudo chgrp -R www-data storage bootstrap/cache
sudo chmod -R ug+rwx storage bootstrap/cache

# Config Commands

composer dump-autoload && php artisan config:clear && php artinsan cache:clear && php artisan view:clear && php artisan route:clear && sudo chmod -R 777 storage/ bootstrap/cache/

php artisan config:cache

# To seed DB with super_admin and roles

php artisan db:seed

# Images and Img folder

Use Images folder for css image `url('')`
User Img for html `<img src="">`
Webpack will automatically copy your `images` to `public` directory which is used in css `url('')`
You only need to copy `img` folder

# setUp vHost in Xammp Mac

/Applications/XAMPP/xamppfiles/etc/extra/httpd-vhosts.conf

# Add Below lines in Xampp httpd-vhosts.conf file

<Directory "/Applications/XAMPP/xamppfiles/htdocs/MadhudharaLaravel/public">
Options Indexes FollowSymLinks ExecCGI Includes
AllowOverride All
Require all granted
</Directory>
<VirtualHost \*:80>
ServerAdmin madhudhara@localhost.com
DocumentRoot "/Applications/XAMPP/xamppfiles/htdocs/MadhudharaLaravel/public"
ServerName madhudhara.localhost
ErrorLog "logs/madhudhara.localhost-error_log"
CustomLog "logs/madhudhara.localhost-access_log" common
</VirtualHost>

<Directory "/Applications/XAMPP/xamppfiles/htdocs/MadhudharaLaravel/public">
Options Indexes FollowSymLinks ExecCGI Includes
AllowOverride All
Require all granted
</Directory>
<VirtualHost \*:80>
ServerAdmin admin.madhudhara@localhost.com
DocumentRoot "/Applications/XAMPP/xamppfiles/htdocs/MadhudharaLaravel/public"
ServerName admin.madhudhara.localhost
ErrorLog "logs/madhudhara.localhost-error_log"
CustomLog "logs/madhudhara.localhost-access_log" common
</VirtualHost>

# enable vhost in xammp

/Applications/XAMPP/xamppfiles/etc/http.conf

# Virtual hosts

Include etc/extra/httpd-vhosts.conf // remove comment

# For Ubuntu

cd /etc/apache2/sites-available

edit 000-default.conf files using nano or gedit

# Add Below lines in 000-default.conf file

<VirtualHost \*:80>
ServerName madhudhara.localhost

    ServerAdmin madhudhara@localhost.com
    DocumentRoot /var/www/html/MadhudharaLaravel/public

    <Directory /var/www/html/MadhudharaLaravel>
        AllowOverride All
    Options Indexes FollowSymLinks ExecCGI Includes

Require all granted
</Directory>

    ErrorLog ${APACHE_LOG_DIR}/madhudhara.localhost-error_log
    CustomLog ${APACHE_LOG_DIR}/madhudhara.localhost-access_log combined

</VirtualHost>

<VirtualHost \*:80>
ServerName admin.madhudhara.localhost

    ServerAdmin admin.madhudhara@localhost.com
    DocumentRoot /var/www/html/MadhudharaLaravel/public

    <Directory /var/www/html/MadhudharaLaravel>
        AllowOverride All
    Options Indexes FollowSymLinks ExecCGI Includes

Require all granted
</Directory>

    ErrorLog ${APACHE_LOG_DIR}/madhudhara.localhost-error_log
    CustomLog ${APACHE_LOG_DIR}/madhudhara.localhost-access_log combined

</VirtualHost>

# Restart apache server

# Config Commands
composer dump-autoload -o

composer install --optimize-autoloader --no-dev

php artisan route:clear
php artisan cache:clear
php artisan view:clear
php artisan config:clear

php artisan config:cache
php artisan route:cache
sudo supervisorctl restart laravel-worker:*

# Hack for compiling assets of all modules by single command

1. install laravel-mix-merge-manifest in your project

        npm install laravel-mix-merge-manifest --save-dev

2. copy webpack.modules.config.js and paste it to root directory
3. add bellow line into to scripts in package.json

        "dev-modules": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=webpack.modules.config.js",
        "prod-modules": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --no-progress --hide-modules --config=webpack.modules.config.js",
# Note :
        This command will not work if node_modules folder exist in any module.
        Plz remove node_module from all modules before running this command