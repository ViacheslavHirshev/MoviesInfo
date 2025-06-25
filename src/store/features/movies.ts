import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../../types/types";

interface IMoviesState {
  movies: IMovie[];
  isDeletionOccured: boolean;
  isAddingOccured: boolean;
}

const initialState: IMoviesState = {
  movies: [],
  isDeletionOccured: false,
  isAddingOccured: false,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<IMovie[]>) => {
      state.movies = action.payload;
    },
    setIsDeletionOccured: (state, action: PayloadAction<boolean>) => {
      state.isDeletionOccured = action.payload;
    },
    setIsAddingOccured: (state, action: PayloadAction<boolean>) => {
      state.isAddingOccured = action.payload;
    },
  },
});

export const { setMovies, setIsDeletionOccured, setIsAddingOccured } =
  moviesSlice.actions;
export default moviesSlice.reducer;
