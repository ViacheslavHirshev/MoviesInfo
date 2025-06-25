import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const moviesApi = axios.create({
  baseURL: `${API_URL}`,
});

moviesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = token;
  // console.log("Token from local storage: " + token);

  return config;
});
