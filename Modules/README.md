## Requirements

1. `admins` routes prefix required, works best with `inspinia` theme, minimum `bootstrap 4` required.

## Installation

1. `composer require nwidart/laravel-modules`

    - `php artisan vendor:publish --provider="Nwidart\Modules\LaravelModulesServiceProvider"`
    - You can autoload your modules using psr-4 `"Modules\\": "Modules/"` in the composer.json.
    - `composer dump-autoload`

2. `composer require spatie/laravel-permission`

    - `php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"`
    - You can create the role and permission tables using `php artisan migrate` command.

3. `composer require yajra/laravel-datatables-oracle`

## For example ModuleName

1. Copy `ModuleName` folder and paste in `Modules` folder.
2. Check the module enabled or not using `php artisan module:list` command.
3. Enable the module using `php artisan module:enable ModuleName` command.
4. Migration using `php artisan module:migrate ModuleName` command.
5. Seed using `php artisan module:seed ModuleName` command.
6. For frontend `http:/localhost:8000/ModuleName`.
7. For backend `http:/localhost:8000/admins/ModuleName`.

## To generate module assets (module.js | module.css)

1. cd path to module
2. npm install
3. npm run watch | npm run prod
4. it will generate bot js and css file inside public folder

## Publish config file

1. Publish the given module configuration files, or without an argument publish all modules configuration files using `php artisan module:publish-config ModuleName` or `php artisan module:publish-config` command.

## Notes

For Configuration you can fire

-   `php artisan vendor:publish` and select appropriate option which will generate file named `config/<file-name>.php` with variables
-   You can generate file manually at `config/<file-name>.php` here are the list of

```
<?php
    return [
        'name' => 'Module Name',
        'routePrefix' => 'admins', // no trailing slash required
        'authGuard' => 'admin',
        'layoutIncludes' => 'admin.include' // no trailing fullstop required
    ];
```

## Wiki

1. https://nwidart.com/laravel-modules/v6/introduction
2. https://docs.spatie.be/laravel-permission/v3/introduction
