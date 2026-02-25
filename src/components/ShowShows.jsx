export default function ShowShows({ title, shows }) {
  return (
    <>
      <h1>{title}</h1>
      <ul>
        {shows?.map((show) => (
          <li key={show.id} className="mb-3">
            <ul>
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
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

// funzione a cui aggiungere una regola,
// ogni volta che si trova una conversione non riuscita.
const flagAdapter = (language) => {
  if (language === "en") return "gb";
  if (language === "ja") return "jp";
  if (language === "ko") return "kr";
  return language;
};
