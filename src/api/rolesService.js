const API_URL = "http://localhost:3000/roles";
import authHeader from "./authService";

export const getRoles = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createRole = async (role) => {
  const auth = authHeader();
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", auth },
    body: JSON.stringify(role),
  });
  return response.json();
};

export const updateRole = async (id, user) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return response.json();
};
