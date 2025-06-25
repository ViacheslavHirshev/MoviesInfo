import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth";
import moviesReducer from "./features/movies";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
