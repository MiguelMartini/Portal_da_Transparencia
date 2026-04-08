import { Handle, Position } from '@xyflow/react';

const CircleNode = ({ data }) => {
  return (
    <div
      style={{
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: '#3b82f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        position: 'relative',
      }}
    >
      {/* Entrada */}
      <Handle type="target" position={Position.Top} />

      {/* Saída */}
      <Handle type="source" position={Position.Bottom} />

      {data.label}
    </div>
  );
};

export default CircleNode;