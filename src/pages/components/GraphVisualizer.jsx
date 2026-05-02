import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls, MarkerType} from 'reactflow';
import 'reactflow/dist/style.css';

function GraphVisualizer({ capitals = [], connections = [], highlightedPath = [], highlightedEdges = []}) {

// memoriza renderizacao das arestas do caminho
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

// memoriza renderizacao dos vertices
  const nodes = useMemo(() => {
    return capitals.map((cap) => {
      const isInPath = highlightedPath.includes(cap.id);
      let background = isInPath ? '#204786' : '#5192FB';

      return {
        id: cap.id,
        position: { x: cap.x * 3, y: cap.y * 3 },
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
  }, [capitals, highlightedPath]);

// memoriaza as arestas
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
        fitView
        minZoom={0.2}
        maxZoom={2}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
export default GraphVisualizer;