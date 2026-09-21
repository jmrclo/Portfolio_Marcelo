<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    /**
     * Handle incoming queries for the AI Agent Chatbot with LLM integration.
     */
    public function handleQuery(Request $request): JsonResponse
    {
        $message = trim((string) $request->input('message', ''));
        $provider = $request->input('provider', 'builtin');
        $apiKey = $request->input('api_key', config('services.llm.key'));
        $model = $request->input('model');

        if (empty($message)) {
            return response()->json([
                'success' => false,
                'reply' => "Please provide a question about John Matthew's projects or skills."
            ], 422);
        }

        // Live LLM Integration (OpenAI, Gemini, Groq)
        if ($provider !== 'builtin' && !empty($apiKey)) {
            $llmReply = $this->queryLiveLlm($provider, $apiKey, $model, $message);
            if ($llmReply) {
                return response()->json([
                    'success' => true,
                    'agent' => 'John Matthew AI (Live LLM: ' . strtoupper($provider) . ')',
                    'provider' => $provider,
                    'reply' => $llmReply,
                    'timestamp' => now()->toIso8601String()
                ]);
            }
        }

        // Knowledge Base Fallback
        $reply = $this->resolveKnowledgeReply(strtolower($message));

        return response()->json([
            'success' => true,
            'agent' => 'John Matthew AI Agent (Laravel 11 MVC Knowledge Engine)',
            'provider' => 'builtin',
            'reply' => $reply,
            'timestamp' => now()->toIso8601String()
        ]);
    }

    /**
     * Query External LLM API
     */
    private function queryLiveLlm(string $provider, string $apiKey, ?string $model, string $prompt): ?string
    {
        $systemPrompt = "You are the AI representative for John Matthew A. Marcelo, a Full Stack Developer specializing in Laravel, Vue.js, React, and MySQL. Experience includes 5 client systems at Pinnacle Technologies (CLDH-EI, TMS, Bernardo College, Philyra Cloud POS, ICCT Colleges SMS). Answer professionally.";

        try {
            if ($provider === 'openai') {
                $response = Http::withToken($apiKey)->post('https://api.openai.com/v1/chat/completions', [
                    'model' => $model ?: 'gpt-4o-mini',
                    'messages' => [
                        ['role' => 'system', 'content' => $systemPrompt],
                        ['role' => 'user', 'content' => $prompt]
                    ],
                    'temperature' => 0.7
                ]);
                return $response->json('choices.0.message.content');
            }

            if ($provider === 'gemini') {
                $gemModel = $model ?: 'gemini-1.5-flash';
                $response = Http::post("https://generativelanguage.googleapis.com/v1beta/models/{$gemModel}:generateContent?key={$apiKey}", [
                    'systemInstruction' => ['parts' => [['text' => $systemPrompt]]],
                    'contents' => [['role' => 'user', 'parts' => [['text' => $prompt]]]]
                ]);
                return $response->json('candidates.0.content.parts.0.text');
            }
        } catch (\Exception $e) {
            report($e);
        }

        return null;
    }

    /**
     * Resolves knowledge base answer based on John Matthew's Pinnacle projects and CV.
     */
    private function resolveKnowledgeReply(string $q): string
    {
        if (str_contains($q, 'pos') || str_contains($q, 'philyra') || str_contains($q, 'point of sale') || str_contains($q, 'barcode')) {
            return "**Philyra Cloud Point of Sale (POS) & Inventory System** is a flagship cloud application John Matthew Marcelo contributed to at Pinnacle Technologies.\n\n" .
                "• **Sub-120ms Latency:** Instant barcode scanning & checkout execution.\n" .
                "• **SHA-512 Security:** Client-side cryptographic hashing preventing tampering.\n" .
                "• **Multi-Store Inventory:** Real-time stock decrementing with ACID-compliant MySQL row locks.\n" .
                "• **Stack:** Laravel MVC, Codebase UI, Thermal Receipt Driver.\n\n" .
                "👉 [Explore Live POS Deployment](https://pos-tms.philyra.cloud/login)";
        }

        if (str_contains($q, 'cldh') || str_contains($q, 'hospital') || str_contains($q, 'doctor')) {
            return "**CLDH-EI Academic Information Management System (AIMS)** serves Central Luzon Doctor's Hospital Educational Institution.\n\n" .
                "• Orchestrates admissions, grading, faculty evaluations, and registrar operations.\n" .
                "• Implements strict **Role-Based Access Control (RBAC)** across Super Admins, Deans, and Faculty.\n" .
                "• Fully compliant with **National Privacy Commission (NPC)** guidelines.\n\n" .
                "👉 [Explore Live CLDH-EI Portal](https://cldh-ei.pinnacle.edu.ph/admin/login)";
        }

        if (str_contains($q, 'tms') || str_contains($q, 'montessori') || str_contains($q, 'tarlac')) {
            return "**Tarlac Montessori School AIMS** is an educational management ERP custom-tailored for Montessori & K-12 operations.\n\n" .
                "• DepEd-compliant quarterly grading matrices with automated Form 137/138 batch PDF exports.\n" .
                "• Complete student financial ledgers, tuition installments, and cashier reconciliation.\n" .
                "• Modular CSS-variable theming engine built on AdminLTE.\n\n" .
                "👉 [Explore Live TMS Portal](https://tms.pinnacle.edu.ph/admin/login)";
        }

        if (str_contains($q, 'icct') || str_contains($q, 'sms') || str_contains($q, 'student management')) {
            return "**ICCT Colleges Student Management System (SMS)** is a high-concurrency web platform serving 50,000+ students.\n\n" .
                "• Engineered to withstand **15,000+ daily concurrent applicant transactions** during enrollment peak.\n" .
                "• Multi-campus branch architecture with automated student number generation.\n" .
                "• Optimized with MySQL read replicas and Cloudflare rate limiting.\n\n" .
                "👉 [Explore Live ICCT Portal](https://sms.icct.edu.ph/login)";
        }

        if (str_contains($q, 'contact') || str_contains($q, 'email') || str_contains($q, 'phone')) {
            return "You can reach **John Matthew A. Marcelo** directly:\n\n" .
                "• **Email:** [jm.marcelo0212@gmail.com](mailto:jm.marcelo0212@gmail.com)\n" .
                "• **Phone:** 0908-519-2226\n" .
                "• **Location:** Bocaue, Bulacan, Philippines (Open to Remote / Hybrid / On-site roles)";
        }

        return "I am the **AI Representative** for **John Matthew A. Marcelo** (Full Stack Developer).\n\n" .
            "You can ask me about:\n" .
            "• His **5 Pinnacle client projects** (CLDH-EI, TMS, Bernardo College, Philyra POS, ICCT SMS)\n" .
            "• Technical architecture (**Laravel MVC, Vue.js, React, MySQL, REST APIs**)\n" .
            "• 3+ years development + 4+ years IT/systems administration & Best in Thesis award!";
    }
}
