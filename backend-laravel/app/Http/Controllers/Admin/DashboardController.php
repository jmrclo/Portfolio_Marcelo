<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\View\View;

class DashboardController extends Controller
{
    /**
     * Display the Vue 3 Project Manager Admin Dashboard.
     */
    public function index(): View
    {
        return view('app', [
            'view' => 'dashboard',
            'title' => 'Pinnacle Systems Management'
        ]);
    }

    /**
     * Display the Vue 3 API Inspector within Laravel.
     */
    public function apiExplorer(): View
    {
        return view('app', [
            'view' => 'api-explorer',
            'title' => 'RESTful API Explorer'
        ]);
    }

    /**
     * Display projects catalog.
     */
    public function projects(): View
    {
        return view('app', [
            'view' => 'projects',
            'title' => 'Client Deployments'
        ]);
    }
}

