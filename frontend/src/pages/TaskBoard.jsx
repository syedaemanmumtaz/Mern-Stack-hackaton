import { useContext, useState } from 'react';
import { useTasks } from '../contexts/TaskContext.jsx';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const TaskBoard = () => {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleSubmit = async (taskData) => {
    if (currentTask) {
      await updateTask(currentTask._id, taskData);
    } else {
      await createTask(taskData);
    }
    setShowForm(false);
    setCurrentTask(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Dashboard</h1>
        <button
          onClick={() => {
            setCurrentTask(null);
            setShowForm(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {showForm && (
        <TaskForm
          task={currentTask}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setCurrentTask(null);
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['todo', 'inprogress', 'done'].map((status) => (
          <div key={status} className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-3 capitalize">{status}</h2>
            {tasks && tasks.filter((task) => task.status === status)
              .map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={(task) => {
                    setCurrentTask(task);
                    setShowForm(true);
                  }}
                  onDelete={deleteTask}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;