<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;

/*
|--------------------------------------------------------------------------
| Web Routes (MVC)
|--------------------------------------------------------------------------
| Serves the Laravel Blade root view mounting Vue 3 Admin & API Explorer
*/

Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');
Route::get('/api-explorer', [DashboardController::class, 'apiExplorer'])->name('admin.api-explorer');
Route::get('/projects', [DashboardController::class, 'projects'])->name('admin.projects');

