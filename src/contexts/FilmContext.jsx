import axios from "axios";
import { createContext, useContext, useState } from "react";

const baseApiUrl = import.meta.env.VITE_SEARCH_MOVIE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const language = import.meta.env.VITE_LANG;

const apiUrl = new URL(baseApiUrl);
apiUrl.searchParams.set("api_key", apiKey);
apiUrl.searchParams.set("language", language);

// # dichiaro il contesto
const FilmContext = createContext();

// # funzione per generare il provider
function FilmProvider({ children }) {
  const [movies, setMovies] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getMovies = () => {
    setIsLoading(true);
    apiUrl.searchParams.set("query", searchQuery);
    axios
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
      });
  };

  const contextValue = {
    searchQuery,
    setSearchQuery,
    getMovies,
    isLoading,
    movies,
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
