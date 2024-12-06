const API_URL = "http://localhost:3000/roles";
import authService from "./authService";

const auth = authService.authHeader();

const getRoles = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...auth}
  });
  return response.json();
};

const createRole = async (role) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...auth },
    body: JSON.stringify(role),
  });
  return response.json();
};

const updateRole = async (id, user) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...auth },
  });
  return response.json();
};

const deleteRole = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { 
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...auth },
 });
  return response.json();
};


export default {
    getRoles,
    createRole,
    updateRole,
    deleteRole
}