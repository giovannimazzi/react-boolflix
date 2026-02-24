import { NavLink } from "react-router-dom";
import { useFilm } from "../contexts/FilmContext";

const appName = import.meta.env.VITE_APP_NAME;

export default function SearchBar() {
  const { searchQuery, setSearchQuery, getMovies } = useFilm();

  const handleOnChangeInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    getMovies();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={"/"}>
          🎞️{appName.toUpperCase()}
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form
            className="d-flex ms-auto"
            role="search"
            onSubmit={handleOnSubmit}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Cerca..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => {
                handleOnChangeInput(e);
              }}
            />
            <button
              className="btn btn-outline-primary"
              type="submit"
              onClick={handleSearchClick}
            >
              Cerca
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
