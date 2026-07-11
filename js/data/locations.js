// ============================================
// DADOS DE LOCALIDADES E CASAS
// ============================================

const LOCATIONS = [
    {
        id: 'plaza',
        name: 'Plaza Central',
        icon: '🏛️',
        x: 400,
        y: 250,
        distance: '150m',
        description: 'Encontro de jogadores',
        players: 12,
        type: 'social'
    },
    {
        id: 'store',
        name: 'App Store Central',
        icon: '🛒',
        x: 300,
        y: 100,
        distance: '280m',
        description: 'Compre aplicativos e itens',
        players: 5,
        type: 'shop'
    },
    {
        id: 'arena',
        name: 'Arena de Jogos',
        icon: '🎮',
        x: 550,
        y: 150,
        distance: '420m',
        description: 'Participe de mini-games',
        players: 25,
        type: 'games'
    },
    {
        id: 'cafe',
        name: 'Café Social',
        icon: '☕',
        x: 200,
        y: 400,
        distance: '350m',
        description: 'Converse com amigos',
        players: 8,
        type: 'social'
    },
    {
        id: 'library',
        name: 'Biblioteca',
        icon: '📚',
        x: 650,
        y: 300,
        distance: '600m',
        description: 'Aprenda sobre o jogo',
        players: 3,
        type: 'educational'
    }\n];\n\nconst HOUSES = [\n    {\n        id: 'house_1',\n        name: 'Minha Casa',\n        x: 250,\n        y: 180,\n        owner: 'Você',\n        color: '#ff6b6b',\n        level: 5,\n        rooms: 4,\n        furniture: 12,\n        description: 'Sua casa residencial'\n    },\n    {\n        id: 'house_2',\n        name: 'Casa de João',\n        x: 350,\n        y: 250,\n        owner: 'João Silva',\n        color: '#4ecdc4',\n        level: 3,\n        rooms: 2,\n        furniture: 5,\n        description: 'Casa do seu amigo João'\n    },\n    {\n        id: 'house_3',\n        name: 'Casa de Maria',\n        x: 550,\n        y: 350,\n        owner: 'Maria Santos',\n        color: '#ffe66d',\n        level: 7,\n        rooms: 6,\n        furniture: 18,\n        description: 'Mansão de Maria'\n    },\n    {\n        id: 'community_house',\n        name: 'Casa Comunitária',\n        x: 150,\n        y: 400,\n        owner: 'Comunidade',\n        color: '#95e1d3',\n        level: 10,\n        rooms: 8,\n        furniture: 25,\n        description: 'Local para reuniões em grupo'\n    },\n    {\n        id: 'party_house',\n        name: 'Casa de Festas',\n        x: 300,\n        y: 350,\n        owner: 'Sistema',\n        color: '#ff9999',\n        level: 8,\n        rooms: 5,\n        furniture: 20,\n        description: 'Perfeita para festas'\n    }\n];\n\nconst PLAYERS = [\n    {\n        id: 'player_1',\n        name: 'Você',\n        x: 250,\n        y: 180,\n        level: 5,\n        color: '#ff0000',\n        status: 'online',\n        location: 'Minha Casa',\n        points: 5420\n    },\n    {\n        id: 'player_2',\n        name: 'João Silva',\n        x: 400,\n        y: 200,\n        level: 6,\n        color: '#0000ff',\n        status: 'online',\n        location: 'Plaza Central',\n        points: 6890\n    },\n    {\n        id: 'player_3',\n        name: 'Maria Santos',\n        x: 600,\n        y: 100,\n        level: 8,\n        color: '#00ff00',\n        status: 'online',\n        location: 'Arena de Jogos',\n        points: 9234\n    },\n    {\n        id: 'player_4',\n        name: 'Pedro Costa',\n        x: 150,\n        y: 300,\n        level: 4,\n        color: '#ffff00',\n        status: 'offline',\n        location: 'Última: Casa de Festa',\n        points: 3210\n    },\n    {\n        id: 'player_5',\n        name: 'Ana Oliveira',\n        x: 500,\n        y: 400,\n        level: 3,\n        color: '#ff00ff',\n        status: 'online',\n        location: 'Café Social',\n        points: 2150\n    }\n];
