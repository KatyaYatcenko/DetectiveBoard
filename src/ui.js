import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Background } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { SuspectNode } from './nodes/suspectNode';
import { EvidenceNode } from './nodes/evidenceNode';
import { AlibiNode } from './nodes/alibiNode';
import { NoteNode } from './nodes/noteNode';
import { CipherNode } from './nodes/cipherNode';

import { SubmitButton } from './submit';

import 'reactflow/dist/style.css';

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  suspect: SuspectNode,
  evidence: EvidenceNode,
  alibi: AlibiNode,
  note: NoteNode,
  cipher: CipherNode,
};

const gridSize = 20;
const proOptions = { hideAttribution: true };

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const ToolbarButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: '#7A2E2E',
      color: '#F2E6D8',
      border: '1px solid #4A1414',
      borderRadius: '6px',
      padding: '10px 18px',
      fontFamily: '"Special Elite", "Courier Prime", monospace',
      fontSize: '13px',
      fontWeight: 'bold',
      letterSpacing: '0.5px',
      cursor: 'pointer',
      boxShadow: '0 3px 8px rgba(0, 0, 0, 0.5)',
      transition: 'all 0.15s ease',
      marginBottom: '10px',
      width: '140px',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = '#8F3A3A';
      e.currentTarget.style.transform = 'translateY(-1px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = '#7A2E2E';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    {label}
  </button>
);

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const isValidConnection = (connection) => {
    return true; 
};

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const raw = event.dataTransfer.getData('application/reactflow');
      if (!raw || !reactFlowInstance) return;

      const { nodeType } = JSON.parse(raw);
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID = getNodeID(nodeType);
      addNode({ id: nodeID, type: nodeType, position, data: { id: nodeID } });
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleAddNode = (type) => {
    const nodeID = getNodeID(type);

    let position = { x: 250, y: 200 };
    if (reactFlowInstance && reactFlowWrapper.current) {
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      position = reactFlowInstance.project({
        x: bounds.width / 2 + (Math.random() - 0.5) * 150,
        y: bounds.height / 2 + (Math.random() - 0.5) * 150,
      });
    }

    addNode({ id: nodeID, type, position, data: { id: nodeID } });
  };

  return (
    <div
      ref={reactFlowWrapper}
      style={{ width: '100vw', height: '100vh', position: 'relative' }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineStyle={{ stroke: '#A42E2E', strokeWidth: 2 }}
        fitView
        isValidConnection={isValidConnection}
      >
        <Background color="#3A3950" gap={gridSize} />
      </ReactFlow>

      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          zIndex: 1000,
        }}
      >
        <ToolbarButton label="Add Input" onClick={() => handleAddNode('customInput')} />
        <ToolbarButton label="Add Text" onClick={() => handleAddNode('text')} />
        <SubmitButton />
      </div>
    </div>
  );
};