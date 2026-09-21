<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    /**
     * Store an inquiry message.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:120',
            'email' => 'required|email|max:150',
            'subject' => 'nullable|string|max:200',
            'message' => 'required|string|max:5000'
        ]);

        // In a full production environment, this dispatches a queued Mailable:
        // Mail::to(config('mail.admin_address'))->queue(new ContactInquiryReceived($validated));

        return response()->json([
            'success' => true,
            'message' => "Thank you, {$validated['name']}! Your message was received by the Laravel backend.",
            'data' => [
                'id' => uniqid('inq_'),
                'name' => $validated['name'],
                'created_at' => now()->toIso8601String()
            ]
        ], 201);
    }
}

