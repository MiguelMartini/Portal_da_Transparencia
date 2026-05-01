import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import CircleNode from './nodes/CircleNode';

const nodeTypes = {
  circle: CircleNode,
};

const initialNodes = [
  { id: 'n1', type: 'circle', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: 'n2', type: 'circle', position: { x: 200, y: 50 }, data: { label: 'Node 2' } },
  { id: 'n3', type: 'circle', position: { x: 100, y: 150 }, data: { label: 'Node 3' } },
  { id: 'n4', type: 'circle', position: { x: 60, y: 300 }, data: { label: 'Node 4' } },
];
const initialEdges = [
    { id: 'n1-n2', source: 'n1', target: 'n2' }, 
    {id: 'n2-n3', source: 'n2', target: 'n3', label: 5, labelStyle: { fill: 'red', fontWeight: 'bold' }, },
    {id: 'n1-n4', source: 'n1', target: 'n4',style: { stroke: 'red', strokeWidth: 3 }, } 
];
 

function Graph() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div className='bg-[#4A5565] flex justify-center' style={{ width: '50vh', height: '50vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange} 
        onConnect={onConnect}
        fitView
      />
    </div>
  )
}

export default Graph