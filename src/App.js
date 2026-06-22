import { PipelineUI } from './ui';

function App() {
  return (
    <div 
      style={{ 
        background: '#232230', 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden',
        position: 'relative',
        margin: 0,
        padding: 0
      }}
    >
      <PipelineUI />
    </div>
  );
}

export default App;