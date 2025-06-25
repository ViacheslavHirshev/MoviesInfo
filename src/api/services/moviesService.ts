import { moviesApi } from "../moviesApi";
import { IMovie, INewMovie } from "../../types/types";

export const getAllMovies = async (): Promise<IMovie[]> => {
  const response = await moviesApi.get("/movies");
  return response.data.data;
};

export const getMovieById = async (id: number): Promise<IMovie> => {
  const response = await moviesApi.get(`/movies/${id}`);
  return response.data.data;
};

export const addNewMovie = async (newMovie: INewMovie): Promise<number> => {
  const response = await moviesApi.post("/movies", newMovie);
  return response.data.status;
};

export const deleteMovieById = async (id: number): Promise<number> => {
  const response = await moviesApi.delete(`/movies/${id}`);
  return response.data;
};

export const updateMovie = async (
  id: number,
  newData: INewMovie
): Promise<number> => {
  const response = await moviesApi.put(`/movies/${id}`, newData);
  return response.data;
};
