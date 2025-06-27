import axios from "axios";

const API_URL = window._env_?.API_URL || import.meta.env.VITE_API_URL;

// const API_URL = import.meta.env.VITE_API_URL;

export const moviesApi = axios.create({
  baseURL: `${API_URL}`,
});

moviesApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  const expire = sessionStorage.getItem("token_exp");

  if (token && expire && Date.now() < Number(expire)) {
    config.headers.Authorization = token;
  } else {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("token_exp");

    alert("Token expired, refresh page and login again");
  }

  return config;
});
