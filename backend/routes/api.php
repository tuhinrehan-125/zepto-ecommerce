<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => 'api'], function () {

    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    //Product router for the admin
    Route::group(['prefix' => 'admin'], function(){
        Route::post('/product-store', [AdminProductController::class, 'store']);
        Route::post('/product-show/{id}', [AdminProductController::class, 'show']);
        Route::post('/product-update/{id}', [AdminProductController::class, 'update']);
        Route::delete('/product-destroy/{id}', [AdminProductController::class, 'destroy']);
    });

});


// For frontend
Route::get('/products', [ProductController::class, 'index']);
Route::get('/product/{id}', [ProductController::class, 'show']);