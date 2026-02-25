import axios from "axios";
import { useState } from "react";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

// funzione a cui aggiungere una regola,
// ogni volta che si trova una conversione non riuscita.
const flagAdapter = (language) => {
  if (language === "en") return "gb";
  if (language === "ja") return "jp";
  if (language === "ko") return "kr";
  return language;
};

const getCast5 = (hasCast, setHasCast, type, id, setCast, setIsLoading) => {
  if (!hasCast) {
    setIsLoading(true);
    const baseApiUrl =
      type === "movie"
        ? import.meta.env.VITE_CREDITS_MOVIES_URL.replace(
            "{movie_id}",
            "{placeholder}",
          )
        : import.meta.env.VITE_CREDITS_SERIES_URL.replace(
            "{series_id}",
            "{placeholder}",
          );

    const apiUrl = new URL(baseApiUrl.replace("{placeholder}", id));
    apiUrl.searchParams.set("api_key", import.meta.env.VITE_API_KEY);

    axios
      .get(apiUrl)
      .then((res) => {
        setCast(res.data.cast.map((c) => c.name).slice(0, 5));
        setHasCast(true);
      })
      .catch((e) => alert("ERRORE: " + e.message))
      .finally(() => setIsLoading(false));
  }
};

export default function ShowCard({ show }) {
  const [hasCast, setHasCast] = useState(false);
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="col">
      <div
        className="card rounded-0 show-card"
        onMouseEnter={() =>
          getCast5(
            hasCast,
            setHasCast,
            show.type,
            show.id,
            setCast,
            setIsLoading,
          )
        }
      >
        <div className="ratio ratio-2x3">
          <img
            src={show.posterSrc}
            alt={show.title ?? show.name}
            className="w-100 h-100 rounded-0 object-fit-cover"
          />
        </div>
        <div className="card-details card-img-overlay bg-dark text-white text-center">
          <h5 className="card-title fw-bold">{show.title ?? show.name}</h5>
          <h6 className="text-secondary">
            {show.original_title ?? show.original_name}
          </h6>
          <img
            src={`https://flagcdn.com/28x21/${flagAdapter(show.original_language)}.png`}
            alt={show.original_language}
            className="d-block ms-auto me-auto"
          />
          <span className="text-warning">
            {show.starsArray.map((s, i) =>
              s ? <FaStar key={i} /> : <FaRegStar key={i} />,
            )}
          </span>
          {show.genres?.length > 0 && (
            <p className="text-secondary">{show.genres.join(", ")}</p>
          )}
          {isLoading && <p>Caricamento Cast...</p>}
          {!isLoading && cast.length > 0 && <p>{cast.join(", ")}</p>}
          {show.overview && (
            <p className="card-text">
              <strong>Trama:</strong>
              <br />
              {show.overview}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
