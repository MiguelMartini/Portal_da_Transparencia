// Dados das capitais brasileiras com suas conexões e distâncias (em km)

export const capitals = [
  // Norte
  { id: 'manaus', name: 'Manaus', state: 'AM', x: 200, y: 100 },
  { id: 'rio-branco', name: 'Rio Branco', state: 'AC', x: 100, y: 150 },
  { id: 'porto-velho', name: 'Porto Velho', state: 'RO', x: 180, y: 180 },
  { id: 'boa-vista', name: 'Boa Vista', state: 'RR', x: 250, y: 50 },
  { id: 'belem', name: 'Belém', state: 'PA', x: 400, y: 120 },
  { id: 'macapa', name: 'Macapá', state: 'AP', x: 450, y: 80 },
  { id: 'palmas', name: 'Palmas', state: 'TO', x: 420, y: 280 },

  // Nordeste
  { id: 'sao-luis', name: 'São Luís', state: 'MA', x: 500, y: 150 },
  { id: 'teresina', name: 'Teresina', state: 'PI', x: 520, y: 200 },
  { id: 'fortaleza', name: 'Fortaleza', state: 'CE', x: 600, y: 180 },
  { id: 'natal', name: 'Natal', state: 'RN', x: 650, y: 220 },
  { id: 'joao-pessoa', name: 'João Pessoa', state: 'PB', x: 670, y: 240 },
  { id: 'recife', name: 'Recife', state: 'PE', x: 680, y: 260 },
  { id: 'maceio', name: 'Maceió', state: 'AL', x: 680, y: 290 },
  { id: 'aracaju', name: 'Aracaju', state: 'SE', x: 670, y: 310 },
  { id: 'salvador', name: 'Salvador', state: 'BA', x: 630, y: 350 },

  // Centro-Oeste
  { id: 'cuiaba', name: 'Cuiabá', state: 'MT', x: 300, y: 330 },
  { id: 'campo-grande', name: 'Campo Grande', state: 'MS', x: 350, y: 420 },
  { id: 'goiania', name: 'Goiânia', state: 'GO', x: 450, y: 380 },
  { id: 'brasilia', name: 'Brasília', state: 'DF', x: 480, y: 360 },

  // Sudeste
  { id: 'belo-horizonte', name: 'Belo Horizonte', state: 'MG', x: 540, y: 420 },
  { id: 'vitoria', name: 'Vitória', state: 'ES', x: 600, y: 430 },
  { id: 'rio-de-janeiro', name: 'Rio de Janeiro', state: 'RJ', x: 560, y: 470 },
  { id: 'sao-paulo', name: 'São Paulo', state: 'SP', x: 500, y: 480 },

  // Sul
  { id: 'curitiba', name: 'Curitiba', state: 'PR', x: 480, y: 530 },
  { id: 'florianopolis', name: 'Florianópolis', state: 'SC', x: 500, y: 570 },
  { id: 'porto-alegre', name: 'Porto Alegre', state: 'RS', x: 460, y: 610 },
];

export const connections = [
  // Região Norte
  { from: 'manaus', to: 'boa-vista', distance: 785 },
  { from: 'manaus', to: 'porto-velho', distance: 901 },
  { from: 'manaus', to: 'rio-branco', distance: 1445 },
  { from: 'manaus', to: 'belem', distance: 1646 },
  { from: 'rio-branco', to: 'porto-velho', distance: 544 },
  { from: 'porto-velho', to: 'cuiaba', distance: 1456 },
  { from: 'belem', to: 'macapa', distance: 600 },
  { from: 'belem', to: 'sao-luis', distance: 806 },
  { from: 'belem', to: 'palmas', distance: 1298 },

  // Nordeste
  { from: 'sao-luis', to: 'teresina', distance: 446 },
  { from: 'teresina', to: 'fortaleza', distance: 634 },
  { from: 'fortaleza', to: 'natal', distance: 537 },
  { from: 'natal', to: 'joao-pessoa', distance: 185 },
  { from: 'joao-pessoa', to: 'recife', distance: 120 },
  { from: 'recife', to: 'maceio', distance: 285 },
  { from: 'maceio', to: 'aracaju', distance: 294 },
  { from: 'aracaju', to: 'salvador', distance: 356 },
  { from: 'salvador', to: 'brasilia', distance: 1446 },
  { from: 'teresina', to: 'palmas', distance: 1031 },

  // Centro-Oeste
  { from: 'palmas', to: 'brasilia', distance: 973 },
  { from: 'palmas', to: 'goiania', distance: 700 },
  { from: 'cuiaba', to: 'goiania', distance: 934 },
  { from: 'cuiaba', to: 'campo-grande', distance: 694 },
  { from: 'campo-grande', to: 'goiania', distance: 935 },
  { from: 'goiania', to: 'brasilia', distance: 209 },
  { from: 'brasilia', to: 'belo-horizonte', distance: 741 },

  // Sudeste
  { from: 'belo-horizonte', to: 'vitoria', distance: 524 },
  { from: 'belo-horizonte', to: 'rio-de-janeiro', distance: 434 },
  { from: 'belo-horizonte', to: 'sao-paulo', distance: 586 },
  { from: 'vitoria', to: 'rio-de-janeiro', distance: 521 },
  { from: 'rio-de-janeiro', to: 'sao-paulo', distance: 429 },
  { from: 'sao-paulo', to: 'curitiba', distance: 408 },
  { from: 'campo-grande', to: 'sao-paulo', distance: 1014 },

  // Sul
  { from: 'curitiba', to: 'florianopolis', distance: 300 },
  { from: 'florianopolis', to: 'porto-alegre', distance: 476 },
  { from: 'curitiba', to: 'porto-alegre', distance: 711 },
];

// Criar grafo bidirecional (adicionar conexões reversas)
export const getGraph = () => {
  const graph = new Map();

  // Inicializar todos os nós
  capitals.forEach(capital => {
    graph.set(capital.id, new Map());
  });

  // Adicionar todas as conexões (bidirecional)
  connections.forEach(conn => {
    graph.get(conn.from)?.set(conn.to, conn.distance);
    graph.get(conn.to)?.set(conn.from, conn.distance);
  });

  return graph;
};
