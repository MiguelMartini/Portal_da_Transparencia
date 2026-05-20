import React, { useMemo } from 'react';
import ReactFlow, { Controls, MarkerType } from 'reactflow';
// Verifique se o nome do arquivo da imagem bate com o que você salvou na pasta assets
import mapaBrasil from '../assets/mapaBrasil.png'; 
import 'reactflow/dist/style.css';

// 1. Criação do Nó Customizado para o Fundo
const MapBackgroundNode = () => {
  return (
    <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      <img 
        src={mapaBrasil} 
        alt="Mapa Base do Brasil" 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
      />
    </div>
  );
};

// 2. Registro do tipo de nó para o React Flow reconhecer
const nodeTypes = {
  mapBackground: MapBackgroundNode,
};

function GraphVisualizer({ capitals = [], connections = [], highlightedPath = [], highlightedEdges = [] }) {

  // 3. Memoriza a renderização dos vértices (Nós das capitais + Nó do Mapa)
  const nodes = useMemo(() => {
    
    // Configuração do nó do mapa (Fundo)
    const bgNode = {
      id: 'mapa-brasil-bg',
      type: 'mapBackground', 
      position: { x: -850, y: -250 }, 
      style: { width: 4440, height: 2560 },
      draggable: false, 
      selectable: false, 
      zIndex: -1, 
    };

    // Mapeia as capitais com a sua lógica de cores e tamanhos
    const capitalNodes = capitals.map((cap) => {
      const isInPath = highlightedPath.includes(cap.id);
      let background = isInPath ? '#204786' : '#5192FB';

      return {
        id: cap.id,
        position: { x: cap.x * 3, y: cap.y * 3 }, // Mantive a sua lógica de multiplicar por 3
        data: {
          label: (
            <div style={{ textAlign: 'center' }}>
              <strong>{cap.name}</strong>
              <div style={{ fontSize: 10 }}>{cap.state}</div>
            </div>
          )
        },
        style: {
          background,
          color: '#fff',
          borderRadius: '50%',
          padding: 10,
          width: 60,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
          zIndex: isInPath ? 10 : 1
        }
      };
    });

    // Retorna o mapa PRIMEIRO, e depois as capitais
    return [bgNode, ...capitalNodes];
  }, [capitals, highlightedPath]);

  // 4. Memoriza renderização das arestas do caminho
  const highlightedEdgesSet = useMemo(() => {
    const set = new Set();
    for (let i = 0; i < highlightedPath.length - 1; i++) {
      const from = highlightedPath[i];
      const to = highlightedPath[i + 1];
      set.add(`${from}-${to}`);
      set.add(`${to}-${from}`);
    }
    return set;
  }, [highlightedPath]);

  const highlightedEdgesMap = useMemo(() => {
    const map = new Map();
    highlightedEdges.forEach(({ from, to, type }) => {
      map.set(`${from}-${to}`, type);
      map.set(`${to}-${from}`, type);
    });
    return map;
  }, [highlightedEdges]);

  // 5. Memoriza as arestas
  const edges = useMemo(() => {
    return connections.map((conn) => {
      const key = `${conn.from}-${conn.to}`;
      const type = highlightedEdgesMap.get(key);

      const isHighlighted = !!type;
      let color = '#3F3F3F';

      if (isHighlighted) {
        color = type === 'ferrovia' ? '#16a34a' : '#ef4444';
        // verde = ferrovia | vermelho = rodovia
      }

      return {
        id: key,
        source: conn.from,
        target: conn.to,
        label: `${conn.distance} km`,
        animated: isHighlighted,
        style: {
          stroke: color,
          strokeWidth: isHighlighted ? 3 : 1.5
        },
        labelStyle: {
          fontSize: 12,
          fill: color,
          fontWeight: isHighlighted ? 'bold' : 'normal'
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: color
        },
        zIndex: isHighlighted ? 10 : 1
      };
    });
  }, [connections, highlightedEdgesMap]);

  return (
    <div style={{ width: '100%', height: '800px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes} // Injeta o tipo customizado que criamos lá em cima
        fitView
        minZoom={0.2}
        maxZoom={2}
      >
        {/* Mantive o Controls para você conseguir dar zoom in/out */}
        <Controls /> 
      </ReactFlow>
    </div>
  );
}

export default GraphVisualizer;