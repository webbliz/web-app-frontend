import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Register from "./pages/Register";


const Seguridad = () => <h1 className="text-xl font-bold">Página de Seguridad</h1>;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm onLogin={handleLogin} />
          }
        />

        <Route path="register" element={<Register />} />
         
         {/* Dashboard */}
        <Route
          path="/dashboard/"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" />
          }
        >
          <Route index element={<h1 className="text-xl font-bold">Inicio del Dashboard</h1>} />
          <Route path="seguridad" element={<Seguridad />} />
          <Route path="seguridad/usuarios" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
