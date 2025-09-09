import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../features/tasks/taskSlice";

const TaskForm = ({ editTask, setEditTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending"); // default
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  // Jab editTask aaye toh form pre-fill hoga
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setStatus(editTask.status);
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editTask) {
      // 🔹 Backend update call
      dispatch(updateTask({ id: editTask.id, updates: { title, description, status }, token }));
      setEditTask(null); // reset edit mode
    } else {
      // 🔹 Backend add call
      dispatch(addTask({ title, description, status, token }));
    }

    // Reset form
    setTitle("");
    setDescription("");
    setStatus("pending");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded flex flex-col gap-2">
      <input
        type="text"
        placeholder="Title"
        className="border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        className="border p-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <div className="flex gap-4">
        <label>
          <input
            type="radio"
            value="pending"
            checked={status === "pending"}
            onChange={() => setStatus("pending")}
          />{" "}
          Pending
        </label>
        <label>
          <input
            type="radio"
            value="completed"
            checked={status === "completed"}
            onChange={() => setStatus("completed")}
          />{" "}
          Completed
        </label>
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {editTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
