import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/features/tasks/taskSlice";
import Button from "@/components/atoms/Button";
import Div from "@/components/atoms/Div";

const FilterButtons = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);

   const status = {
    all: 'all',
    completed: 'completed',
    pending: 'pending',
  }


  return (
    <Div 
    variant ="FillterBtnsDiv"
    // className="flex gap-2 mb-4 mt-6"
    >
      <Button
         variant={filter === "all" ? "FillterAll" : "FillterNotAll"}
        onClick={() => dispatch(setFilter(status.all))}
      >
        All
      </Button>
      <Button
        variant={filter === "completed" ? "FillterComplete" : "FillterNotComplete"}
        onClick={() => dispatch(setFilter(status.completed))}
      >
        Completed
      </Button>
      <Button

        variant={filter === "pending" ? "FillterPending" : "FillterNotPending"}
        onClick={() => dispatch(setFilter(status.pending))}
      >
        Pending
      </Button>
    </Div>
  );
};

export default FilterButtons;
