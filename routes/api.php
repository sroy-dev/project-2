<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Middleware\ForcefullyChangeAcceptHeader;


Route::group([
    'prefix' => 'auth',
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
});


Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'auth',
], function () {
    Route::post('logout', [AuthController::class, 'logout']);
    // Route::get('me', [LoginController::class, 'me']);
    // Route::post('refresh', [LoginController::class, 'refresh']);
});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'connection',
], function () {
    // Route::get('list', [ConnectionController::class, 'list']);
    // Route::post('create', [ConnectionController::class, 'create']);
    // ROute::get('{connection_id}/messages', [ConnectionController::class, 'messages']);
    // Route::post('{connection_id}/messages', [ConnectionController::class, 'sendMessage']);
});

