import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen">
      <h1 className="text-2xl font-bold text-center p-4">Dashboard</h1>
      <ul>
        <li>
          <Link to="/seguridad/usuarios" className="block px-4 py-2 hover:bg-gray-700">
            Usuarios
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
