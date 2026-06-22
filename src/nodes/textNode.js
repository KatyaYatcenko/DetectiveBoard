import { useState, useEffect, useRef } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(currText)) !== null) {
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    }
    setVariables(matches);
  }, [currText]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, currText, id, updateNodeInternals]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const determineStyles = () => {
    const lines = currText.split('\n').length;
    const maxLength = Math.max(...currText.split('\n').map((l) => l.length), 10);

    return {
      width: `${Math.min(Math.max(maxLength * 8 + 60, 200), 380)}px`,
      height: `${Math.min(Math.max(lines * 20 + 90, 120), 280)}px`,
      transition: 'width 0.1s ease, height 0.1s ease',
    };
  };

  const dynamicInputs = variables.map((varName) => ({
    id: `${id}-${varName}`,
  }));

  return (
    <BaseNode
    id={id}
      title="Text"
      inputs={dynamicInputs}
      outputs={[{ id: `${id}-output` }]}
      styles={determineStyles()}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', height: '100%', boxSizing: 'border-box' }}>
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            fontWeight: 'normal',
            fontFamily: '"Courier Prime", monospace',
            color: '#232230',
            fontSize: '13px',
            height: '100%',
          }}
        >
          Text:
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            rows={2}
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(35, 34, 48, 0.4)',
              borderRadius: '4px',
              padding: '6px',
              color: '#232230',
              fontFamily: '"Courier Prime", monospace',
              outline: 'none',
              resize: 'none',
              width: '100%',
              boxSizing: 'border-box',
              flex: '1',
              fontSize: '13px',
              lineHeight: '1.4',
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
};