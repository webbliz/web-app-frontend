import React, { useState } from "react";

const Users = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan Pérez", email: "juan@example.com", rol: "Administrador" },
    { id: 2, nombre: "María López", email: "maria@example.com", rol: "Usuario" },
  ]);

  const handleDelete = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmacion) {
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
      <p className="mt-2 text-gray-600">Administra los usuarios del sistema, crea nuevos, edita o elimina los existentes.</p>
      <button className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600">
        Crear Nuevo Usuario
      </button>
      <table className="w-full mt-4 bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Correo Electrónico</th>
            <th className="px-4 py-2 border-b">Rol</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="px-4 py-2 border-b">{usuario.nombre}</td>
                <td className="px-4 py-2 border-b">{usuario.email}</td>
                <td className="px-4 py-2 border-b">{usuario.rol}</td>
                <td className="px-4 py-2 border-b">
                  <button className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(usuario.id)}
                    className="px-2 py-1 ml-2 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center border-b text-gray-500">
                No hay usuarios registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
