import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getTasks, 
  createTask as apiCreateTask, 
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
  updateTaskStatus
} from '../api/taskApi';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const { data } = await apiCreateTask(taskData);
      setTasks([...tasks, data]);
    } catch (err) {
      throw err;
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const { data } = await apiUpdateTask(id, taskData);
      setTasks(tasks.map(task => task._id === id ? data : task));
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await apiDeleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      throw err;
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTaskStatus(id, newStatus);
      setTasks(tasks.map(task => 
        task._id === id ? { ...task, status: newStatus } : task
      ));
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        createTask: handleCreateTask,
        updateTask: handleUpdateTask,
        deleteTask: handleDeleteTask,
        updateTaskStatus: handleStatusChange,
        refetchTasks: fetchTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);