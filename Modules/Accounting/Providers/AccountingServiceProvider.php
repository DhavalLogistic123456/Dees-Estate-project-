<?php

namespace Modules\Accounting\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Factory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AccountingServiceProvider extends ServiceProvider
{
    /**
     * @var string $moduleName
     */
    protected $moduleName = 'Accounting';

    /**
     * @var string $moduleNameLower
     */
    protected $moduleNameLower = 'accounting';

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
        $this->registerHasManySync();
        $this->loadMigrationsFrom(module_path($this->moduleName, 'Database/Migrations'));
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
            module_path($this->moduleName, 'Config/config.php') => config_path($this->moduleNameLower . '.php'),
        ], 'config');
        $this->mergeConfigFrom(
            module_path($this->moduleName, 'Config/config.php'),
            $this->moduleNameLower
        );
    }

    /**
     * Register views.
     *
     * @return void
     */
    public function registerViews()
    {
        $viewPath = resource_path('views/modules/' . $this->moduleNameLower);

        $sourcePath = module_path($this->moduleName, 'Resources/views');

        $this->publishes([
            $sourcePath => $viewPath
        ], ['views', $this->moduleNameLower . '-module-views']);

        $this->loadViewsFrom(array_merge($this->getPublishableViewPaths(), [$sourcePath]), $this->moduleNameLower);
    }

    /**
     * Register translations.
     *
     * @return void
     */
    public function registerTranslations()
    {
        $langPath = resource_path('lang/modules/' . $this->moduleNameLower);

        if (is_dir($langPath)) {
            $this->loadTranslationsFrom($langPath, $this->moduleNameLower);
        } else {
            $this->loadTranslationsFrom(module_path($this->moduleName, 'Resources/lang'), $this->moduleNameLower);
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

    private function getPublishableViewPaths(): array
    {
        $paths = [];
        foreach (\Config::get('view.paths') as $path) {
            if (is_dir($path . '/modules/' . $this->moduleNameLower)) {
                $paths[] = $path . '/modules/' . $this->moduleNameLower;
            }
        }
        return $paths;
    }

    private function registerHasManySync()
    {
        HasMany::macro('sync', function (array $data, $deleting = true) {
            $changes = [
                'created' => [], 'deleted' => [], 'updated' => [],
            ];

            /** @var HasMany $this */

            // Get the primary key.
            $relatedKeyName = $this->getRelated()->getKeyName();

            // Get the current key values.
            $current = $this->newQuery()->pluck($relatedKeyName)->all();

            // Cast the given key to an integer if it is numeric.
            $castKey = function ($value) {
                if (is_null($value)) {
                    return $value;
                }

                return is_numeric($value) ? (int) $value : (string) $value;
            };

            // Cast the given keys to integers if they are numeric and string otherwise.
            $castKeys = function ($keys) use ($castKey) {
                return (array) array_map(function ($key) use ($castKey) {
                    return $castKey($key);
                }, $keys);
            };

            // Get any non-matching rows.
            $deletedKeys = array_diff(
                $current,
                $castKeys(
                array_pluck($data, $relatedKeyName)
            )
            );

            if ($deleting && count($deletedKeys) > 0) {
                $this->getRelated()->destroy($deletedKeys);
                $changes['deleted'] = $deletedKeys;
            }

            // Separate the submitted data into "update" and "new"
            // We determine "newRows" as those whose $relatedKeyName (usually 'id') is null.
            $newRows = array_where($data, function ($row) use ($relatedKeyName) {
                return array_get($row, $relatedKeyName) === null;
            });

            // We determine "updateRows" as those whose $relatedKeyName (usually 'id') is set, not null.
            $updatedRows = array_where($data, function ($row) use ($relatedKeyName) {
                return array_get($row, $relatedKeyName) !== null;
            });

            if (count($newRows) > 0) {
                $newRecords = $this->createMany($newRows);
                $changes['created'] = $castKeys(
                    $newRecords->pluck($relatedKeyName)->toArray()
                );
            }

            foreach ($updatedRows as $row) {
                $this->getRelated()->where($relatedKeyName, $castKey(array_get($row, $relatedKeyName)))
                    ->update($row);
            }

            $changes['updated'] = $castKeys(array_pluck($updatedRows, $relatedKeyName));

            return $changes;
        });
    }
}
