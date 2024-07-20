import { useState, useEffect } from 'react';
import axios from 'axios';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error('Failed to add task', error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedTask);
      setTasks((prevTasks) => prevTasks.map((task) => (task._id === taskId ? response.data : task)));
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const moveTask = (taskId, newStatus) => {
    setTasks((prevTasks) => 
      prevTasks.map((task) => 
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return {
    tasks,
    addTask,
    updateTask,
    moveTask,
  };
};

export { useTasks};
