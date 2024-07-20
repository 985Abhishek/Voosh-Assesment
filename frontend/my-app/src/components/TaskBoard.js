import React from 'react';
import TaskColumn from './TaskColumn';
import { useTasks }from '../hooks/useTasks'

function TaskBoard() {
  const { tasks } = useTasks();

  const columns = ['TODO', 'IN-PROGRESS', 'DONE'];

  return (
    <div className="task-board">
      {columns.map((column) => (
        <TaskColumn key={column} column={column} tasks={tasks.filter(task => task.column === column)} />
      ))}
    </div>
  );
}

export default TaskBoard;
