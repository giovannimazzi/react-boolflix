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
      <div className="card rounded-0">
        <img
          src={show.posterSrc}
          alt={show.title ?? show.name}
          className="card-img rounded-0"
        />
        <div className="card-img-overlay bg-dark bg-opacity-75 text-white">
          <h5 className="card-title">
            <strong>Titolo:</strong> {show.title ?? show.name}
          </h5>
          {/* <p className="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p className="card-text">
            <small>Last updated 3 mins ago</small>
          </p> */}
        </div>
      </div>
      {/* <ul>
        <li>
          <strong>Titolo:</strong> {show.title ?? show.name}
        </li>
        <li>
          <strong>Titolo Originale:</strong>{" "}
          {show.original_title ?? show.original_name}
        </li>
        <li>
          <strong>Lingua Originale:</strong>
          <img
            src={`https://flagcdn.com/28x21/${flagAdapter(show.original_language)}.png`}
            alt={show.original_language}
            className="ms-2 "
          />
        </li>
        <li>
          <strong>Voto:</strong> {show.vote_average}
        </li>
        <li>
          <strong>Stelle:</strong> {show.voteStars}
          {" - "}
          <span>
            {show.starsArray.map((s, i) =>
              s ? <FaStar key={i} /> : <FaRegStar key={i} />,
            )}
          </span>
        </li>
        <li>
          <img
            src={show.posterSrc}
            alt={show.title ?? show.name}
            className="border border-1"
          />
        </li>
      </ul> */}
    </div>
  );
}
