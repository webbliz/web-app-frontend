import React from "react";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b">Nombre</th>
          <th className="px-4 py-2 border-b">Email</th>
          <th className="px-4 py-2 border-b">Rol</th>
          <th className="px-4 py-2 border-b">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="px-4 py-2 border-b">{user.name}</td>
            <td className="px-4 py-2 border-b">{user.email}</td>
            <td className="px-4 py-2 border-b">{user.role}</td>
            <td className="px-4 py-2 border-b">
              <button
                onClick={() => onEdit(user)}
                className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="px-2 py-1 ml-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
