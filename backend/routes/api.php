<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\WalletController;
use App\Http\Controllers\General\SettingController;
use App\Http\Controllers\Product\CategoryController as ProductCategoryController;
use App\Http\Controllers\Content\CommentController;
use App\Http\Controllers\Content\QuestionController;
use App\Http\Controllers\Product\ProductFeatureController;
use App\Models\Content\Menu;
use App\Http\Resources\MenuResource;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/menu', fn() => MenuResource::collection(Menu::all()));
Route::get('/settings', [SettingController::class, 'index']);
Route::get('/categories', [ProductCategoryController::class, 'index']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}/{name?}', [ProductController::class, 'show']);
Route::get('/product-filters', [ProductController::class, 'getFilters']);
Route::get('/categories/{category}/features', [ProductFeatureController::class, 'getFeaturesByCategory']);

Route::post('/register', [AuthController::class, 'registerUser']);
Route::post('/login', [AuthController::class, 'loginUser']);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/promote/{userId}', [AuthController::class, 'promoteToCoAdmin']);

    // User Panel
    Route::get('/dashboard-stats', [DashboardController::class, 'index']);
    Route::get('/wallet', [WalletController::class, 'index']);

    // Products Management
    Route::post('/products', [ProductController::class, 'store']);
    Route::patch('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    Route::get('/products/{id}/edit', [ProductController::class, 'edit']);

    // مدیریت محتوا
    Route::post('/products/{product}/comments', [CommentController::class, 'store']);
    Route::post('/products/{product}/questions', [QuestionController::class, 'store']);

    // Settings
    Route::post('/settings', [SettingController::class, 'update'])
          ->middleware('can:edit_settings');
});
