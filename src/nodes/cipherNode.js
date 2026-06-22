import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const CipherNode = ({ id, data }) => {
  const [algorithm, setAlgorithm] = useState(data?.algorithm || 'Caesar');

  return (
    <BaseNode
    id={id}
      title="Cipher Decoder"
      inputs={[{ id: `${id}-encrypted-text` }]}
      outputs={[{ id: `${id}-decrypted-text` }]}
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
        Method:
        <select 
          value={algorithm} 
          onChange={(e) => setAlgorithm(e.target.value)} 
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
          <option value="Caesar">Caesar Cipher</option>
          <option value="ROT13">ROT13</option>
          <option value="Base64">Base64</option>
        </select>
      </label>
    </BaseNode>
  );
};