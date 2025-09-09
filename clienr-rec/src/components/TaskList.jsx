import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";

const TaskList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state) => state.tasks);
  const { token } = useSelector((state) => state.auth);

  // 🔹 Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.status === "completed";
    if (filter === "pending") return task.status === "pending";
    return true;
  });

  return (
    <div className="border rounded overflow-hidden">
      {/* 👈 Headers */}
      <div className="grid grid-cols-4 bg-green-600 text-white font-bold p-2">
        <div>Title</div>
        <div>Description</div>
        <div>Status</div>
        <div>Actions</div>
      </div>

      {/* 👈 Task items with scrolling */}
      <div className="h-40 overflow-y-auto">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-4 gap-2 p-2 border-b last:border-b-0 bg-white items-center"
          >
            <div className="font-semibold">{task.title}</div>
            <div>{task.description}</div>
            <div
              className={
                task.status === "completed" ? "text-green-600" : "text-yellow-600"
              }
            >
              {task.status}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(task)}
                className="bg-blue-500 text-white px-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTask({ taskId: task.id, token }))}
                className="bg-red-500 text-white px-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <p className="text-gray-500 text-center mt-2">No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
