import React, { useEffect, useState } from "react";
import userService from "../api/userService";
import rolesService from "../api/rolesService";

const Users = () => {
  const [currUser, setCurrUser] = useState({});
  const [userToEdit, setUserToEdit] = useState(null);
  const [newUser, setNewUser] = useState(null); // State for the new user
  const [allRoles, setAllRoles] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserRoles = async () => {
    try {
      const roles = await rolesService.getRoles();
      const users = await userService.getUsers();

      const roleMap = roles.reduce((map, role) => {
        map[role.r_id] = role.role_name;
        return map;
      }, {});

      const usersWithRoles = users.map((user) => ({
        ...user,
        role_name: roleMap[user.r_id],
      }));

      setAllRoles(roles);
      setUsuarios(usersWithRoles);
    } catch (error) {
      console.error("Error fetching roles or users:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      const authUser = await userService.getAuthUser();
      setCurrUser(authUser);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getCurrentUser();
      await getUserRoles();
    };
    fetchData();
  }, []);

  const handleCreate = () => {
    setNewUser({ name: "", username: "", email: "", r_id: allRoles[0]?.r_id || null });
  };

  const handleSaveNewUser = async () => {
    try {
      const savedUser = await userService.createUser(newUser); // Save the user to the backend
      const roleName = allRoles.find((role) => role.r_id === newUser.r_id)?.role_name;

      setUsuarios((prevUsuarios) => [
        ...prevUsuarios,
        { ...savedUser, role_name: roleName },
      ]);
      setNewUser(null); // Clear the new user state
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleEdit = (usuario) => {
    setUserToEdit(usuario);
  };

  const handleApply = async () => {
    try {
      await userService.updateUser(userToEdit.u_id, {
        name: userToEdit.name,
        username: userToEdit.username,
        email: userToEdit.email,
        r_id: userToEdit.r_id,
      });

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((user) =>
          user.u_id === userToEdit.u_id ? { ...user, ...userToEdit } : user
        )
      );

      setUserToEdit(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (u_id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await userService.deleteUser(u_id);
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.u_id !== u_id)
        );
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
      <p className="mt-2 text-gray-600">
        Administra los usuarios del sistema, crea nuevos, edita o elimina los
        existentes.
      </p>
      {currUser.r_id === 1 && (
        <button
          onClick={handleCreate}
          className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Crear Nuevo Usuario
        </button>
      )}

      {loading ? (
        <p className="mt-4 text-gray-500">Cargando datos...</p>
      ) : (
        <table className="w-full mt-4 bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nombre</th>
              <th className="px-4 py-2 border-b">Nombre de Usuario</th>
              <th className="px-4 py-2 border-b">Correo Electrónico</th>
              <th className="px-4 py-2 border-b">Rol</th>
              {currUser.r_id === 1 && (
                <th className="px-4 py-2 border-b">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {newUser && (
              <tr>
                <td className="px-4 py-2 border-b">
                  <input
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="px-1 py-1 border-2"
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <input
                    value={newUser.username}
                    onChange={(e) =>
                      setNewUser((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    className="px-1 py-1 border-2"
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <input
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="px-1 py-1 border-2"
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <select
                    value={newUser.r_id}
                    onChange={(e) =>
                      setNewUser((prev) => ({
                        ...prev,
                        r_id: Number(e.target.value),
                      }))
                    }
                    className="px-1 py-1 border-2"
                  >
                    {allRoles.map((role) => (
                      <option key={role.r_id} value={role.r_id}>
                        {role.role_name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={handleSaveNewUser}
                    className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setNewUser(null)}
                    className="px-2 py-1 ml-2 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            )}
            {usuarios.map((usuario) => (
              <tr key={usuario.u_id}>
                {usuario.u_id === userToEdit?.u_id ? (
                  <>
                    <td className="px-4 py-2 border-b">
                      <input
                        defaultValue={usuario.name}
                        onChange={(e) =>
                          setUserToEdit((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="px-1 py-1 border-2"
                      />
                    </td>
                    <td className="px-4 py-2 border-b">
                      <input
                        defaultValue={usuario.username}
                        onChange={(e) =>
                          setUserToEdit((prev) => ({
                            ...prev,
                            username: e.target.value,
                          }))
                        }
                        className="px-1 py-1 border-2"
                      />
                    </td>
                    <td className="px-4 py-2 border-b">
                      <input
                        defaultValue={usuario.email}
                        onChange={(e) =>
                          setUserToEdit((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="px-1 py-1 border-2"
                      />
                    </td>
                    <td className="px-4 py-2 border-b">
                      <select
                        defaultValue={usuario.r_id}
                        onChange={(e) =>
                          setUserToEdit((prev) => ({
                            ...prev,
                            r_id: Number(e.target.value),
                          }))
                        }
                        className="px-1 py-1 border-2"
                      >
                        {allRoles.map((role) => (
                          <option key={role.r_id} value={role.r_id}>
                            {role.role_name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2 border-b">{usuario.name}</td>
                    <td className="px-4 py-2 border-b">{usuario.username}</td>
                    <td className="px-4 py-2 border-b">{usuario.email}</td>
                    <td className="px-4 py-2 border-b">{usuario.role_name}</td>
                  </>
                )}
                {currUser.r_id === 1 && (
                  <td className="px-4 py-2 border-b">
                    {usuario.u_id === userToEdit?.u_id ? (
                      <button
                        onClick={handleApply}
                        className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Aplicar
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(usuario)}
                          className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(usuario.u_id)}
                          className="px-2 py-1 ml-2 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
