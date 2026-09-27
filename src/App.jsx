import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import APOD from "./pages/APOD";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apod" element={<APOD />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;