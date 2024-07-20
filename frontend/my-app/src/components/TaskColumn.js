import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import {useTasks} from '../hooks/useTasks';

const TaskColumn = ({ status }) => {
  const { tasks, moveTask } = useTasks();

  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, status),
  });

  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div ref={drop} className="task-column">
      <h2>{status}</h2>
      {filteredTasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskColumn;
