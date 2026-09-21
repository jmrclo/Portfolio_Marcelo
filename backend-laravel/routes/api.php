<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\ContactController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| RESTful API endpoints matching the Portfolio specifications.
*/

Route::prefix('v1')->group(function () {
    // Engineer Profile & CV
    Route::get('/profile', [ProfileController::class, 'show']);
    
    // Pinnacle Client Projects
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{slug}', [ProjectController::class, 'show']);
    
    // AI Agent Chatbot Endpoint
    Route::post('/chat', [ChatController::class, 'handleQuery']);
    
    // Contact Message Submission
    Route::post('/contact', [ContactController::class, 'store']);
    
    // System Performance Metrics
    Route::get('/metrics', [ProjectController::class, 'metrics']);
});

// Backward-compatible fallback for /api/projects etc.
Route::get('/profile', [ProfileController::class, 'show']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);
Route::post('/chat', [ChatController::class, 'handleQuery']);
Route::post('/contact', [ContactController::class, 'store']);
Route::get('/metrics', [ProjectController::class, 'metrics']);

