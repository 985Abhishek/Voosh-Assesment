import React from 'react';
import { useDrag } from 'react-dnd';

function TaskCard({ task }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className="task-card" ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
}

export default TaskCard;
