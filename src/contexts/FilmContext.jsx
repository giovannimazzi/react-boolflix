import axios from "axios";
import { createContext, useContext, useState } from "react";

const moviesBaseApiUrl = import.meta.env.VITE_SEARCH_MOVIES_URL;
const seriesBaseApiUrl = import.meta.env.VITE_SEARCH_SERIES_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const language = import.meta.env.VITE_LANG;

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
        setMovies(res[0].data.results);
        setSeries(res[1].data.results);
      })
      .finally(() => {
        setSearchQuery("");
        setIsLoading(false);
      });

    /* axios
      .get(apiUrl.href)
      .then((res) => {
        setMovies(
          res.data.results.map(
            ({
              id,
              original_language,
              original_title,
              title,
              vote_average,
            }) => {
              return {
                id,
                original_language,
                original_title,
                title,
                vote_average,
              };
            },
          ),
        );
      })
      .finally(() => {
        setSearchQuery("");
        setIsLoading(false);
      }); */
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
