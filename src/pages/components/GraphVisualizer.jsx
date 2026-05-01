import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls, MarkerType} from 'reactflow';
import 'reactflow/dist/style.css';

function GraphVisualizer({ capitals = [], connections = [], highlightedPath = []}) {
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

// memoriza renderizacao dos vertices
  const nodes = useMemo(() => {
    return capitals.map((cap) => {
      const isInPath = highlightedPath.includes(cap.id);
      let background = isInPath ? '#ff0000' : '#3b82f6';

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
      const isHighlighted = highlightedEdgesSet.has(`${conn.from}-${conn.to}`);

      return {
        id: `${conn.from}-${conn.to}`,
        source: conn.from,
        target: conn.to,
        label: `${conn.distance} km`,
        animated: isHighlighted,
        style: {
          stroke: isHighlighted ? '#ff0000' : '#3F3F3F',
          strokeWidth: isHighlighted ? 3 : 1.5
        },
        labelStyle: {
          fontSize: 12,
          fill: isHighlighted ? '#ff0000' : '#3F3F3F',
          fontWeight: isHighlighted ? 'bold' : 'normal'
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isHighlighted ? '#ff0000' : '#3F3F3F'
        },
        zIndex: isHighlighted ? 10 : 1
      };
    });
  }, [connections, highlightedEdgesSet]);

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