/**
 * Vue 3 Root Application for Laravel MVC
 * Provides reactive admin management and API testing inside Laravel.
 */

const { createApp, ref, onMounted } = Vue;

const App = {
    setup() {
        const activeTab = ref('projects');
        const projects = ref([]);
        const loading = ref(true);
        const selectedProject = ref(null);
        const apiLog = ref('Ready to test endpoints.');

        const fetchProjects = async () => {
            loading.value = true;
            try {
                const res = await fetch('/api/projects');
                const data = await res.json();
                projects.value = data.data || [];
            } catch (err) {
                console.error("Failed to load projects from Laravel API", err);
            } finally {
                loading.value = false;
            }
        };

        const testApi = async (endpoint) => {
            apiLog.value = `Calling ${endpoint}...`;
            try {
                const res = await fetch(endpoint);
                const data = await res.json();
                apiLog.value = JSON.stringify(data, null, 2);
            } catch (err) {
                apiLog.value = `Error: ${err.message}`;
            }
        };

        onMounted(() => {
            fetchProjects();
        });

        return {
            activeTab,
            projects,
            loading,
            selectedProject,
            apiLog,
            testApi
        };
    },
    template: `
        <div class="min-h-screen flex flex-col">
            <!-- Navbar -->
            <header class="h-16 border-b border-slate-800 bg-slate-950 px-6 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white text-xs">
                        LV
                    </div>
                    <div>
                        <h1 class="font-bold text-white text-sm">Laravel 11 + Vue 3 MVC Admin</h1>
                        <p class="text-[10px] text-slate-400 font-mono">Pinnacle Deployments Manager</p>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <button 
                        @click="activeTab = 'projects'"
                        :class="activeTab === 'projects' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'"
                        class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    >
                        Projects Catalog (5)
                    </button>
                    <button 
                        @click="activeTab = 'api'"
                        :class="activeTab === 'api' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'"
                        class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    >
                        REST API Tester
                    </button>
                    <a 
                        href="http://localhost:3000" 
                        target="_blank"
                        class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium ml-2 shadow"
                    >
                        Open React Portfolio →
                    </a>
                </div>
            </header>

            <!-- Main Body -->
            <main class="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
                <!-- Projects View -->
                <div v-if="activeTab === 'projects'" class="space-y-4">
                    <div class="flex justify-between items-center">
                        <div>
                            <h2 class="text-xl font-bold text-white">Client Enterprise Deployments</h2>
                            <p class="text-xs text-slate-400">Live systems built at Pinnacle Technologies</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div 
                            v-for="p in projects" 
                            :key="p.id"
                            class="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
                        >
                            <div>
                                <div class="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                                    <span class="px-2 py-0.5 rounded bg-slate-800 text-blue-300">{{ p.category }}</span>
                                    <span class="text-emerald-400">● {{ p.badge }}</span>
                                </div>
                                <h3 class="font-bold text-white text-base">{{ p.title }}</h3>
                                <p class="text-xs text-blue-400 font-mono mt-0.5">{{ p.client }}</p>
                                <p class="text-xs text-slate-300 mt-2 line-clamp-2">{{ p.summary }}</p>
                            </div>

                            <div class="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center">
                                <a :href="p.url" target="_blank" class="text-xs text-blue-400 hover:underline flex items-center gap-1">
                                    Visit Portal ↗
                                </a>
                                <button @click="testApi('/api/projects/' + p.slug); activeTab = 'api'" class="text-[11px] text-slate-400 hover:text-white">
                                    Test API
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- API Explorer View -->
                <div v-if="activeTab === 'api'" class="space-y-4">
                    <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                        <h3 class="text-sm font-bold text-white font-mono uppercase tracking-wider">Laravel REST Endpoints</h3>
                        <div class="flex flex-wrap gap-2">
                            <button @click="testApi('/api/projects')" class="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-emerald-400">
                                GET /api/projects
                            </button>
                            <button @click="testApi('/api/projects/pos-tms-philyra')" class="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-emerald-400">
                                GET /api/projects/pos-tms-philyra
                            </button>
                            <button @click="testApi('/api/profile')" class="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-emerald-400">
                                GET /api/profile
                            </button>
                            <button @click="testApi('/api/metrics')" class="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-emerald-400">
                                GET /api/metrics
                            </button>
                        </div>
                    </div>

                    <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                        <pre class="text-blue-300 overflow-x-auto whitespace-pre-wrap">{{ apiLog }}</pre>
                    </div>
                </div>
            </main>
        </div>
    `
};

createApp(App).mount('#vue-app');

