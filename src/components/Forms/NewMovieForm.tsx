import { ChangeEvent, FormEvent, SetStateAction, useState } from "react";
import { INewMovie } from "../../types/types";
import { addNewMovie } from "../../api/services/moviesService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsAddingOccured } from "../../store/features/movies";

interface NewMovieFormProps {
  setIsAddingMovie: React.Dispatch<SetStateAction<boolean>>;
}

export const NewMovieForm = ({ setIsAddingMovie }: NewMovieFormProps) => {
  const isAddingOccured = useAppSelector(
    (state) => state.movies.isAddingOccured
  );
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState("");
  const [movieData, setMovieData] = useState<INewMovie>({
    title: "",
    year: 0,
    format: "VHS",
    actors: [],
  });
  const [dateInput, setDateInput] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        setMovieData({ ...movieData, title: value });
        break;
      case "year": {
        setDateInput(value);
        setMovieData({ ...movieData, year: Number(value.slice(0, 4)) });
        break;
      }
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
      setMessage("");

      const response = await addNewMovie(movieData);
      if (response === 1) {
        dispatch(setIsAddingOccured(!isAddingOccured));
        setMessage("Movie added ✅");
      } else {
        setMessage("❌ Failed with status: " + response);
      }
    } catch (err) {
      if (err instanceof Error) {
        setMessage("❌ Error: " + err.message);
      } else {
        console.log("UnknownError: ", err);
      }
    } finally {
      setMovieData({
        title: "",
        year: 0,
        format: "VHS",
        actors: [],
      });
      setDateInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-movie-form">
      <button onClick={() => setIsAddingMovie((prev) => !prev)}>X</button>
      <input
        name="title"
        placeholder="title"
        value={movieData.title}
        onChange={handleInputChange}
        minLength={3}
        maxLength={40}
        required
      />

      <input
        type="date"
        name="year"
        placeholder="year"
        value={dateInput}
        onChange={handleInputChange}
        min="1900-01-01"
        max="2021-12-31"
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
        placeholder="Name Surname, Name Surname, ..."
        value={movieData.actors}
        onChange={handleInputChange}
        pattern="^[A-Za-z, ]*$"
        required
      />

      <button type="submit">Add new movie</button>
      {message && <p>{message}</p>}
    </form>
  );
};
