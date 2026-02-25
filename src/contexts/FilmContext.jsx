import axios from "axios";
import { createContext, useContext, useState } from "react";

const moviesBaseApiUrl = import.meta.env.VITE_SEARCH_MOVIES_URL;
const seriesBaseApiUrl = import.meta.env.VITE_SEARCH_SERIES_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const language = import.meta.env.VITE_LANG;
const postersBaseApiUrl = import.meta.env.VITE_POSTERS_URL;
const posterWidth = 342; //choose the width: [92, 154, 185, 342, 500, 780, "original"]
const posterInitPath =
  postersBaseApiUrl +
  (posterWidth === "original" ? posterWidth : `w${posterWidth}`);

const moviesApiUrl = new URL(moviesBaseApiUrl);
const seriesApiUrl = new URL(seriesBaseApiUrl);
moviesApiUrl.searchParams.set("api_key", apiKey);
seriesApiUrl.searchParams.set("api_key", apiKey);
moviesApiUrl.searchParams.set("language", language);
seriesApiUrl.searchParams.set("language", language);

// # dichiaro il contesto
const FilmContext = createContext();

// # funzione per generare il provider
function FilmProvider({ children }) {
  const [movies, setMovies] = useState();
  const [series, setSeries] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getShows = () => {
    setIsLoading(true);
    moviesApiUrl.searchParams.set("query", searchQuery);
    seriesApiUrl.searchParams.set("query", searchQuery);

    Promise.all([axios.get(moviesApiUrl.href), axios.get(seriesApiUrl.href)])
      .then((res) => {
        const res0 = res[0].data.results;
        const res1 = res[1].data.results;
        setMovies(
          res0?.map((m) => ({
            ...m,
            posterSrc: posterInitPath + m.poster_path,
          })),
        );
        setSeries(
          res1?.map((s) => ({
            ...s,
            posterSrc: posterInitPath + s.poster_path,
          })),
        );
      })
      .finally(() => {
        setSearchQuery("");
        setIsLoading(false);
      });
  };

  const contextValue = {
    searchQuery,
    setSearchQuery,
    searchedQuery,
    setSearchedQuery,
    getShows,
    isLoading,
    movies,
    series,
  };

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
