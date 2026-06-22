import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const SuspectNode = ({ id, data }) => {
  const [name, setName] = useState(data?.name || '');
  const [status, setStatus] = useState(data?.status || 'Under Suspicion');

  return (
    <BaseNode
    id={id}
      title="Suspect Profile"
      inputs={[{ id: `${id}-case-file` }]} 
      outputs={[{ id: `${id}-motive` }, { id: `${id}-alibi-check` }]} 
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
          Name:
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            style={{ 
              background: 'rgba(255, 255, 255, 0.7)', 
              border: '1px solid rgba(35, 34, 48, 0.4)', 
              borderRadius: '4px', 
              padding: '4px 6px', 
              color: '#232230',
              fontFamily: '"Courier Prime", monospace', 
              outline: 'none',
              fontSize: '13px'
            }}
          />
        </label>
        
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
          Status:
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            style={{ 
              background: 'rgba(255, 255, 255, 0.7)', 
              border: '1px solid rgba(35, 34, 48, 0.4)', 
              borderRadius: '4px', 
              padding: '4px 6px', 
              color: '#232230',
              fontFamily: '"Courier Prime", monospace', 
              outline: 'none', 
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            <option value="Under Suspicion">Under Suspicion</option>
            <option value="Innocent">Innocent</option>
            <option value="Arrested">Arrested</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};