import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px',
            background: 'rgba(35, 34, 48, 0.9)', // Глибокий колір теми
            padding: '15px',
            borderRadius: '12px',
            border: '1px solid rgba(231, 152, 153, 0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)'
        }}>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', // Сітка 2х2 для компактності
                gap: '8px' 
            }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='suspect' label='Suspect' />
                <DraggableNode type='evidence' label='Evidence' />
                <DraggableNode type='alibi' label='Alibi' />
                <DraggableNode type='note' label='Note' />
                <DraggableNode type='cipher' label='Cipher' />
            </div>
        </div>
    );
};