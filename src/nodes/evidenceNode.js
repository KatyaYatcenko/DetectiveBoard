import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const EvidenceNode = ({ id, data }) => {
  const [type, setType] = useState(data?.type || 'Fingerprint');

  return (
    <BaseNode
    id={id}
      title="Evidence"
      inputs={[]} 
      outputs={[{ id: `${id}-lab-result` }]} 
    >
      <label 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '4px', 
          fontWeight: 'normal', 
          fontFamily: '"Courier Prime", monospace',
          color: '#232230',
          fontSize: '13px'
        }}
      >
        Evidence Type:
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)} 
          style={{ 
            background: 'rgba(255, 255, 255, 0.7)', 
            border: '1px solid rgba(35, 34, 48, 0.4)', 
            borderRadius: '4px', 
            padding: '4px 6px', 
            fontFamily: '"Courier Prime", monospace', 
            color: '#232230',
            outline: 'none', 
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          <option value="Fingerprint">Fingerprint</option>
          <option value="Weapon">Weapon</option>
          <option value="DNA Sample">DNA Sample</option>
          <option value="Footprint">Footprint</option>
        </select>
      </label>
    </BaseNode>
  );
};