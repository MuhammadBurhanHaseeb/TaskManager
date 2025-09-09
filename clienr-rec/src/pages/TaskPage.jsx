import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../features/tasks/taskSlice";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterButtons from "../components/FilterButtons";

const TaskPage = () => {
  const [editTask, setEditTask] = useState(null);

  // 🔹 Redux setup
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth); // token auth slice se aa raha hai

  // 🔹 Jab page load/refresh ho, tasks fetch karo
  useEffect(() => {
    if (token) {
      dispatch(fetchTasks(token));
    }
  }, [token, dispatch]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center ">Tasks</h1>
      <TaskForm editTask={editTask} setEditTask={setEditTask} />
      <FilterButtons />
      <TaskList onEdit={setEditTask} />
    </div>
  );
};

export default TaskPage;
