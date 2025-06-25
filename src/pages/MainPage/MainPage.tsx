import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllMovies } from "../../api/services/moviesService";
import {
  setIsAddingOccured,
  setIsDeletionOccured,
  setMovies,
} from "../../store/features/movies";
import { Box } from "../../components/Box";
import { Loader } from "../../components/Loader";
import { ErrorMessage } from "../../components/ErrorMessage";
import { MoviesList } from "../../components/MoviesList";
import { NewMovieForm } from "../../components/NewMovieForm/NewMovieForm";
import { CustomButton, Options, SearchBar } from "../../components/Options";
import { MovieDetails } from "../../components/MovieDetails";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const isDeletionOccured = useAppSelector(
    (state) => state.movies.isDeletionOccured
  );
  const isAddingOccured = useAppSelector(
    (state) => state.movies.isAddingOccured
  );

  const [isAddingMovie, setIsAddingMovie] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const getMoviesList = async () => {
      try {
        setIsLoading(true);
        const data = await getAllMovies();
        dispatch(setMovies(data));
        // console.log(data);
      } catch (err) {
        if (err instanceof Error) {
          setError("Error: " + err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setIsLoading(false);
        setError("");
      }
    };

    getMoviesList();

    return () => {
      if (isDeletionOccured) {
        dispatch(setIsDeletionOccured(!isDeletionOccured));
      }

      if (isAddingOccured) {
        dispatch(setIsAddingOccured(!isAddingOccured));
      }
    };
  }, [dispatch, isDeletionOccured, isAddingOccured]);

  return (
    <Main>
      <Box className="movies-box">
        <Options>
          <SearchBar />
          <CustomButton
            value={!isAddingMovie ? "Add movie" : "Return"}
            className="add-btn"
            onClickHandler={() => setIsAddingMovie(!isAddingMovie)}
          />
        </Options>
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !error && (
          <MoviesList setSelectedId={setSelectedId} selectedId={selectedId} />
        )}
      </Box>

      {isAddingMovie ? (
        <NewMovieForm />
      ) : (
        <Box>{selectedId && <MovieDetails selectedMovieId={selectedId} />}</Box>
      )}
    </Main>
  );
};

const Main = ({ children }: { children: ReactNode }) => {
  return <main className="main-page-container">{children}</main>;
};
