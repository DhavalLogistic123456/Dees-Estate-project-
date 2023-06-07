<?php

namespace Modules\Testimonial\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Factory;

class TestimonialServiceProvider extends ServiceProvider
{
    /**
     * Boot the application events.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerTranslations();
        $this->registerConfig();
        $this->registerViews();
        $this->loadMigrationsFrom(module_path('Testimonial', 'Database/Migrations'));
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
            module_path('Testimonial', 'Config/config.php') => config_path('testimonial.php'),
        ], 'config');
        $this->mergeConfigFrom(
            module_path('Testimonial', 'Config/config.php'),
            'testimonial'
        );
    }

    /**
     * Register views.
     *
     * @return void
     */
    public function registerViews()
    {
        $viewPath = resource_path('views/modules/testimonial');

        $sourcePath = module_path('Testimonial', 'Resources/views');

        $this->publishes([
            $sourcePath => $viewPath
        ], 'views');

        $this->loadViewsFrom(array_merge(array_map(function ($path) {
            return $path . '/modules/testimonial';
        }, \Config::get('view.paths')), [$sourcePath]), 'testimonial');
    }

    /**
     * Register translations.
     *
     * @return void
     */
    public function registerTranslations()
    {
        $langPath = resource_path('lang/modules/testimonial');

        if (is_dir($langPath)) {
            $this->loadTranslationsFrom($langPath, 'testimonial');
        } else {
            $this->loadTranslationsFrom(module_path('Testimonial', 'Resources/lang'), 'testimonial');
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
