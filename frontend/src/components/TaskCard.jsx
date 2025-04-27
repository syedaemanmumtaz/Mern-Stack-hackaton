const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 mb-3 rounded-lg shadow-sm border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-800">{task.title}</h3>
        <div className="flex space-x-2">
          <button onClick={() => onEdit(task)} className="text-gray-500 hover:text-blue-500">
            Edit
          </button>
          <button onClick={() => onDelete(task._id)} className="text-gray-500 hover:text-red-500">
            Delete
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      <div className="flex items-center mt-2 text-xs text-gray-500">
        <span>Assigned: {task.assignedTo?.username || 'Unassigned'}</span>
        <span className="mx-2">•</span>
        <span>{task.status}</span>
      </div>
    </div>
  );
};

export default TaskCard;