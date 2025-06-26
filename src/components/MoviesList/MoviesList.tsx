import { SetStateAction, useEffect, useState } from "react";
import {
  getAllMovies,
  getMoviesByActor,
  getMoviesByTitle,
} from "../../api/services/moviesService";
import {
  setIsAddingOccured,
  setIsDeletionOccured,
  setMovies,
} from "../../store/features/movies";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Loader } from "../Loader";
import { ErrorMessage } from "../ErrorMessage";
import { TSortOption } from "../../types/types";

interface MoviesListProps {
  selectedId: number | null;
  setSelectedId: React.Dispatch<SetStateAction<number | null>>;
  query: string;
  sortOption: TSortOption;
}
export const MoviesList = ({
  selectedId,
  setSelectedId,
  query,
  sortOption,
}: MoviesListProps) => {
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => state.movies.movies);
  const isDeletionOccured = useAppSelector(
    (state) => state.movies.isDeletionOccured
  );
  const isAddingOccured = useAppSelector(
    (state) => state.movies.isAddingOccured
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getByOption = async () => {
      const trimmedQuery = query.trim();
      try {
        setIsLoading(true);
        if (trimmedQuery === "") {
          const data = await getAllMovies();
          dispatch(setMovies(data));
        } else {
          const dataByTitle = await getMoviesByTitle(trimmedQuery, { signal });
          if (dataByTitle.length > 0) {
            dispatch(setMovies(dataByTitle));
            return;
          } else {
            const dataByAuthor = await getMoviesByActor(trimmedQuery, {
              signal,
            });
            dispatch(setMovies(dataByAuthor));
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          setError("Error: " + err.message);
        } else {
          console.log("Unknown error", err);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
          setError("");
        }
      }
    };

    const timeout = setTimeout(() => {
      getByOption();
    }, 500);

    return () => {
      if (isDeletionOccured) {
        dispatch(setIsDeletionOccured(!isDeletionOccured));
      }

      if (isAddingOccured) {
        dispatch(setIsAddingOccured(!isAddingOccured));
      }

      clearTimeout(timeout);
      controller.abort();
    };
  }, [dispatch, isDeletionOccured, isAddingOccured, query]);

  const handleSelectMovie = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;
    const li = target.closest("li");

    if (!li || !li.dataset.id) return;

    const clickedId = Number(li.dataset.id);

    if (selectedId === clickedId) {
      setSelectedId(null);
    } else {
      setSelectedId(clickedId);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <ul className="movies-list" onClick={handleSelectMovie}>
      {sortOption === "alphabetical"
        ? movies
            .slice()
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((movie, i) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                year={movie.year}
                listPosition={i + 1}
                setSelectedId={setSelectedId}
                selectedId={selectedId}
              />
            ))
        : movies?.map((movie, i) => (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.year}
              listPosition={i + 1}
              setSelectedId={setSelectedId}
              selectedId={selectedId}
            />
          ))}
    </ul>
  );
};

interface MovieProps {
  id: number;
  title: string;
  year: number;
  listPosition: number;
  selectedId: number | null;
  setSelectedId: React.Dispatch<SetStateAction<number | null>>;
}
const Movie = ({ id, title, year, listPosition }: MovieProps) => {
  return (
    <li data-id={id}>
      <div>{listPosition}</div>
      <div>
        <h3>{title}</h3>
        <p>
          <span>📅</span>
          <span>{year}</span>
        </p>
      </div>
    </li>
  );
};
