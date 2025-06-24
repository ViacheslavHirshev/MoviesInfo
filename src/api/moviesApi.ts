import axios from "axios";
import { useAppSelector } from "../store/hooks";

const API_URL = import.meta.env.VITE_API_URL;

export const moviesApi = axios.create({
  baseURL: `${API_URL}`,
});

moviesApi.interceptors.request.use((config) => {
  const token = useAppSelector((state) => state.auth.userToken);
  if (token) config.headers.Authorization = token;

  return config;
});
