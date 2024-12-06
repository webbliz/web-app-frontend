import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar credenciales de prueba
    if (email === "test@domain.com" && password === "123456") {
      onLogin(); // Marcar al usuario como autenticado
      navigate("/dashboard"); // Redirigir al Dashboard
      setError("");
    } else {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-indigo-600">Bienvenido</h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          Ingresa tus credenciales para continuar.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              required
              className="w-full px-4 py-2 mt-1 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className="w-full px-4 py-2 mt-1 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="#"
            className="text-sm text-indigo-600 hover:underline focus:outline-none"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <div>
          <hr
            className="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
            <p className="my-2 block text-sm font-medium text-gray-600">
              ¿No tienes cuenta?
            </p>
            <button type="button" onClick={() => navigate('/register')}          
            className="w-full px-4 py-2 border-2 border-indigo-600 text-gray-600 bg-white rounded-lg hover:bg-indigo-600 focus:ring-2 hover:text-white focus:ring-indigo-500 focus:outline-none">
              Regístrate Aquí
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
