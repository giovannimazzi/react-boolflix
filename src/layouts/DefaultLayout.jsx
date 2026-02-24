import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function DefaultLayout() {
  return (
    <>
      <SearchBar />
      <div className="container py-5">
        <Outlet />
      </div>
    </>
  );
}
