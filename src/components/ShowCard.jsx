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

export default function ShowCard({ show }) {
  return (
    <div className="col">
      <div className="card rounded-0 show-card">
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
          <p className="card-text">{show.overview}</p>
        </div>
      </div>
    </div>
  );
}
