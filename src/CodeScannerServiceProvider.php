<?php

namespace Mr4Lc\CodeScanner;

use Illuminate\Support\ServiceProvider;

class CodeScannerServiceProvider extends ServiceProvider
{

    public $lang = __DIR__ . '/../resources/lang';
    public $assets = __DIR__ . '/../resources/assets';
    public $views = __DIR__ . '/../resources/views';

    /**
     * {@inheritdoc}
     */
    public function boot()
    {
        if ($this->app->runningInConsole() && $assets = $this->assets) {
            $this->publishes(
                [$assets => public_path('vendor/mr4-lc/code-scanner')],
                'mr4-lc-code-scanner'
            );
        }

        if ($this->app->runningInConsole() && $lang = $this->lang) {
            $this->publishes(
                [$lang => resource_path('lang')],
                'mr4-lc-code-scanner'
            );
        }

        if ($this->app->runningInConsole() && $views = $this->views) {
            $this->publishes(
                [$views => resource_path('views')],
                'mr4-lc-code-scanner'
            );
        }
    }
}
