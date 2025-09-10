import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopLevelSessionChecker from "@/components/TopLevelSessionChecker";
import Navbar from "@/components/NavBar";
import Dashboard from "@/pages/DashBoardPage";
import Tasks from "@/pages/TaskPage";
import Login from "@/pages/LoginPage";
import Register from "@/pages/RegisterPage";
import ProtectedRoute from "@/components/ProtectedRoute";

import '@/index.css';

function App() {

  
  return (
    <Router>
      <TopLevelSessionChecker/>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={ <ProtectedRoute> <Dashboard />  </ProtectedRoute> } />
          <Route path="/tasks" element={  <ProtectedRoute> <Tasks />  </ProtectedRoute> } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
