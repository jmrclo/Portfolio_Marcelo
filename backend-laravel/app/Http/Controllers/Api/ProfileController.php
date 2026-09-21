<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class ProfileController extends Controller
{
    /**
     * Return John Matthew A. Marcelo's profile & CV data.
     */
    public function show(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'name' => 'JOHN MATTHEW A. MARCELO',
                'title' => 'Software Developer | Full Stack (Laravel · Vue.js · React)',
                'subtitle' => 'Full Stack Developer with 3+ years building responsive web apps with Laravel, Vue.js, React, & MySQL + 4+ years in Systems Administration',
                'email' => 'jm.marcelo0212@gmail.com',
                'phone' => '0908-519-2226',
                'location' => 'Bocaue, Bulacan, Philippines',
                'availability' => 'Available for Software Developer Roles (Remote / Hybrid / On-site)',
                'bio' => 'Full Stack Developer with 3+ years of experience building responsive web applications using Laravel, Vue.js, React, and MySQL, backed by 4+ years in IT support and systems administration. Skilled in designing RESTful APIs, building component-based user interfaces, and using modern AI tools to write, debug, and document code more efficiently. Seeking a Software Developer role where I can build reliable, user-focused systems that contribute to the growth of the organization.',
                'stats' => [
                    ['label' => 'Full Stack Development', 'value' => '3+ Years'],
                    ['label' => 'IT & Systems Admin', 'value' => '4+ Years'],
                    ['label' => 'Pinnacle Client Systems', 'value' => '5 Portals'],
                    ['label' => 'Core Stack', 'value' => 'Laravel / Vue / React']
                ],
                'experience' => [
                    [
                        'company' => 'Pinnacle Technologies Inc.',
                        'location' => 'Grace Park, Caloocan, Metro Manila',
                        'role' => 'Full Stack Developer',
                        'period' => 'March 2023 – Present',
                        'summary' => 'Build and maintain responsive, component-based user interfaces using React and Vue.js along with HTML5, CSS3, and JavaScript, while architecting server-side Laravel logic and RESTful APIs connecting frontends with optimized MySQL databases.',
                        'achievements' => [
                            'Build and maintain responsive, component-based user interfaces using React and Vue.js, along with HTML5, CSS3, and JavaScript.',
                            'Implement front-end features and enhancements based on design mockups and user feedback, ensuring crossbrowser compatibility across devices.',
                            'Design and implement server-side logic with the Laravel framework, and develop RESTful APIs that connect React and Vue.js front-ends to the back-end.',
                            'Create and optimize MySQL database structures for efficient data storage and retrieval.',
                            'Use AI tools (e.g., ChatGPT, Claude, GitHub Copilot) to speed up coding, debugging, refactoring, and documentation.',
                            'Delivered and supported core client systems including CLDH-EI AIMS, TMS AIMS, Bernardo College AIMS, Philyra Cloud POS, and ICCT Colleges SMS.'
                        ]
                    ],
                    [
                        'company' => 'Technical Support & Systems Administration',
                        'location' => 'Philippines',
                        'role' => 'Technical Support',
                        'period' => 'September 2018 – March 2023',
                        'summary' => 'Configured hardware, drivers, routers, Cisco networking (LAN/WAN), server administration (Linux, Windows), and user technical support.',
                        'achievements' => [
                            'Installed and managed LAN/WAN networks and components, including servers and IP configuration.',
                            'Managed security software and settings to protect systems and networks from attacks.',
                            'Troubleshot system failures and bugs, restored functionality, and trained users.'
                        ]
                    ]
                ],
                'education' => [
                    [
                        'degree' => 'B.S. Computer Science',
                        'institution' => 'Asian Institute of Computer Studies',
                        'location' => 'Caloocan City',
                        'period' => '2014 – 2018'
                    ]
                ],
                'awards' => [
                    'Best in Thesis (2018) — 3D Educational System'
                ]
            ]
        ]);
    }
}
