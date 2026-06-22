import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text'); // Додав перевірку data?

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
    id={id}
      title="Output"
      inputs={[{ id: `${id}-value` }]} 
      outputs={[]} 
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
            value={currName} 
            onChange={handleNameChange}
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
          Type:
          <select 
            value={outputType} 
            onChange={handleTypeChange}
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
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}