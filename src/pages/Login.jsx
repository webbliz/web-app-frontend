import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Implementar lógica de autenticación
    console.log("Iniciar sesión");
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default Login;
