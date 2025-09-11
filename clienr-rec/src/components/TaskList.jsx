import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "@/features/tasks/taskSlice";
import Button from "@/components/atoms/Button";
import Div from "@/components/atoms/Div";
import Paragraph from "@/components/atoms/Paragraph";
import { TaskStatus } from "@/enums/TaskStatus"; 

const TaskList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state) => state.tasks);
  const { token } = useSelector((state) => state.auth);

  // 🔹 Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === TaskStatus.Completed) return task.status === TaskStatus.Completed;
    if (filter === TaskStatus.Pending) return task.status === TaskStatus.Pending;
    return true;
  });

  return (
    <Div 
    variant="TaskListMainDiv"
    >
      {/* 👈 Headers */}
      <Div 
      variant="TaskListColonHeaderMain"
      >
         <span>Title</span>
         <span>Description</span>
         <span>Status</span>
         <span>Actions</span>
      </Div>

      {/* 👈 Task items with scrolling */}
      <Div 
      variant ="TaskListMainDivv" 
      >
        {filteredTasks.map((task) => (
          <Div
            key={task.id}
            variant ="TaskListInnerDiv"
          >
            <Div 
            variant ="TaskListTitleDiv"
            >{task.title}</Div>
            <span>{task.description}</span>
            <Div
            variant={task.status === TaskStatus.Completed ? "GreenStatus" : "YellowStatus"}
            >
              {task.status}
            </Div>
            <Div 
            variant ="TaskListEditDeleteDiv"  
            >
              <Button
                onClick={() => onEdit(task)}
                variant="EditTasklist"
              >
                Edit
              </Button>
              <Button
                onClick={() => dispatch(deleteTask({ taskId: task.id, token }))}
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
