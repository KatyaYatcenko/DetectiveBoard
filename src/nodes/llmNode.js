import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
    id={id}
      title="LLM"
     
      inputs={[
        { id: `${id}-system` },
        { id: `${id}-prompt` }
      ]}
      
      outputs={[
        { id: `${id}-response` }
      ]}
    >
      
      <div 
        style={{ 
          padding: '4px 0', 
          fontStyle: 'italic', 
          fontFamily: '"Courier Prime", monospace',
          color: '#232230',
          opacity: 0.7,
          fontSize: '13px'
        }}
      >
        Processing text model...
      </div>
    </BaseNode>
  );
}