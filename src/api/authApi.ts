import axios from "axios";

const API_URL = window._env_?.API_URL || import.meta.env.VITE_API_URL;

// const API_URL = import.meta.env.VITE_API_URL;

export const authApi = axios.create({
  baseURL: `${API_URL}`,
});
