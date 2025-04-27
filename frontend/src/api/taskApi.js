import axiosInstance from './axiosInstance';

// export const getTasks = () => axiosInstance.get('/tasks');
export const getTasks =()=> axiosInstance.get('./tasks')
export const createTask = (taskData) => axiosInstance.post('/tasks', taskData);
export const updateTask = (id, taskData) => axiosInstance.put(`/tasks/${id}`, taskData);
export const deleteTask = (id) => axiosInstance.delete(`/tasks/${id}`);
export const updateTaskStatus = (id, status) => 
  axiosInstance.patch(`/tasks/${id}/status`, { status });