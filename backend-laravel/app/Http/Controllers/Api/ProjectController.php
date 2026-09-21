<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    /**
     * Return all Pinnacle client projects.
     */
    public function index(): JsonResponse
    {
        $projects = $this->getPinnacleProjects();
        return response()->json([
            'success' => true,
            'count' => count($projects),
            'data' => $projects
        ]);
    }

    /**
     * Return a single project by slug or ID.
     */
    public function show(string $slug): JsonResponse
    {
        $projects = $this->getPinnacleProjects();
        $project = collect($projects)->first(function ($p) use ($slug) {
            return $p['slug'] === $slug || (string)$p['id'] === $slug;
        });

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $project
        ]);
    }

    /**
     * Return system performance and scalability metrics.
     */
    public function metrics(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'enterprise_deployments' => 5,
                'active_users_supported' => '60,000+',
                'pos_average_latency_ms' => 118,
                'icct_peak_daily_admissions' => '15,000+',
                'uptime_percentage' => '99.9%',
                'architecture' => 'Laravel 11 MVC + Vue 3 / React + MySQL Relational Cluster',
                'security_standard' => 'National Privacy Commission (NPC) & SHA-512 Compliant'
            ]
        ]);
    }

    /**
     * In-memory or seeded Pinnacle projects dataset.
     */
    private function getPinnacleProjects(): array
    {
        return [
            [
                'id' => 1,
                'slug' => 'cldh-ei-aims',
                'title' => "CLDH-EI Academic Information Management System (AIMS)",
                'client' => "Central Luzon Doctor's Hospital Educational Institution / Pinnacle",
                'url' => 'https://cldh-ei.pinnacle.edu.ph/admin/login',
                'category' => 'Enterprise ERP / Education',
                'badge' => 'Enterprise Production',
                'role' => 'Full Stack Software Engineer',
                'summary' => "Full-scale academic ERP for medical & allied health education orchestrating admissions, grading, and registrar workflows.",
                'key_features' => [
                    'Role-Based Access Control (RBAC) for Super Admin, Deans, Faculty, and Registrars',
                    'Automated Grade Encoding, Prerequisite Validation, and batch TOR generation',
                    'Real-time Class Scheduling and Conflict Detection',
                    'NPC compliant session security and idle invalidation'
                ],
                'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'AdminLTE', 'REST API', 'RBAC']
            ],
            [
                'id' => 2,
                'slug' => 'tms-aims',
                'title' => 'Tarlac Montessori School AIMS',
                'client' => 'Tarlac Montessori School / Pinnacle Technologies',
                'url' => 'https://tms.pinnacle.edu.ph/admin/login',
                'category' => 'Educational ERP',
                'badge' => 'Enterprise Production',
                'role' => 'Full Stack Software Engineer',
                'summary' => 'Customized school ERP driving student lifecycle, K-12 grading standards, tuition ledgers, and automated PDF report cards.',
                'key_features' => [
                    'DepEd-compliant quarterly grade computation & Form 137/138 export',
                    'Student financial ledger: tuition installment tracking and cashier reconciliation',
                    'Configurable CSS variable dynamic theme engine with AdminLTE',
                    'Automated session timeout and tamper-proofing'
                ],
                'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'PDF Automation']
            ],
            [
                'id' => 3,
                'slug' => 'bc-aims',
                'title' => 'Bernardo College Academic Portal (BC AIMS)',
                'client' => 'Bernardo College / Pinnacle Technologies',
                'url' => 'https://bc.pinnacle.edu.ph/admin/login',
                'category' => 'Higher Education Management',
                'badge' => 'Enterprise Production',
                'role' => 'Full Stack Software Engineer',
                'summary' => 'Higher education academic portal delivering registrar operations, prerequisite graph evaluations, and faculty assignments.',
                'key_features' => [
                    'Curriculum tree verification & degree prerequisite tracking',
                    'Faculty loading and room allocation matrices',
                    'Online student clearances and graduation tracking',
                    'Unified password recovery and audit logs'
                ],
                'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'Academic ERP', 'REST API']
            ],
            [
                'id' => 4,
                'slug' => 'pos-tms-philyra',
                'title' => 'Philyra Cloud Point of Sale (POS) & Inventory System',
                'client' => 'Pinnacle Technologies, Inc. / Philyra Cloud',
                'url' => 'https://pos-tms.philyra.cloud/login',
                'category' => 'FinTech / Cloud POS',
                'badge' => 'Cloud SaaS Production',
                'role' => 'Full Stack Software Engineer',
                'summary' => 'High-speed cloud POS and inventory platform with real-time cashier checkout, barcode parsing, and SHA-512 security.',
                'key_features' => [
                    'Sub-120ms cashier checkout with instant barcode scanner parsing',
                    'Real-time multi-location inventory depletion & low-stock alerts',
                    'SHA-512 client-side hashing and tamper-evident payload verification',
                    'Thermal receipt printing and cashier shift reconciliation'
                ],
                'tech_stack' => ['Laravel', 'PHP', 'Cloud POS', 'Inventory', 'SHA-512', 'Codebase UI']
            ],
            [
                'id' => 5,
                'slug' => 'icct-sms',
                'title' => 'ICCT Colleges Student Management System (SMS)',
                'client' => 'ICCT Colleges / Pinnacle Technologies',
                'url' => 'https://sms.icct.edu.ph/login',
                'category' => 'High-Concurrency Web Portal',
                'badge' => 'High-Volume Production',
                'role' => 'Full Stack Software Engineer',
                'summary' => 'High-concurrency admissions and student management portal supporting over 50,000 active students and 15,000 daily peak applicants.',
                'key_features' => [
                    'Massive-scale online admissions and automated student ID issuing',
                    'Multi-campus data federation supporting diverse degree departments',
                    'High-throughput MySQL read replica routing and rate limiting',
                    'Student profile self-service and document tracking'
                ],
                'tech_stack' => ['Laravel', 'PHP', 'MySQL Cluster', 'High Concurrency', 'REST APIs']
            ]
        ];
    }
}

