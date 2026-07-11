// ============================================
// ARQUIVO PRINCIPAL - Party Craft OS
// ============================================

// Inicialização do Sistema Operacional
console.log('🎮 Party Craft OS - Inicializando...');

// Configurações globais
window.GAME_CONFIG = {
    version: '1.0.0',
    debug: false
};

// Log de inicialização
window.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Party Craft OS carregado com sucesso!');
    console.log('Aplicativos disponíveis:', Object.keys(os.apps));
});
