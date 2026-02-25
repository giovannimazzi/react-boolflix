import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function DefaultLayout() {
  return (
    <>
      <SearchBar />
      <div id="page-content">
        <div className="container py-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
