import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error('Server error');
      const data = await response.json();

      alert(
        `🕵️‍♂️ CASE FILE ANALYSIS REPORT:\n\n` +
        `• Total Clues (Nodes): ${data.num_nodes}\n` +
        `• Connections (Edges): ${data.num_edges}\n` +
        `• Valid Timeline (Is DAG?): ${data.is_dag ? 'YES ✅' : 'NO ❌'}`
      );
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert('❌ Failed to connect to the detective backend.');
    }
  };

  return (
    <button
      onClick={handleSubmit}
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
      Submit
    </button>
  );
};