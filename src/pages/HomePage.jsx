import { useFilm } from "../contexts/FilmContext";
import ShowShows from "../components/ShowShows";

export default function HomePage() {
  const { isLoading, movies, series, searchedQuery } = useFilm();

  return (
    <>
      {searchedQuery && (
        <div className="query">
          <h2 className="text-dark h5">
            Risultati per "...{searchedQuery}..."
          </h2>
        </div>
      )}
      {isLoading ? (
        <div className="d-flex flex-column align-items-center gap-2 mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <strong>Loading...</strong>
        </div>
      ) : (
        <>
          {movies?.length > 0 && searchedQuery && (
            <ShowShows title={"FILM"} shows={movies} />
          )}
          {series?.length > 0 && searchedQuery && (
            <ShowShows title={"SERIE TV"} shows={series} />
          )}
        </>
      )}
    </>
  );
}
