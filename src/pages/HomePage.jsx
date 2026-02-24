import { useEffect } from "react";
import { useFilm } from "../contexts/FilmContext";

export default function HomePage() {
  const { isLoading, movies } = useFilm();

  return (
    <>
      {isLoading ? (
        <div className="d-flex flex-column align-items-center gap-2 mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <strong>Loading...</strong>
        </div>
      ) : (
        <ul>
          {movies &&
            movies.map((mov) => (
              <li key={mov.id} className="mb-3">
                <ul>
                  <li>
                    <strong>Titolo:</strong> {mov.title}
                  </li>
                  <li>
                    <strong>Titolo Originale:</strong> {mov.original_title}
                  </li>
                  <li>
                    <strong>Lingua Originale:</strong> {mov.original_language}
                  </li>
                  <li>
                    <strong>Voto:</strong> {mov.vote_average}
                  </li>
                </ul>
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
