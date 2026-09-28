import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FavoritesProvider } from "./context/FavoritesContext";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import APOD from "./pages/APOD";
import Favorites from "./pages/Favorites";
import MarsRover from "./pages/MarsRover";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>

      <FavoritesProvider>

        <Layout>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apod" element={<APOD />} />
            <Route
              path="/favorites"
              element={<Favorites />}
            />
            <Route
              path="/mars-rover"
              element={<MarsRover />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>

        </Layout>

      </FavoritesProvider>

    </BrowserRouter>
  );
}

export default App;