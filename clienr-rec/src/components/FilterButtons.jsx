import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/features/tasks/taskSlice";
import Button from "@/components/atoms/Button";
import Div from "@/components/atoms/Div";
import { TaskStatus } from "@/enums/TaskStatus"; 


const FilterButtons = () => {
  
const dispatch = useDispatch();
const filter = useSelector((state) => state.tasks.filter);
  

 


  return (
    <Div 
    variant ="FillterBtnsDiv"
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
