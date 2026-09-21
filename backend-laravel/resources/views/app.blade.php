<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Laravel Vue Enterprise Admin' }} | Pinnacle Portfolio</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Tailwind & Fonts -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        dark: { bg: '#080b11', card: '#0f172a', border: '#1e293b' }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace']
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-[#080b11] text-slate-100 font-sans min-h-screen">
    <!-- Vue 3 Root Mount -->
    <div id="vue-app" data-view="{{ $view ?? 'dashboard' }}"></div>

    <!-- Load Vue 3 via CDN for instant zero-build execution in MVC Blade -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
    <script src="/resources/js/app.js"></script>
</body>
</html>

