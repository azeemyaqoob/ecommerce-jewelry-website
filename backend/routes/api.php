<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\HeadingController;
use App\Http\Controllers\FaqsController;
use App\Http\Controllers\PrivacyPolicyController;
use App\Http\Controllers\ExchangeReturnController;
use App\Http\Controllers\TermsAndConditionsController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->put('/user', [AuthController::class, 'updateUser']);


Route::post('/contact', [ContactController::class, 'store']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
Route::put('categories/{id}', [CategoryController::class, 'update']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/category/{categoryId}', [ProductController::class, 'showByCategory']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::get('/products-paginated', [ProductController::class, 'indexWithPagination']);

Route::post('/create-checkout-session', [StripeController::class, 'createCheckoutSession']);

Route::post('/orders', [OrderController::class, 'store']);

Route::get('/headings', [HeadingController::class, 'getHeadings']);
Route::put('/headings', [HeadingController::class, 'updateHeadings']);

Route::get('/faqs', [FaqsController::class, 'index']);
Route::put('/faqs/{id}', [FaqsController::class, 'update']);

Route::get('/privacy-policies', [PrivacyPolicyController::class, 'index']);
Route::put('/privacy-policies/{id}', [PrivacyPolicyController::class, 'update']);

Route::get('/exchange-returns', [ExchangeReturnController::class, 'index']);
Route::put('/exchange-returns/{id}', [ExchangeReturnController::class, 'update']);

Route::get('/terms-and-conditions', [TermsAndConditionsController::class, 'index']);
Route::put('/terms-and-conditions/{id}', [TermsAndConditionsController::class, 'update']);
