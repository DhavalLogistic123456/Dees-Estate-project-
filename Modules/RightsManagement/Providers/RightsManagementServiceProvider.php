<?php

namespace Modules\RightsManagement\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Factory;
use Illuminate\Routing\Router;

class RightsManagementServiceProvider extends ServiceProvider
{
    /**
     * Boot the application events.
     *
     * @return void
     */
    public function boot(Router $router)
    {
        $this->registerTranslations();
        $this->registerConfig();
        $this->registerViews();
        $this->loadMigrationsFrom(__DIR__ . '/../Database/Migrations');

        $router->aliasMiddleware('role', \Spatie\Permission\Middlewares\RoleMiddleware::class);
        $router->aliasMiddleware('permission', \Spatie\Permission\Middlewares\PermissionMiddleware::class);
        $router->aliasMiddleware('role_or_permission', \Spatie\Permission\Middlewares\RoleOrPermissionMiddleware::class);
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->register(RouteServiceProvider::class);
    }

    /**
     * Register config.
     *
     * @return void
     */
    protected function registerConfig()
    {
        $this->publishes([
            __DIR__.'/../Config/config.php' => config_path('rightsmanagement.php'),
        ], 'config');
        $this->mergeConfigFrom(
            __DIR__.'/../Config/config.php',
            'rightsmanagement'
        );

        $this->mergeConfigFrom(
            __DIR__ . '/../Config/permission.php',
            'permission'
        );

        $this->publishes([
            __DIR__.'/../Config/permissionList.php' => config_path('permissionList.php'),
        ], 'config');
        $this->mergeConfigFrom(
            __DIR__.'/../Config/permissionList.php',
            'permissionList'
        );
    }

    /**
     * Register views.
     *
     * @return void
     */
    public function registerViews()
    {
        $viewPath = resource_path('views/modules/rightsmanagement');

        $sourcePath = __DIR__.'/../Resources/views';

        $this->publishes([
            $sourcePath => $viewPath
        ], 'views');

        $this->loadViewsFrom(array_filter(array_merge(array_map(function ($path) {
            return $path . '/modules/rightsmanagement';
        }, \Config::get('view.paths')), [$sourcePath]), function ($path) {
            return file_exists($path);
        }), 'rightsmanagement');
    }

    /**
     * Register translations.
     *
     * @return void
     */
    public function registerTranslations()
    {
        $langPath = resource_path('lang/modules/rightsmanagement');

        if (is_dir($langPath)) {
            $this->loadTranslationsFrom($langPath, 'rightsmanagement');
        } else {
            $this->loadTranslationsFrom(__DIR__ .'/../Resources/lang', 'rightsmanagement');
        }
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return [];
    }
}
