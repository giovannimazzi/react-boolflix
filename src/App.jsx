import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import { FilmProvider } from "./contexts/FilmContext";

export default function App() {
  return (
    <FilmProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route index Component={HomePage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FilmProvider>
  );
}
