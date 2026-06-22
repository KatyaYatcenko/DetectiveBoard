import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const AlibiNode = ({ id, data }) => {
  const [isConfirmed, setIsConfirmed] = useState(data?.isConfirmed || false);

  return (
    <BaseNode
    id={id}
      title="Alibi Verification"
      inputs={[{ id: `${id}-suspect-link` }, { id: `${id}-witness-statement` }]} 
      outputs={[{ id: `${id}-verdict` }]} // Один вихід
    >
      <label 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          fontWeight: 'normal', 
          cursor: 'pointer',
          fontFamily: '"Courier Prime", monospace', 
          color: '#232230', 
          fontSize: '14px'
        }}
      >
        <input 
          type="checkbox" 
          checked={isConfirmed} 
          onChange={(e) => setIsConfirmed(e.target.checked)}
          style={{ 
            width: '16px', 
            height: '16px', 
            cursor: 'pointer',
            accentColor: '#A42E2E' 
          }}
        />
        Alibi Confirmed
      </label>
    </BaseNode>
  );
};