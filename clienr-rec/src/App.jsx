import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/NavBar";
import Dashboard from "@/pages/DashBoardPage";
import Tasks from "@/pages/TaskPage";
import Login from "@/pages/LoginPage";
import Register from "@/pages/RegisterPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";
import '@/index.css';

function App() {
  
  return (
    <Router   >
      <Navbar />
      <div className="p-4">
        <Routes>
        <Route  element={<ProtectedRoute/>} >
          <Route path="/" element={ <Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
          <Route path="/login" element={<Login />} />
          <Route  element={<Layout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
