import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@/features/tasks/taskSlice";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import FilterButtons from "@/components/FilterButtons";
import Heading from "@/components/atoms/Heading";
import Div from "@/components/atoms/Div";

const TaskPage = () => {
  const [editTask, setEditTask] = useState(null);

  // 🔹 Redux setup
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth); // Token : token auth slice se aa raha hai

  // 🔹 FetchingTasks : Jab page load/refresh ho, tasks fetch karo
  useEffect(() => {
    if (token) {
      dispatch(fetchTasks(token));
    }
  }, [token, dispatch]);

  return (
    <Div  
    variant="TaskPageMainDiv"
    >
      <Heading  level={1} variant= "Task" >Tasks</Heading>
      <TaskForm editTask={editTask} setEditTask={setEditTask} />
      <FilterButtons />
      <TaskList onEdit={setEditTask} />
    </Div>
  );
};

export default TaskPage;
