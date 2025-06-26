import { useState } from "react";
import { importMovies } from "../../api/services/moviesService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsAddingOccured } from "../../store/features/movies";

export const MoviesImport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>("");
  const [file, setFile] = useState<File | null>();

  const dispatch = useAppDispatch();
  const isAddingOccured = useAppSelector(
    (state) => state.movies.isAddingOccured
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const onImport = async () => {
    if (!file) {
      setMessage("Choose file ⚠️");
      return;
    }

    try {
      setMessage("");
      setIsLoading(true);

      const formData = new FormData();
      formData.append("movies", file);

      const response = await importMovies(formData);
      if (response === 1) {
        setMessage("Import successfull ✅");
        dispatch(setIsAddingOccured(!isAddingOccured));
      } else {
        setMessage("Import failed ❌");
      }
    } catch (err) {
      if (err instanceof Error) {
        setMessage("Error occured: " + err.message);
      } else {
        console.log("Unknown error: ", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="movies-import">
      <input type="file" accept=".txt" onChange={onFileChange} />
      <button disabled={isLoading} onClick={onImport}>
        {isLoading ? "Importing..." : "Import"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};
