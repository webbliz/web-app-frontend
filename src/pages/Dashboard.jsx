import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-800 text-white">
        <h2 className="p-4 text-lg font-bold border-b border-gray-700">Menú</h2>
        <nav>
          <ul>
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link to="/dashboard" className="block">Inicio</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link to="/dashboard/seguridad" className="block">Seguridad</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 pl-6">
              <Link to="/dashboard/seguridad/usuarios" className="block">Usuarios</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
