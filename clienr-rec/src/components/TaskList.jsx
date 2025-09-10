import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "@/features/tasks/taskSlice";
import Button from "@/components/atoms/Button";
import Div from "@/components/atoms/Div";
import Paragraph from "@/components/atoms/Paragraph";

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
    <Div 
    variant="TaskListMainDiv"
    // className="border rounded overflow-hidden"
    >
      {/* 👈 Headers */}
      <Div 
      variant="TaskListColonHeaderMain"
      // className="grid grid-cols-4 bg-green-600 text-white font-bold p-2"
      >
        <Div>Title</Div>
        <Div>Description</Div>
        <Div>Status</Div>
        <Div>Actions</Div>
      </Div>

      {/* 👈 Task items with scrolling */}
      <Div 
      variant ="TaskListMainDivv" 
      //  className="h-40 overflow-y-auto"
      >
        {filteredTasks.map((task) => (
          <Div
            key={task.id}
            variant ="TaskListInnerDiv"
            // className="grid grid-cols-4 gap-2 p-2 border-b last:border-b-0 bg-white items-center"
          >
            <Div 
            variant ="TaskListTitleDiv"
            // className="font-semibold"
            >{task.title}</Div>
            <Div>{task.description}</Div>
            <Div
            variant={task.status === "completed" ? "GreenStatus" : "YellowStatus"}
              // className={
              //   task.status === "completed" ? "text-green-600" : "text-yellow-600"
              // }
            >
              {task.status}
            </Div>
            <Div 
            variant ="TaskListEditDeleteDiv"  
            // className="flex gap-2"
            >
              <Button
                onClick={() => onEdit(task)}
                // className="bg-blue-500 text-white px-2 rounded"
                variant="EditTasklist"
              >
                Edit
              </Button>
              <Button
                onClick={() => dispatch(deleteTask({ taskId: task.id, token }))}
                // className="bg-red-500 text-white px-2 rounded"
                variant="DeleteTasklist"
              >
                Delete
              </Button>
            </Div>
          </Div>
        ))}

        {filteredTasks.length === 0 && (
          <Paragraph className="text-gray-500 text-center mt-2">No tasks found</Paragraph>
        )}
      </Div>
    </Div>
  );
};

export default TaskList;
