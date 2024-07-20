// frontend/src/components/Column.js
import React, { useEffect, useState } from 'react';
import Task from './Task';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Column = ({ status }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`/api/tasks?status=${status}`).then((response) => {
      setTasks(response.data);
    });
  }, [status]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);
    axios.put(`/api/tasks/${movedTask._id}`, { status: result.destination.droppableId });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            className="column"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h2>{status}</h2>
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Column;
