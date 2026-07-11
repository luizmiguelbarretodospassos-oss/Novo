// ============================================
// KERNEL DO SISTEMA OPERACIONAL
// ============================================

class OperatingSystem {
    constructor() {
        this.windows = [];
        this.activeWindow = null;
        this.apps = {};
        this.fs = new FileSystem();
        this.windowManager = new WindowManager();
        this.appLoader = new AppLoader();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.registerApps();
        this.startSystemServices();
        this.hideLoadingScreen();
    }

    setupEventListeners() {
        // Desktop icons
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                const appName = icon.dataset.app;
                this.launchApp(appName);
            });
            icon.addEventListener('dblclick', (e) => {
                e.stopPropagation();
                const appName = icon.dataset.app;
                this.launchApp(appName);
            });
        });

        // Start menu
        const startBtn = document.getElementById('start-menu-btn');
        const startMenu = document.getElementById('start-menu');
        
        startBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('hidden');
            this.populateStartMenu();
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('#start-menu') && !e.target.closest('#start-menu-btn')) {
                startMenu.classList.add('hidden');
            }
        });

        // System clock
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);

        // Context menu
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showContextMenu(e.clientX, e.clientY);
        });
    }

    registerApps() {
        this.apps = {
            'browser': { name: 'Navegador', icon: '🌐', type: 'browser' },
            'app-store': { name: 'App Store', icon: '🛒', type: 'app-store' },
            'phone': { name: 'Telefone', icon: '☎️', type: 'phone' },
            'camera': { name: 'Câmera', icon: '📷', type: 'camera' },
            'messages': { name: 'Mensagens', icon: '💬', type: 'chat' },
            'videos': { name: 'Vídeos', icon: '🎬', type: 'video' },
            'maps': { name: 'Mapa', icon: '🗺️', type: 'maps' },
            'games': { name: 'Party Craft', icon: '🎮', type: 'games' },
            'files': { name: 'Arquivos', icon: '📁', type: 'files' },
            'settings': { name: 'Configurações', icon: '⚙️', type: 'settings' }
        };
    }

    launchApp(appName) {
        if (!this.apps[appName]) return;
        
        const app = this.apps[appName];
        const window = this.windowManager.createWindow({
            title: app.name,
            icon: app.icon,
            type: app.type,
            width: 800,
            height: 500
        });

        // Load appropriate app content
        this.loadAppContent(app.type, window);
        this.addToTaskbar(app.name, window);
    }

    loadAppContent(type, windowEl) {
        const contentArea = windowEl.querySelector('.window-content');
        
        switch(type) {
            case 'browser':
                this.loadBrowser(contentArea);
                break;
            case 'app-store':
                this.loadAppStore(contentArea);
                break;
            case 'phone':
                this.loadPhone(contentArea);
                break;
            case 'chat':
                this.loadChat(contentArea);
                break;
            case 'video':
                this.loadVideoPlayer(contentArea);
                break;
            case 'maps':
                this.loadMaps(contentArea);
                break;
            case 'camera':
                this.loadCamera(contentArea);
                break;
            case 'files':
                this.loadFiles(contentArea);
                break;
            case 'settings':
                this.loadSettings(contentArea);
                break;
            case 'games':
                this.loadGames(contentArea);
                break;
        }
    }

    loadBrowser(container) {
        container.innerHTML = Browser.getHTML();
        Browser.init(container);
    }

    loadAppStore(container) {
        container.innerHTML = AppStore.getHTML();
        AppStore.init(container);
    }

    loadPhone(container) {
        container.innerHTML = Phone.getHTML();
        Phone.init(container);
    }

    loadChat(container) {
        container.innerHTML = Chat.getHTML();
        Chat.init(container);
    }

    loadVideoPlayer(container) {
        container.innerHTML = VideoPlayer.getHTML();
        VideoPlayer.init(container);
    }

    loadMaps(container) {
        container.innerHTML = MapsApp.getHTML();
        MapsApp.init(container);
    }

    loadCamera(container) {
        container.innerHTML = `<div style="padding: 20px; text-align: center;"><h2>📷 Câmera</h2><p>Câmera será implementada em breve!</p></div>`;
    }

    loadFiles(container) {
        container.innerHTML = `<div style="padding: 20px;"><h2>📁 Gerenciador de Arquivos</h2><p>Seus arquivos aparecem aqui...</p></div>`;
    }

    loadSettings(container) {
        container.innerHTML = `
            <div style="padding: 20px;">
                <h2>⚙️ Configurações</h2>
                <div style="margin-top: 20px;">
                    <label>Som: <input type="range" value="80" min="0" max="100"></label>
                    <label>Brilho: <input type="range" value="100" min="0" max="100"></label>
                </div>
            </div>
        `;
    }

    loadGames(container) {
        container.innerHTML = `
            <div style="padding: 20px; text-align: center;">
                <h2>🎮 Party Craft</h2>
                <p>Escolha um mini-game:</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px;">
                    <button style="padding: 20px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;">💃 Dança</button>
                    <button style="padding: 20px; background: #764ba2; color: white; border: none; border-radius: 8px; cursor: pointer;">🎵 Música</button>
                    <button style="padding: 20px; background: #ec4899; color: white; border: none; border-radius: 8px; cursor: pointer;">🎨 Desenho</button>
                    <button style="padding: 20px; background: #f59e0b; color: white; border: none; border-radius: 8px; cursor: pointer;">❓ Trivia</button>
                </div>
            </div>
        `;
    }

    addToTaskbar(appName, windowEl) {
        const taskbar = document.getElementById('taskbar-apps');
        const btn = document.createElement('button');
        btn.className = 'taskbar-app active';
        btn.textContent = appName;
        
        btn.addEventListener('click', () => {
            if (windowEl.style.display === 'none') {
                windowEl.style.display = 'flex';
            } else {
                windowEl.style.display = 'none';
            }
        });
        
        taskbar.appendChild(btn);
    }

    populateStartMenu() {
        const list = document.getElementById('start-apps-list');
        list.innerHTML = '';
        
        Object.entries(this.apps).forEach(([key, app]) => {
            const item = document.createElement('div');
            item.className = 'app-item';
            item.innerHTML = `<div class="icon">${app.icon}</div><span>${app.name}</span>`;
            item.addEventListener('click', () => {
                this.launchApp(key);
                document.getElementById('start-menu').classList.add('hidden');
            });
            list.appendChild(item);
        });
    }

    updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        document.getElementById('system-clock').textContent = `${hours}:${minutes}`;
    }

    showContextMenu(x, y) {
        const menu = document.getElementById('context-menu');
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        menu.classList.remove('hidden');
        
        setTimeout(() => {
            document.addEventListener('click', () => {
                menu.classList.add('hidden');
            }, { once: true });
        }, 0);
    }

    startSystemServices() {
        console.log('🚀 Party Craft OS iniciado!');
    }

    hideLoadingScreen() {
        const loading = document.getElementById('loading-screen');
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 3000);
    }
}

// Inicializar SO quando página carregar
let os;
window.addEventListener('DOMContentLoaded', () => {
    os = new OperatingSystem();
});
