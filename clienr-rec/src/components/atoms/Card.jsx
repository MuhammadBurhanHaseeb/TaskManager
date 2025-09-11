import React from "react";

// 🔹Info:   Base Card
// ToDo: for the future improvements 
const baseCardStyles = "";

const cardVariants = {
  DashBoardCompletedTaskCard: "shadow-lg rounded-2xl bg-green-100",
  DashBoardPendingTaskCard: "shadow-lg rounded-2xl bg-yellow-100", 
  DashBoardTotalTaskCard:"shadow-lg rounded-2xl bg-blue-100",

};

export  const Card = ({ children, variant = "TaskCard", className = "", ...props }) => {
  return (
    <div
      className={`${baseCardStyles} ${cardVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// 🔹 Base CardContent
const baseContentStyles = "";

const contentVariants = {
  DashBoardCompletedTaskCardContent: "flex items-center p-6 gap-4",
  DashBoardPendingTaskCardContent: "flex items-center p-6 gap-4",
  DashBoardTotalTaskCardContent:"flex items-center p-6 gap-4",
 
};

export const CardContent = ({ children, variant = "Default", className = "", ...props }) => {
  return (
    <div
      className={`${baseContentStyles} ${contentVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
