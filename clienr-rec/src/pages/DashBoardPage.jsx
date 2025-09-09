import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../features/tasks/taskSlice";
import { Card, CardContent } from "../components/ui/card";

import { CheckCircle, Clock, ListTodo } from "lucide-react";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchTasks(token));
    }
  }, [token, dispatch]);

  // 🔹 Task counts
  const completedTasks = tasks.filter((t) => t.status === "completed");
  const pendingTasks = tasks.filter((t) => t.status === "pending");

  // 🔹 Chart data
  const chartData = [
    { name: "Completed", value: completedTasks.length },
    { name: "Pending", value: pendingTasks.length },
  ];
  const COLORS = ["#22c55e", "#eab308"]; // green & yellow

  // 🔹 Recent 5 tasks
  const recentTasks = [...tasks].slice(-5).reverse();

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
     <h1 className="text-3xl font-bold text-gray-800 text-center">📊 Dashboard</h1>


      {/* ==== Stats Cards ==== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg rounded-2xl bg-green-100">
          <CardContent className="flex items-center p-6 gap-4">
            <CheckCircle className="text-green-600 w-10 h-10" />
            <div>
              <h2 className="text-lg font-semibold">Completed Tasks</h2>
              <p className="text-2xl font-bold text-green-700">
                {completedTasks.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl bg-yellow-100">
          <CardContent className="flex items-center p-6 gap-4">
            <Clock className="text-yellow-600 w-10 h-10" />
            <div>
              <h2 className="text-lg font-semibold">Pending Tasks</h2>
              <p className="text-2xl font-bold text-yellow-700">
                {pendingTasks.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl bg-blue-100">
          <CardContent className="flex items-center p-6 gap-4">
            <ListTodo className="text-blue-600 w-10 h-10" />
            <div>
              <h2 className="text-lg font-semibold">Total Tasks</h2>
              <p className="text-2xl font-bold text-blue-700">
                {tasks.length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ==== Pie Chart Section ==== */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Task Distribution</h2>
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
      </div>

      {/* ==== Recent Tasks ==== */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">📝 Recent Tasks</h2>
        <div className="overflow-x-auto">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
