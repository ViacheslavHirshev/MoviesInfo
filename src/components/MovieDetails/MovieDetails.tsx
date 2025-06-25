import { useEffect, useState } from "react";
// import { IMovie } from "../../types/types";
import { getMovieById } from "../../api/services/moviesService";
import { Loader } from "../Loader";
import { ErrorMessage } from "../ErrorMessage";

interface MovieDetailsProps {
  selectedMovieId: number;
}

export const MovieDetails = ({ selectedMovieId }: MovieDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  //   const [selectedMovieData, setSelectedMovieData] = useState<IMovie>();

  useEffect(() => {
    setIsLoading(true);
    const getSelectedMovie = async () => {
      try {
        const data = await getMovieById(selectedMovieId);
        console.log(data);
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

    getSelectedMovie();
  }, [selectedMovieId]);

  return (
    <div>
      {error && <ErrorMessage message={error} />}
      {!error && isLoading && <Loader />}
      {!error && !isLoading && <h3>Movie details fetched</h3>}
    </div>
  );
};
