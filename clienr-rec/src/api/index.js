// src/api/api.js

// const API_URL = "https://MuhammadBurhan.pythonanywhere.com";

const API_URL = import.meta.env.VITE_API_URL;

// Helper function for making API requests
const request = async (url, method = "GET", body = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${url}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
};

// ===== Auth APIs =====
export const signupApi = (email, password) =>
  request("/auth/signup", "POST", { email, password });

export const loginApi = (email, password) =>
  request("/auth/login", "POST", { email, password });

export const logoutApi = (token) => request("/auth/logout", "POST", null, token);

// ===== Task APIs =====
export const fetchTasksApi = (token) => request("/tasks/", "GET", null, token);

export const addTaskApi = (token, task) =>
  request("/tasks/", "POST", task, token);

export const updateTaskApi = (token, id, updates) =>
  request(`/tasks/${id}`, "PUT", updates, token);

export const deleteTaskApi = (token, id) =>
  request(`/tasks/${id}`, "DELETE", null, token);
