import React, { useEffect } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';

export const BaseNode = ({ id, title, children, inputs = [], outputs = [], styles = {} }) => {
  const updateNodeInternals = useUpdateNodeInternals();

  
  useEffect(() => {
    updateNodeInternals(id);
  }, [inputs, outputs, id, updateNodeInternals]);

  return (
    <div
      style={{
        backgroundColor: '#C2898B',
        border: '1px solid #6E3A3B',
        borderRadius: '6px',
        padding: '10px 14px',
        color: '#1F1E2A',
        fontFamily: '"Special Elite", "Courier Prime", monospace',
        minWidth: '160px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
        position: 'relative',
        ...styles,
      }}
    >
      
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            background: '#FFFFFF',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            border: '2px solid #232230',
            left: '-6px',
            top: inputs.length > 1 ? `${((index + 1) / (inputs.length + 1)) * 100}%` : '50%',
          }}
        />
      ))}

      <div style={{ fontWeight: '700', fontSize: '15px', textAlign: 'center', marginBottom: '8px' }}>
        {title}
      </div>

      {children}

     
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            background: '#FFFFFF',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            border: '2px solid #232230',
            right: '-6px',
            top: outputs.length > 1 ? `${((index + 1) / (outputs.length + 1)) * 100}%` : '50%',
          }}
        />
      ))}
    </div>
  );
};