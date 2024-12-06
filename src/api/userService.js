const API_URL = "http://localhost:3000/users";
import authService from "./authService";

const auth = authService.authHeader();

const getUsers = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...auth}
  });
  return response.json();
};

const getAuthUser = async () => {
  const response = await fetch(`${API_URL}/user`, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...auth}
  });
  return response.json();
}


const createUser = async (user) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...auth },
    body: JSON.stringify(user),
  });
  return response.json();
};

const updateUser = async (u_id, user) => {
  const response = await fetch(`${API_URL}/${u_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...auth },
    body: JSON.stringify(user),
  });
  return response.json();
};

const deleteUser = async (u_id) => {
  const response = await fetch(`${API_URL}/${u_id}`, { 
    method: "DELETE",
    headers: {"Content-Type": "application/json", ...auth },
  });
  return response.json();
};

export default {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getAuthUser,
}
