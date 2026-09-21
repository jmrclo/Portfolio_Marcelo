<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PortfolioDatabaseSeeder extends Seeder
{
    /**
     * Seed the portfolio database with the 5 Pinnacle client projects and technical profile.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'CLDH-EI Academic Information Management System (AIMS)',
                'slug' => 'cldh-ei-aims',
                'client' => "Central Luzon Doctor's Hospital Educational Institution",
                'url' => 'https://cldh-ei.pinnacle.edu.ph/admin/login',
                'category' => 'Enterprise ERP / Education',
                'badge' => 'Enterprise Production',
                'summary' => 'Academic ERP for medical & allied health education orchestrating admissions, grading, and registrar workflows.',
                'tech_stack' => json_encode(['Laravel', 'PHP', 'MySQL', 'AdminLTE', 'REST API', 'RBAC']),
                'metrics' => json_encode(['active_users' => '5,000+ Students & Staff', 'uptime' => '99.9%']),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Tarlac Montessori School AIMS',
                'slug' => 'tms-aims',
                'client' => 'Tarlac Montessori School',
                'url' => 'https://tms.pinnacle.edu.ph/admin/login',
                'category' => 'Educational ERP',
                'badge' => 'Enterprise Production',
                'summary' => 'Customized school ERP driving student lifecycle, K-12 grading standards, tuition ledgers, and automated PDF report cards.',
                'tech_stack' => json_encode(['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'PDF Automation']),
                'metrics' => json_encode(['records_managed' => '10,000+ Students', 'adoption' => '100%']),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Bernardo College Academic Portal (BC AIMS)',
                'slug' => 'bc-aims',
                'client' => 'Bernardo College',
                'url' => 'https://bc.pinnacle.edu.ph/admin/login',
                'category' => 'Higher Education Management',
                'badge' => 'Enterprise Production',
                'summary' => 'Higher education academic portal delivering registrar operations, prerequisite graph evaluations, and faculty assignments.',
                'tech_stack' => json_encode(['Laravel', 'PHP', 'MySQL', 'Academic ERP', 'REST API']),
                'metrics' => json_encode(['efficiency' => '85% faster verification']),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Philyra Cloud Point of Sale (POS) & Inventory System',
                'slug' => 'pos-tms-philyra',
                'client' => 'Pinnacle Technologies, Inc. / Philyra Cloud',
                'url' => 'https://pos-tms.philyra.cloud/login',
                'category' => 'FinTech / Cloud POS',
                'badge' => 'Cloud SaaS Production',
                'summary' => 'High-speed cloud POS and inventory platform with real-time cashier checkout, barcode parsing, and SHA-512 security.',
                'tech_stack' => json_encode(['Laravel', 'PHP', 'Cloud POS', 'Inventory', 'SHA-512', 'Codebase UI']),
                'metrics' => json_encode(['latency' => '< 120ms', 'uptime' => '99.95%']),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'ICCT Colleges Student Management System (SMS)',
                'slug' => 'icct-sms',
                'client' => 'ICCT Colleges',
                'url' => 'https://sms.icct.edu.ph/login',
                'category' => 'High-Concurrency Web Portal',
                'badge' => 'High-Volume Production',
                'summary' => 'High-concurrency admissions and student management portal supporting over 50,000 active students and 15,000 daily peak applicants.',
                'tech_stack' => json_encode(['Laravel', 'PHP', 'MySQL Cluster', 'High Concurrency', 'REST APIs']),
                'metrics' => json_encode(['capacity' => '50,000+ Enrolled', 'daily_admissions' => '15,000+']),
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];

        DB::table('projects')->upsert($projects, ['slug']);
    }
}

