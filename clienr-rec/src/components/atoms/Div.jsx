// src/components/atoms/Div.jsx
import React from "react";

const Div = ({ children, variant = "primary", className = "", ...props }) => {
  const baseClass = ""; // common styles for all divs

  const variants = {
    TaskFormRadioDiv: "flex gap-4",
    TaskListMainDiv:"border rounded overflow-hidden",
    TaskListColonHeaderMain:"grid grid-cols-4 bg-green-600 text-white font-bold p-2",
    TaskListMainDivv:"h-40 overflow-y-auto",
    TaskListInnerDiv:"grid grid-cols-4 gap-2 p-2 border-b last:border-b-0 bg-white items-center",
    TaskListTitleDiv:"font-semibold",
    GreenStatus:"text-green-600",
    YellowStatus:"text-yellow-600",
    TaskListEditDeleteDiv:"flex gap-2",
    NavBarDiv:"space-x-4 flex items-center",
    FillterBtnsDiv:"flex gap-2 mb-4 mt-6",
    MainTableDiv:"overflow-x-auto",
    RecentTaskMainDiv:"bg-white shadow-lg rounded-2xl p-6",
    TaskDistributionMainDiv:"bg-white shadow-lg rounded-2xl p-6",
    MainContentDiv:"p-6 pt-22 space-y-8 max-w-6xl mx-auto ",
    MainContentInnerDiv:"grid grid-cols-1 md:grid-cols-3 gap-6",
    TaskPageMainDiv:"p-6 pt-26 max-w-3xl mx-auto",
    RegisterPageMainDiv:"p-6 max-w-md mx-auto",
    LoginPageMainDiv:"p-6 max-w-md mx-auto",
  };

  return (
    <div className={`${baseClass} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Div;
