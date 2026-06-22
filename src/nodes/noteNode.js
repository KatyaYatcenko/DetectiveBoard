import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');

  return (
    <BaseNode
    id={id}
      title="Detective Note"
      inputs={[]} 
      outputs={[]} 
      styles={{ background: 'rgba(235, 200, 150, 0.85)' }} 
    >
      <textarea 
        value={note} 
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type important thoughts here..."
        rows={3}
        style={{ 
          background: 'transparent', 
          border: 'none', 
          width: '100%', 
          color: '#232230', 
          fontFamily: '"Courier Prime", monospace', 
          outline: 'none', 
          resize: 'none', 
          fontSize: '13px',
          lineHeight: '1.4'
        }}
      />
    </BaseNode>
  );
};