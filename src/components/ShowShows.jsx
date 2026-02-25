import ShowCard from "./ShowCard";

export default function ShowShows({ title, shows }) {
  return (
    <>
      <div className="show-title">
        <h1 className="text-black">{title}</h1>
      </div>
      <div className="row row-cols-3 row-cols-md-4 g-3 mb-5">
        {shows?.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </>
  );
}
