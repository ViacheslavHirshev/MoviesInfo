import { SetStateAction } from "react";
import { deleteMovieById } from "../../api/services/moviesService";
import { setIsDeletionOccured } from "../../store/features/movies";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface MoviesListProps {
  selectedId: number | null;
  setSelectedId: React.Dispatch<SetStateAction<number | null>>;
}
export const MoviesList = ({ selectedId, setSelectedId }: MoviesListProps) => {
  const movies = useAppSelector((state) => state.movies.movies);
  return (
    <ul className="movies-list">
      {movies?.map((movie, i) => (
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

const Movie = ({
  id,
  title,
  year,
  listPosition,
  selectedId,
  setSelectedId,
}: MovieProps) => {
  const dispatch = useAppDispatch();
  const isDeletionOccured = useAppSelector(
    (state) => state.movies.isDeletionOccured
  );

  const deleteMovieHandler = async () => {
    const response = await deleteMovieById(id);
    if (response) {
      dispatch(setIsDeletionOccured(!isDeletionOccured));
    }
  };

  const handleSelectMovie = () => {
    if (selectedId === null) {
      setSelectedId(id);
      return;
    }

    if (selectedId === id) {
      setSelectedId(null);
      return;
    }

    setSelectedId(id);
  };

  return (
    <li onClick={handleSelectMovie}>
      <div>{listPosition}</div>
      <div>
        <h3>{title}</h3>
        <p>
          <span>🗓</span>
          <span>{year}</span>
        </p>
      </div>
      <span className="delete-btn" onClick={deleteMovieHandler}>
        ❌
      </span>
    </li>
  );
};
