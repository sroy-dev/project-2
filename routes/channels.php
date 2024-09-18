<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
// Compare this snippet from routes/channels.php:
// Broadcast::routes(['middleware' => ['auth:sanctum']]);
// custom route for broadcasting auth
Route::prefix('broadcasting')->group(function () {
    Broadcast::routes(['middleware' => ['auth:sanctum']]);
    Broadcast::channel('chat', function ($user) {
        return Auth::check();
    });
});