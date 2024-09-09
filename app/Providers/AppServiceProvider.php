<?php

namespace App\Providers;

use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\ServiceProvider;
use Response;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResponseFactory::macro('success', function ($data = null, $code = 200) {
            return Response::json([
                'success' => true,
                'data' => $data,
            ], $code);
        });

        ResponseFactory::macro('error', function ($message = null, $code = 400) {
            return Response::json([
                'success' => false,
                'message' => $message,
            ], $code);
        });
    }
}
