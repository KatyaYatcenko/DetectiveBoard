export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      onDragStart={(event) => onDragStart(event, type)}
      draggable
      style={{
        cursor: 'grab',
        width: '160px',
        height: '45px',
        backgroundColor: '#E79899', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000000',
        fontFamily: 'Irish Grover, cursive',
        fontSize: '14px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: '10px',
        userSelect: 'none'
      }}
    >
      {label}
    </div>
  );
};