import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function DefaultLayout() {
  return (
    <div className="d-flex flex-column vh-100">
      <SearchBar />
      <div id="page-content" className="flex-grow-1">
        <div className="container py-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
