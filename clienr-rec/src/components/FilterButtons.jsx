import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/tasks/taskSlice";

const FilterButtons = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);

  return (
    <div className="flex gap-2 mb-4 mt-6">
      <button
        className={`p-2 rounded ${filter === "all" ? "bg-gray-500 text-white" : "bg-gray-300"}`}
        onClick={() => dispatch(setFilter("all"))}
      >
        All
      </button>
      <button
        className={`p-2 rounded ${filter === "completed" ? "bg-green-500 text-white" : "bg-green-300"}`}
        onClick={() => dispatch(setFilter("completed"))}
      >
        Completed
      </button>
      <button
        className={`p-2 rounded ${filter === "pending" ? "bg-yellow-500 text-white" : "bg-yellow-300"}`}
        onClick={() => dispatch(setFilter("pending"))}
      >
        Pending
      </button>
    </div>
  );
};

export default FilterButtons;
