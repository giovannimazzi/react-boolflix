import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import noPoster from "../assets/img/no-poster.png";

const moviesBaseApiUrl = import.meta.env.VITE_SEARCH_MOVIES_URL;
const seriesBaseApiUrl = import.meta.env.VITE_SEARCH_SERIES_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const language = import.meta.env.VITE_LANG;
const postersBaseApiUrl = import.meta.env.VITE_POSTERS_URL;
const posterWidth = 342; //choose the width: [92, 154, 185, 342, 500, 780, "original"]
const posterInitPath =
  postersBaseApiUrl +
  (posterWidth === "original" ? posterWidth : `w${posterWidth}`);
const genresMoviesBaseApiUrl = import.meta.env.VITE_GENRES_MOVIES_URL;
const genresSeriesBaseApiUrl = import.meta.env.VITE_GENRES_SERIES_URL;

const moviesApiUrl = new URL(moviesBaseApiUrl);
const seriesApiUrl = new URL(seriesBaseApiUrl);
moviesApiUrl.searchParams.set("api_key", apiKey);
seriesApiUrl.searchParams.set("api_key", apiKey);
moviesApiUrl.searchParams.set("language", language);
seriesApiUrl.searchParams.set("language", language);
const gernesMoviesApiUrl = new URL(genresMoviesBaseApiUrl);
const gernesSeriesApiUrl = new URL(genresSeriesBaseApiUrl);
gernesMoviesApiUrl.searchParams.set("api_key", apiKey);
gernesSeriesApiUrl.searchParams.set("api_key", apiKey);

function normalizeData(data, genresArray, type) {
  const starsArray = new Array(5);
  starsArray.fill(false);
  const normalizedData = data?.map((d) => {
    const voteStars = Math.ceil((d.vote_average * 5) / 10);
    const posterSrc =
      d.poster_path && d.poster_path.trim() !== ""
        ? posterInitPath + d.poster_path
        : noPoster;
    return {
      ...d,
      posterSrc: posterSrc,
      voteStars: voteStars,
      starsArray: starsArray.map((_, index) =>
        index + 1 <= voteStars ? true : false,
      ),
      genres: d.genre_ids.map(
        (gid) => genresArray.find((g) => g.id === gid).name,
      ),
      type: type,
    };
  });
  return normalizedData;
}

// # dichiaro il contesto
const FilmContext = createContext();

// # funzione per generare il provider
function FilmProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([]);

  const getGenres = () => {
    setIsLoading(true);

    Promise.all([
      axios.get(gernesMoviesApiUrl.href),
      axios.get(gernesSeriesApiUrl.href),
    ])
      .then((res) => {
        const results = [
          ...genres,
          ...res[0].data.genres,
          ...res[1].data.genres,
        ];
        const genresSet = [];
        results.forEach((g) => {
          if (!genresSet.map((g) => g.id).includes(g.id)) genresSet.push(g);
        });
        setGenres(genresSet);
      })
      .catch((err) => {
        alert("ERRORE: " + err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getShows = (query) => {
    if (query && query.trim() != "") {
      setIsLoading(true);
      moviesApiUrl.searchParams.set("query", query);
      seriesApiUrl.searchParams.set("query", query);

      Promise.all([axios.get(moviesApiUrl.href), axios.get(seriesApiUrl.href)])
        .then((res) => {
          setMovies(normalizeData(res[0].data.results, genres, "movie"));
          setSeries(normalizeData(res[1].data.results, genres, "tv"));
        })
        .catch((err) => {
          alert("ERRORE: " + err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setMovies([]);
      setSeries([]);
    }
  };

  const contextValue = {
    searchedQuery,
    setSearchedQuery,
    getShows,
    isLoading,
    movies,
    series,
    getGenres,
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <FilmContext.Provider value={contextValue}>{children}</FilmContext.Provider>
  );
}

// # funzione per consumare velocemente il context
function useFilm() {
  return useContext(FilmContext);
}

// # export funzioni
export { FilmProvider, useFilm };
