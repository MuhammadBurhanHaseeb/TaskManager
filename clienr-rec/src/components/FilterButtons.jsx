import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/features/tasks/taskSlice";
import Button from "@/components/atoms/Button";
import Div from "@/components/atoms/Div";
import { TaskStatus } from "@/enums/TaskStatus"; 
const FilterButtons = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);

  //  const status = {
  //   all: TaskStatus.All,
  //   completed: TaskStatus.completed,
  //   pending: TaskStatus.pending,
  // }


  return (
    <Div 
    variant ="FillterBtnsDiv"
    // className="flex gap-2 mb-4 mt-6"
    >
      <Button
         variant={filter === TaskStatus.All ? "FillterAll" : "FillterNotAll"}
        onClick={() => dispatch(setFilter(TaskStatus.All))}
      >
        All
      </Button>
      <Button
        variant={filter === TaskStatus.Completed ? "FillterComplete" : "FillterNotComplete"}
        onClick={() => dispatch(setFilter(TaskStatus.Completed))}
      >
        Completed
      </Button>
      <Button

        variant={filter === TaskStatus.pending ? "FillterPending" : "FillterNotPending"}
        onClick={() => dispatch(setFilter(TaskStatus.Pending))}
      >
        Pending
      </Button>
    </Div>
  );
};

export default FilterButtons;
