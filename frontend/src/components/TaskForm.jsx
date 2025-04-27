// frontend/src/components/TaskForm.js

import { useState, useContext } from "react";
// import { TaskContext } from "../contexts/TaskContext.jsx";
import axios from "../api/axiosInstance";

const TaskForm = () => {
  const { fetchTasks, users } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/tasks", { title, description, assignedTo });
      setTitle("");
      setDescription("");
      setAssignedTo("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Create Task</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 mb-4 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 mb-4 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="w-full p-2 mb-4 border rounded"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      >
        <option value="">Assign to...</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>
      <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
