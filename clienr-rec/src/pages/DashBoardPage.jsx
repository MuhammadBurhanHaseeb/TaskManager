import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "@/features/tasks/taskSlice";
import { Card, CardContent } from "@/components/ui/card";
import Paragraph from "@/components/atoms/Paragraph";

import { CheckCircle, Clock, ListTodo } from "lucide-react";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import Heading from "@/components/atoms/Heading";
import Div from "@/components/atoms/Div";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchTasks(token));
    }
  }, [token, dispatch]);

 // 🔹 useMemo for derived data
  const completedTasks = useMemo(
    () => tasks.filter((t) => t.status === "completed"),
    [tasks]
  );

  const pendingTasks = useMemo(
    () => tasks.filter((t) => t.status === "pending"),
    [tasks]
  );

  const recentTasks = useMemo(
    () => [...tasks].slice(-5).reverse(),
    [tasks]
  );

  const chartData = useMemo(
    () => [
      { name: "Completed", value: completedTasks.length },
      { name: "Pending", value: pendingTasks.length },
    ],
    [completedTasks.length, pendingTasks.length]
  );

  const COLORS = ["#22c55e", "#eab308"]; // green & yellow

  return (
    <Div 
    variant="MainContentDiv"
    // className="p-6 space-y-8 max-w-6xl mx-auto"
    >
     {/* <h1 className="text-3xl font-bold text-gray-800 text-center">📊 Dashboard</h1> */}
     <Heading  level={1} variant= "DashBoardHeading" > 📊 Dashboard</Heading>


      {/* ==== Stats Cards ==== */}
      <Div
      variant="MainContentInnerDiv"
      // className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="shadow-lg rounded-2xl bg-green-100">
          <CardContent className="flex items-center p-6 gap-4">
            <CheckCircle className="text-green-600 w-10 h-10" />
            <Div>
              {/* <h2 className="text-lg font-semibold">Completed Tasks</h2> */}
              <Heading  level={2} variant= "CompletePendingTotal" >Completed Tasks</Heading>
              <Paragraph 
              variant="CompletePara"
              // className="text-2xl font-bold text-green-700"
              >
                {completedTasks.length}
              </Paragraph>
            </Div>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl bg-yellow-100">
          <CardContent className="flex items-center p-6 gap-4">
            <Clock className="text-yellow-600 w-10 h-10" />
            <Div>
              {/* <h2 className="text-lg font-semibold">Pending Tasks</h2> */}
              <Heading  level={2} variant= "CompletePendingTotal" >Pending Tasks</Heading>
              <Paragraph 
              variant="PendingPara"
              // className="text-2xl font-bold text-yellow-700"
              >
                {pendingTasks.length}
              </Paragraph>
            </Div>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl bg-blue-100">
          <CardContent className="flex items-center p-6 gap-4">
            <ListTodo className="text-blue-600 w-10 h-10" />
            <Div>

              {/* <h2 className="text-lg font-semibold">Total Tasks</h2> */}
              <Heading  level={2} variant= "CompletePendingTotal" >Total Tasks</Heading>
              <Paragraph 
              variant="TotalPara"
              // className="text-2xl font-bold text-blue-700"
              >
                {tasks.length}
              </Paragraph>
            </Div>
          </CardContent>
        </Card>
      </Div>

      {/* ==== Pie Chart Section ==== */}
      <Div
      variant="TaskDistributionMainDiv"
      // className="bg-white shadow-lg rounded-2xl p-6"
      >
        {/* <h2 className="text-xl font-bold mb-4">Task Distribution</h2> */}
        <Heading  level={2} variant= "TasDis" >Task Distribution</Heading>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Div>

      {/* ==== Recent Tasks ==== */}
      <Div 
      variant="RecentTaskMainDiv"
      // className="bg-white shadow-lg rounded-2xl p-6"
      >
        {/* <h2 className="text-xl font-bold mb-4">📝 Recent Tasks</h2> */}
         <Heading  level={2} variant= "TasDis" >📝 Recent Tasks</Heading>
        <Div
         variant="MainTableDiv" 
          // className="overflow-x-auto"
          >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 border-b">Title</th>
                <th className="p-3 border-b">Description</th>
                <th className="p-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTasks.length > 0 ? (
                recentTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 border-b">{task.title}</td>
                    <td className="p-3 border-b text-gray-600">
                      {task.description}
                    </td>
                    <td
                      className={`p-3 border-b font-semibold ${
                        task.status === "completed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {task.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-3 text-gray-500">
                    No recent tasks
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Div>
      </Div>
    </Div>
  );
};

export default Dashboard;
