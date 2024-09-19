<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\ChannelMessageController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\TeamController;
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
    Route::get('me', [AuthController ::class, 'me']);
    // Route::post('refresh', [LoginController::class, 'refresh']);
});

Route::group([
    'middleware' => 'auth:sanctum',
], function () {
    // members route
    Route::post('team-members', [TeamController::class, 'store']);

    // channel route
    Route::post('channels', [ChannelController::class, 'store']);

    // get direct messages
    Route::get('direct-messages/{id}', [ConversationController::class, 'index']);
    Route::post('direct-messages/{id}', [ConversationController::class, 'store']);

    Route::get('direct-messages/{id}/new', [ConversationController::class, 'new']);

    // get channel messages
    Route::get('channel-messages/{id}', [ChannelMessageController::class, 'index']);
    Route::post('channel-messages/{id}', [ChannelMessageController::class, 'store']);
});

