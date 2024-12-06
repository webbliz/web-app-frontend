import React, { useEffect, useState } from "react";
import userService from "../api/userService";
import rolesService from "../api/rolesService";
import authService from "../api/authService";

const Users = () => {

  const getUserRoles = async () => {
    try {
      const roles = await rolesService.getRoles();
      const users = await userService.getUsers();
  
      // Create a dictionary for r_id to role_name mapping
      const roleMap = roles.reduce((map, role) => {
        map[role.r_id] = role.role_name; // Map r_id to role_name
        return map;
      }, {});
  
      // Combine user data with role_name
      const usersWithRoles = users.map(user => ({
        ...user, // Include all user properties
        role_name: roleMap[user.r_id], // Add role_name based on r_id
      }));
  
      console.log("Users with roles:", usersWithRoles); 
      setAllRoles(roles);
      setAllUsers(users);
      setUsuarios(usersWithRoles);
      return usersWithRoles; // Return this data for frontend rendering
    } catch (error) {
      console.error("Error fetching roles or users:", error);
    }
  };

  const getCurrentUser = async () => {
    const authUser = await userService.getAuthUser();
    console.log("Curr user: ", currUser);
    setCurrUser(authUser);
  }

  const [currUser, setCurrUser] = useState({});
  const [userToEdit, setUserToEdit] = useState(null);
  const [allRoles, setAllRoles] = useState([]);
  const [allUsers, setAllUsers] = useState([]);


 
  const [usuarios, setUsuarios] = useState([
    { u_id: 1, name: "Juan Pérez", email: "juan@example.com", role_name: "Administrador" },
    { u_id: 2, name: "María López", email: "maria@example.com", role_name: "Usuario" },
  ]);

  const handleCreate = () => {
  
  }

  const handleEdit = (usuario) => {
    setUserToEdit(usuario);
  }

  const handleApply = async () => {
    try {
      // Call the updateUser service with the updated user data
      await userService.updateUser(userToEdit.u_id, {
        name: userToEdit.name,
        email: userToEdit.email,
        r_id: userToEdit.r_id, // Updated role ID
      });
  
      // Update the local usuarios state with the new data
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((user) =>
          user.u_id === userToEdit.u_id ? { ...user, ...userToEdit } : user
        )
      );
  
      setUserToEdit(null); // Reset the editing state
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = (u_id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmacion) {
      setUsuarios(usuarios.filter((usuario) => usuario.u_id !== u_id));
      userService.deleteUser(u_id);
    }
  };


 useEffect(() => {
    getCurrentUser();
    getUserRoles();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
      <p className="mt-2 text-gray-600">Administra los usuarios del sistema, crea nuevos, edita o elimina los existentes.</p>
      {currUser.r_id == 1 ? 
      <button className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
      >
        Crear Nuevo Usuario
      </button> 
      : <></>
      }
      <table className="w-full mt-4 bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Correo Electrónico</th>
            <th className="px-4 py-2 border-b">Rol</th>
            { currUser.r_id == 1 ?
              <th className="px-4 py-2 border-b">Acciones</th>
              :
              <></>
            }
            
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.u_id}>
                {usuario.u_id == userToEdit?.u_id ? 
                <>
                  <td className="px-4 py-2 border-b">
                    <input defaultValue={usuario.name}  onChange={(e) => {
                      setUserToEdit(
                        {...userToEdit, 
                          name: e.target.value}
                        )
                    }
                      
                    }className="px-1 py-1 border-2" placeholder={usuario.name}>
                    </input>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <input defaultValue={usuario.email} onChange={ (e) => {
                      setUserToEdit(
                        {...userToEdit, 
                          email: e.target.value}
                        )
                    }}
                     className="px-1 py-1 border-2" placeholder={usuario.email}>
                    </input>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select defaultValue={usuario.role_name} onChange={ (e) => {
                       setUserToEdit(
                        {...userToEdit, 
                          role_name: e.target.value}
                        )
                    }
                     
                    } className="px-1 py-1 border-2">
                     {allRoles.map((role) => {
                        return <option value={role.r_id}>{role.role_name}</option>
                     })} 
                    </select>
                  </td>
                </>
                  :
                  <>
                  <td className="px-4 py-2 border-b">{usuario.name}</td>
                  <td className="px-4 py-2 border-b">{usuario.email}</td>
                  <td className="px-4 py-2 border-b">{usuario.role_name}</td>
                  </>
              }
                
                { currUser.r_id == 1 ?
                  <td className="px-4 py-2 border-b">
                  
                  { usuario.u_id == userToEdit?.u_id ?  
                    <button className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                    onClick={() => handleApply(usuario)}
                    >
                      Aplicar
                    </button>

                    : 
                    <>
                    <button className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(usuario)}
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
                  }
                   
                  </td>
                  :
                  <></>
                }
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
