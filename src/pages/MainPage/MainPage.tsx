import { ReactNode, useState } from "react";
import { Box } from "../../components/Box";
import { MoviesList } from "../../components/MoviesList";
import {
  CustomButton,
  SearchBar,
  SortOption,
} from "../../components/OptionalElements";
import { MovieDetails } from "../../components/MovieDetails";
import { NewMovieForm } from "../../components/Forms";
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import { TSortOption } from "../../types/types";
import { MoviesImport } from "../../components/MoviesImport";

export const MainPage = () => {
  const [isAddingMovie, setIsAddingMovie] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState<TSortOption>("default");

  return (
    <>
      <Header>
        <Logo value="Movies Info" />
        <SearchBar value={query} setValue={setQuery} className="search-bar" />
        <SortOption
          value={sortOption}
          setValue={setSortOption}
          className="sort-option"
        />
      </Header>

      <Main>
        <Box className="movies-box">
          <Box className="add-movie-options">
            <CustomButton
              value={isAddingMovie ? "Return" : "Add movie"}
              className="add-btn"
              onClickHandler={() => setIsAddingMovie(!isAddingMovie)}
            />
            <MoviesImport className="movies-import" />
          </Box>
          <MoviesList
            setSelectedId={setSelectedId}
            selectedId={selectedId}
            query={query}
            sortOption={sortOption}
            className="movies-list"
          />
        </Box>

        {isAddingMovie ? (
          <NewMovieForm setIsAddingMovie={setIsAddingMovie} />
        ) : (
          selectedId && (
            <Box className="movie-details-box">
              <MovieDetails
                setSelectedId={setSelectedId}
                selectedId={selectedId}
              />
            </Box>
          )
        )}
      </Main>
    </>
  );
};

const Main = ({ children }: { children: ReactNode }) => {
  return <main className="main-page-container">{children}</main>;
};
