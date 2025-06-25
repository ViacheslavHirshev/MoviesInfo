import { ChangeEvent, FormEvent, useState } from "react";
import { INewMovie } from "../../types/types";
import { addNewMovie } from "../../api/services/moviesService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsAddingOccured } from "../../store/features/movies";

export const NewMovieForm = () => {
  const isAddingOccured = useAppSelector(
    (state) => state.movies.isAddingOccured
  );
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [movieData, setMovieData] = useState<INewMovie>({
    title: "",
    year: 0,
    format: "VHS",
    actors: [],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        setMovieData({ ...movieData, title: value });
        break;
      case "year":
        setMovieData({ ...movieData, year: Number(value) });
        break;
      case "actors":
        {
          const actorsArr = value.split(",");
          setMovieData({ ...movieData, actors: actorsArr });
        }
        break;

      default:
        break;
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await addNewMovie(movieData);
      if (response !== 0) {
        dispatch(setIsAddingOccured(!isAddingOccured));
      } else {
        setMessage("Failed, response: " + response);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("UnknownError");
      }
    } finally {
      setMessage("");
      setError("");
      setMovieData({
        title: "",
        year: 0,
        format: "VHS",
        actors: [],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-movie-form">
      <input
        name="title"
        placeholder="title"
        value={movieData.title}
        onChange={handleInputChange}
        required
      />
      <input
        name="year"
        placeholder="year"
        value={movieData.year}
        onChange={handleInputChange}
        required
      />
      <select
        name="format"
        value={movieData.format}
        onChange={handleSelectChange}
      >
        <option value="VHS">VHS</option>
        <option value="DVD">DVD</option>
        <option value="Blu-Ray">Blu-Ray</option>
      </select>
      <input
        name="actors"
        placeholder="Actor1, Actor2, ..."
        value={movieData.actors}
        onChange={handleInputChange}
        required
      />

      <button type="submit">Add new movie</button>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </form>
  );
};
