// Implementação do algoritmo de Dijkstra para encontrar o menor caminho

export function dijkstra(graph, start, end) {
  const distances = new Map();
  const previous = new Map();
  const unvisited = new Set(graph.keys());

  // Inicializar distâncias
  graph.forEach((_, node) => {
    distances.set(node, node === start ? 0 : Infinity);
    previous.set(node, null);
  });

  while (unvisited.size > 0) {
    // Encontrar o nó não visitado com menor distância
    let currentNode = null;
    let minDistance = Infinity;

    unvisited.forEach(node => {
      const dist = distances.get(node) || Infinity;
      if (dist < minDistance) {
        minDistance = dist;
        currentNode = node;
      }
    });

    if (currentNode === null || minDistance === Infinity) {
      break; // Não há mais nós alcançáveis
    }

    if (currentNode === end) {
      break; // Encontramos o destino
    }

    unvisited.delete(currentNode);

    // Atualizar distâncias dos vizinhos
    const neighbors = graph.get(currentNode);
    if (neighbors) {
      neighbors.forEach((weight, neighbor) => {
        if (unvisited.has(neighbor)) {
          const currentDistance = distances.get(currentNode) || 0;
          const newDistance = currentDistance + weight;
          const neighborDistance = distances.get(neighbor) || Infinity;

          if (newDistance < neighborDistance) {
            distances.set(neighbor, newDistance);
            previous.set(neighbor, currentNode);
          }
        }
      });
    }
  }

  // Reconstruir o caminho
  const path = [];
  let current = end;

  while (current) {
    path.unshift(current);
    current = previous.get(current);
  }

  // Se o caminho não começa com start, não há caminho
  if (path[0] !== start) {
    return null;
  }

  return {
    path,
    distance: distances.get(end) || 0,
    distances,
  };
}
