import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "@/features/tasks/taskSlice";
import { Card, CardContent } from "@/components/atoms/Card";
import Paragraph from "@/components/atoms/Paragraph";
import { TaskStatus } from "@/enums/TaskStatus"; 
import { CheckCircle, Clock, ListTodo } from "lucide-react";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import Heading from "@/components/atoms/Heading";
import Div from "@/components/atoms/Div";

const COLORS = ["#22c55e", "#eab308"]; // colors : green & yellow

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchTasks(token));
    }
  }, [token, dispatch]);

 // 🔹 Using Memo : useMemo for derived data
  const { completedTasks, pendingTasks, recentTasks, chartData } = useMemo(() => {
  const completed = [];
  const pending = [];
  const statusCount = {}; // DynamicCount:  store counts dynamically

  for (const t of tasks) {
  
    statusCount[t.status] = (statusCount[t.status] || 0) + 1;

    if (t.status === TaskStatus.Completed) {
      completed.push(t);
    } else if (t.status === TaskStatus.Pending) {
      pending.push(t);
    }
  }

  const recent = [...tasks].slice(-5).reverse();

  // Dynamic Chart : build chartData dynamically from statusCount
  const chart = Object.entries(statusCount).map(([status, value]) => ({
    name: status,
    value,
  }));

  return {
    completedTasks: completed,
    pendingTasks: pending,
    recentTasks: recent,
    chartData: chart,
  };
}, [tasks]);

 

  return (
    <Div 
    variant="MainContentDiv"
    >
     <Heading  level={1} variant= "DashBoardHeading" > 📊 Dashboard</Heading>


      {/* ==== Stats Cards ==== */}
      <Div
      variant="MainContentInnerDiv"
      >
        <Card  variant="DashBoardCompletedTaskCard" >
          <CardContent variant="DashBoardCompletedTaskCardContent">
            <CheckCircle className="text-green-600 w-10 h-10" />
            <Div>
              <Heading  level={2} variant= "CompletePendingTotal" >Completed Tasks</Heading>
              <Paragraph 
              variant="CompletePara"
              >
                {completedTasks.length}
              </Paragraph>
            </Div>
          </CardContent>
        </Card>

        <Card variant="DashBoardPendingTaskCard">
          <CardContent variant ="DashBoardPendingTaskCardContent">
            <Clock className="text-yellow-600 w-10 h-10" />
            <Div>
              <Heading  level={2} variant= "CompletePendingTotal" >Pending Tasks</Heading>
              <Paragraph 
              variant="PendingPara"
              >
                {pendingTasks.length}
              </Paragraph>
            </Div>
          </CardContent>
        </Card>

        <Card variant="DashBoardTotalTaskCard">
          <CardContent variant="DashBoardTotalTaskCardContent">
            <ListTodo className="text-blue-600 w-10 h-10" />
            <Div>

              <Heading  level={2} variant= "CompletePendingTotal" >Total Tasks</Heading>
              <Paragraph 
              variant="TotalPara"
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
      >
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
      >
         <Heading  level={2} variant= "TasDis" >📝 Recent Tasks</Heading>
        <Div
         variant="MainTableDiv" 
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
                        task.status === TaskStatus.Completed
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
