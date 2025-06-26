import { SetStateAction, useEffect, useState } from "react";
import {
  deleteMovieById,
  getMovieById,
} from "../../api/services/moviesService";
import { Loader } from "../Loader";
import { ErrorMessage } from "../ErrorMessage";
import { IMovie } from "../../types/types";
import { setIsDeletionOccured } from "../../store/features/movies";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface MovieDetailsProps {
  selectedId: number;
  setSelectedId: React.Dispatch<SetStateAction<number | null>>;
}

export const MovieDetails = ({
  selectedId,
  setSelectedId,
}: MovieDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieData, setSelectedMovieData] = useState<IMovie>();

  const dispatch = useAppDispatch();
  const isDeletionOccured = useAppSelector(
    (state) => state.movies.isDeletionOccured
  );

  const actors = selectedMovieData?.actors
    .map((actor) => actor.name.trim())
    .join(", ");

  useEffect(() => {
    const getSelectedMovie = async () => {
      try {
        setError("");
        setIsLoading(true);
        
        const data = await getMovieById(selectedId);
        setSelectedMovieData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError("Error: " + err.message);
        } else {
          console.log("Unknown error: ", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getSelectedMovie();
  }, [selectedId]);

  const deleteMovieHandler = async () => {
    const response = await deleteMovieById(selectedId);
    console.log(response);
    if (response === 1) {
      dispatch(setIsDeletionOccured(!isDeletionOccured));
      setSelectedId(null);
    }
  };

  return (
    <>
      {error && <ErrorMessage message={error} />}
      {!error && isLoading && <Loader />}
      {!error && !isLoading && (
        <div className="movie-details">
          <h3>{selectedMovieData?.title}</h3>
          <p className="movie-details-year">📅 {selectedMovieData?.year}</p>
          <p className="movie-details-format">
            Format: {selectedMovieData?.format}
          </p>
          <p className="movie-details-actors">Actors: {actors}</p>
          <button onClick={deleteMovieHandler}>Delete movie</button>
        </div>
      )}
    </>
  );
};
