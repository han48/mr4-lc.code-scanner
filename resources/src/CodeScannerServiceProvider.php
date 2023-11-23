<?php

namespace Mr4Lc\CodeScanner;

use Illuminate\Support\ServiceProvider;

class CodeScannerServiceProvider extends ServiceProvider
{

    public $assets = __DIR__ . '/../resources/assets';
    public $views = __DIR__ . '/../resources/views';

    /**
     * {@inheritdoc}
     */
    public function boot()
    {
        if ($this->app->runningInConsole() && $assets = $this->assets) {
            $this->publishes(
                [$assets => public_path('vendor/mr4-lc/content-protected')],
                'mr4-lc-content-protected'
            );
        }

        if ($this->app->runningInConsole() && $views = $this->views) {
            $this->publishes(
                [$views => resource_path('views/components/mr4-lc')],
                'mr4-lc-content-protected'
            );
        }
    }
}
