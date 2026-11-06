// Modal Data Store
        const productDetails = {
            engine: {
                title: "TurLux OS / GameEngine",
                tag: "Motor Gráfico Nativo Linux",
                version: "3.4.2 LTS",
                icon: "fa-cubes",
                color: "purple",
                description: "Entorno de desarrollo y runtime nativo optimizado para compilaciones en distribuciones Linux. Implementa llamadas directas a la API Vulkan 1.3 evitando capas de traducción, reduciendo la latencia de CPU al mínimo.",
                features: [
                    "Pipeline de renderizado multitarea nativo para Vulkan 1.3.",
                    "Soporte completo para servidores de despliegue Wayland y X11.",
                    "Integración nativa con controladores de audio ALSA y PipeWire.",
                    "Integración continua con firmas GPG de seguridad corporativa."
                ],
                requirements: "Linux Kernel 5.15+, GPU con soporte Vulkan 1.2+, 8GB RAM.",
                cmd: "sudo apt install turlux-gameengine"
            },
            stellarblade: {
                title: "StellarBlade: Linux Warfare",
                tag: "Videojuego AAA Nativo",
                version: "v1.0.4",
                icon: "fa-jet-fighter-up",
                color: "emerald",
                description: "RPG de acción en tercera persona ambientado en un universo cyberpunk. Construido desde el núcleo con TurLux Engine para ofrecer máxima tasa de cuadros y soporte nativo para periféricos y Steam Deck.",
                features: [
                    "Gráficos trazados por rayos (Ray Tracing) nativos sobre Vulkan.",
                    "Mapeo de mandos mediante biblioteca direct-input de Linux.",
                    "Guardado en la nube cifrado mediante repositorios TurLux S.A.",
                    "Totalmente libre de software anti-tamper de terceros que degrade rendimiento."
                ],
                requirements: "Ubuntu 22.04 / Zorin 17 / Mint 21, Nvidia RTX 2060 / RX 6600, 16GB RAM.",
                cmd: "flatpak install flathub com.turlux.StellarBlade"
            },
            pinguforge: {
                title: "PinguForge Studio",
                tag: "IDE & Asset Suite",
                version: "v2.1.0 Open-Core",
                icon: "fa-wand-magic-sparkles",
                color: "blue",
                description: "Entorno de diseño visual para artistas y desarrolladores. Diseñado con interfaz moderna en GTK4 y Libadwaita para integrarse armónicamente con la estética de distros como Zorin OS y GNOME.",
                features: [
                    "Editor de nodos de Shaders compilables a SPIR-V en tiempo real.",
                    "Importador automatizado de modelos FBX, OBJ y glTF.",
                    "Integración con control de versiones Git con bloqueo de claves expuestas.",
                    "Optimizador de texturas comprimidas para GPU de arquitectura Linux."
                ],
                requirements: "Distribución Linux x86_64 o ARM64, GTK4, 4GB RAM.",
                cmd: "flatpak install flathub com.turlux.PinguForge"
            },
            cybershield: {
                title: "CyberShield Linux",
                tag: "Enterprise Security Suite",
                version: "v4.0 Enterprise",
                icon: "fa-shield-virus",
                color: "rose",
                description: "Suite de seguridad perimetral y monitoreo para estaciones de trabajo y servidores Linux corporativos. Monitorea la integridad del kernel y aplica parches sin reinicios de producción.",
                features: [
                    "Telemetría en tiempo real mediante subsistema eBPF de Linux.",
                    "Verificación continua de firmas digitales de paquetes y ejecutables.",
                    "Bloqueo preventivo de procesos no autorizados según política corporativa.",
                    "Registro centralizado de comandos elevados y auditoría SSH."
                ],
                requirements: "Linux Kernel 5.4+ con eBPF habilitado, 2GB RAM.",
                cmd: "sudo apt install cybershield-agent"
            }
        };

        // Current Selected Terminal Tab state
        let currentTab = 'apt';

        // Filter Functionality
        document.addEventListener('DOMContentLoaded', () => {
            const categoryBtns = document.querySelectorAll('.category-btn');
            const productCards = document.querySelectorAll('.product-card');
            const searchInput = document.getElementById('searchInput');

            // Category Filter
            categoryBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    categoryBtns.forEach(b => {
                        b.classList.remove('active', 'bg-purple-600', 'text-white');
                        b.classList.add('hover:text-white');
                    });
                    btn.classList.add('active', 'bg-purple-600', 'text-white');

                    const category = btn.getAttribute('data-category');
                    filterProducts(category, searchInput.value.toLowerCase());
                });
            });

            // Search Filter
            searchInput.addEventListener('input', (e) => {
                const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
                filterProducts(activeCategory, e.target.value.toLowerCase());
            });

            function filterProducts(category, query) {
                productCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    const cardName = card.getAttribute('data-name');

                    const matchesCategory = (category === 'all' || cardCategory === category);
                    const matchesSearch = cardName.includes(query);

                    if (matchesCategory && matchesSearch) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }

            // Mobile Menu Toggle
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        });

        // Open Modal Function
        function openProductModal(key) {
            const data = productDetails[key];
            if (!data) return;

            const modalBody = document.getElementById('modalBody');
            
            modalBody.innerHTML = `
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-${data.color}-400 text-2xl">
                        <i class="fa-solid ${data.icon}"></i>
                    </div>
                    <div>
                        <span class="text-xs font-mono text-${data.color}-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">${data.tag}</span>
                        <h3 class="text-2xl font-bold text-white mt-1">${data.title}</h3>
                    </div>
                </div>

                <p class="text-slate-300 text-sm mb-6 leading-relaxed">${data.description}</p>

                <div class="space-y-4 mb-6">
                    <h4 class="text-xs font-mono text-slate-400 uppercase tracking-wider">Características Clave</h4>
                    <ul class="space-y-2 text-xs text-slate-300">
                        ${data.features.map(f => `<li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400 text-xs"></i> ${f}</li>`).join('')}
                    </ul>
                </div>

                <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-6">
                    <div class="text-xs font-mono text-slate-400 mb-1">REQUISITOS DEL SISTEMA</div>
                    <div class="text-xs text-slate-200 font-mono">${data.requirements}</div>
                </div>

                <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
                    <button onclick="copyRepoCommand('${data.cmd}')" class="flex-1 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2">
                        <i class="fa-solid fa-terminal"></i> Copiar Comando de Instalación
                    </button>
                    <button onclick="closeProductModal()" class="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors">
                        Cerrar
                    </button>
                </div>
            `;

            const modal = document.getElementById('productModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        // Close Modal Function
        function closeProductModal() {
            const modal = document.getElementById('productModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        // Terminal Tab Switcher
        function switchTerminalTab(tab) {
            currentTab = tab;
            document.querySelectorAll('.terminal-tab').forEach(b => {
                b.classList.remove('bg-purple-900/60', 'text-purple-200', 'border', 'border-purple-500/30');
                b.classList.add('bg-slate-800', 'text-slate-400');
            });

            document.getElementById(`tab-${tab}`).classList.remove('bg-slate-800', 'text-slate-400');
            document.getElementById(`tab-${tab}`).classList.add('bg-purple-900/60', 'text-purple-200', 'border', 'border-purple-500/30');

            document.querySelectorAll('.terminal-content').forEach(c => c.classList.add('hidden'));
            document.getElementById(`content-${tab}`).classList.remove('hidden');
        }

        // Copy Command Clipboard Helper
        function copyRepoCommand(commandText) {
            // Fallback execCommand for iframe compatibility
            const tempInput = document.createElement('textarea');
            tempInput.value = commandText;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            showToast(`Copiado: "${commandText}"`);
        }

        function copyCurrentTerminalCommand() {
            let cmd = "";
            if (currentTab === 'apt') cmd = "sudo add-apt-repository ppa:turlux-sa/stable && sudo apt update";
            if (currentTab === 'flatpak') cmd = "flatpak install flathub com.turlux.StellarBlade";
            if (currentTab === 'arch') cmd = "yay -S turlux-gameengine-bin";
            
            copyRepoCommand(cmd);
        }

        // Toast Notification Display
        function showToast(msg) {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            toastMessage.textContent = msg;

            toast.classList.remove('hidden');
            toast.classList.add('flex');

            setTimeout(() => {
                toast.classList.add('hidden');
                toast.classList.remove('flex');
            }, 3000);
        }
