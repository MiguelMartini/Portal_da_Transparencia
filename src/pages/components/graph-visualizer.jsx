import React, { useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

export function GraphVisualizer({
  capitals = [],
  connections = [],
  highlightedPath = []
}) {

  // 🔗 Cria pares consecutivos do caminho (A -> B, B -> C...)
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

  // 🔵 NODES (capitais)
  const nodes = useMemo(() => {
    return capitals.map((cap) => {
      const isInPath = highlightedPath.includes(cap.id);
      const isStart = cap.id === highlightedPath[0];
      const isEnd = cap.id === highlightedPath[highlightedPath.length - 1];

      let background = '#3b82f6';

      if (isStart || isEnd) background = '#ef4444';
      else if (isInPath) background = '#22c55e';

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
          border: 'none'
        }
      };
    });
  }, [capitals, highlightedPath]);

  // 🔗 EDGES (conexões)
  const edges = useMemo(() => {
    return connections.map((conn) => {
      const isHighlighted =
        highlightedEdgesSet.has(`${conn.from}-${conn.to}`);

      return {
        id: `${conn.from}-${conn.to}`,
        source: conn.from,
        target: conn.to,
        label: `${conn.distance} km`,
        animated: isHighlighted,
        style: {
          stroke: isHighlighted ? '#22c55e' : '#94a3b8',
          strokeWidth: isHighlighted ? 3 : 1.5
        },
        labelStyle: {
          fontSize: 12,
          fill: '#475569'
        },
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
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