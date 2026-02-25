import { useFilm } from "../contexts/FilmContext";
import ShowShows from "../components/ShowShows";

export default function HomePage() {
  const { isLoading, movies, series, searchedQuery } = useFilm();

  return (
    <>
      {searchedQuery && (
        <h2 className="text-muted h5 mb-4">
          Results for "...{searchedQuery}..."
        </h2>
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
            <ShowShows title={"MOVIES"} shows={movies} className="mb-3" />
          )}

          {series?.length > 0 && searchedQuery && (
            <ShowShows title={"SERIES"} shows={series} className="mb-3" />
          )}
        </>
      )}
    </>
  );
}
