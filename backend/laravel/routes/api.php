<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Models\User;

// Rutas públicas
Route::get('/test', function(){
  return response()->json([
    'message' =>' API funcionando'
  ]);
});
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/menu/{user_id}', [MenuController::class, 'menu']);
Route::post('/webhook/mercadopago', [PaymentController::class, 'webhook']);

// Rutas protegidas
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user/theme',[AuthController::class, 'updateTheme']);

  Route::apiResource('categories', CategoryController::class); // Simplifica y genera todas las rutas CRUD para categorías

  // rutas para productos
  Route::get('/categories/{category_id}/products', [ProductController::class, 'index']);
  Route::post('/products', [ProductController::class, 'store']);
  Route::put('/products/{id}', [ProductController::class, 'update']);
  Route::delete('/products/{id}', [ProductController::class, 'destroy']);


  Route::post('/payment/create-preference', [PaymentController::class, 'createPreference']);
});