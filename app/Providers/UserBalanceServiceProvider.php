<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class UserBalanceServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            'App\Contracts\UserBalance\UserBalance',
            'App\Services\UserBalance\OneCUserBalance'
        );
    }
}
