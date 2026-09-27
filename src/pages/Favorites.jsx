import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FAVORITES_KEY = "nasaExplorerFavorites";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadFavorites();
  }, []);

  function loadFavorites() {
    const savedFavorites =
      JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

    setFavorites(savedFavorites);
  }

  function removeFavorite(date) {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.date !== date
    );

    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(updatedFavorites)
    );

    setFavorites(updatedFavorites);

    window.dispatchEvent(
      new Event("favoritesUpdated")
    );
  }

  function clearFavorites() {
    localStorage.removeItem(FAVORITES_KEY);

    setFavorites([]);
    setSearch("");

    window.dispatchEvent(
      new Event("favoritesUpdated")
    );
  }

  const filteredFavorites = favorites.filter((favorite) =>
    favorite.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* =========================
     EMPTY FAVORITES
  ========================= */

  if (favorites.length === 0) {
    return (
      <main className="favorites-page">

        <section className="favorites-empty">

          <div className="empty-icon">
            ♡
          </div>

          <p className="section-label">
            YOUR COLLECTION
          </p>

          <h1>
            No saved discoveries yet.
          </h1>

          <p>
            Explore NASA's Astronomy Picture of the Day
            and save the discoveries you want to remember.
          </p>

          <Link
            to="/apod"
            className="primary-button"
          >
            Explore APOD →
          </Link>

        </section>

      </main>
    );
  }

  return (
    <main className="favorites-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="favorites-header">

        <div className="favorites-header-top">

          <div>

            <p className="section-label">
              YOUR COLLECTION
            </p>

            <h1>
              Favorite Discoveries
            </h1>

            <span className="favorites-total">
              {favorites.length}{" "}
              {favorites.length === 1
                ? "discovery"
                : "discoveries"}{" "}
              saved
            </span>

            <p>
              Your saved Astronomy Picture of the Day
              discoveries.
            </p>

          </div>

          <button
            type="button"
            className="clear-favorites-button"
            onClick={clearFavorites}
          >
            Clear All
          </button>

        </div>

        {/* =========================
            SEARCH
        ========================= */}

        <div className="favorites-search">

          <span>
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search your discoveries..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

      </section>

      {/* =========================
          NO SEARCH RESULTS
      ========================= */}

      {filteredFavorites.length === 0 ? (

        <div className="favorites-no-results">

          <div className="empty-icon">
            ⌕
          </div>

          <h2>
            No discoveries found
          </h2>

          <p>
            Try searching with a different title.
          </p>

        </div>

      ) : (

        /* =========================
           FAVORITES GRID
        ========================= */

        <section className="favorites-grid">

          {filteredFavorites.map((favorite) => (

            <article
              className="favorite-card"
              key={favorite.date}
            >

              {/* IMAGE */}

              <div className="favorite-image-wrapper">

                {favorite.media_type === "video" ? (

                  <div className="favorite-video-placeholder">

                    🎬

                    <span>
                      NASA Video
                    </span>

                  </div>

                ) : (

                  <img
                    src={
                      favorite.hdurl ||
                      favorite.url
                    }
                    alt={favorite.title}
                    className="favorite-image"
                  />

                )}

              </div>

              {/* CONTENT */}

              <div className="favorite-content">

                <span className="favorite-date">
                  {favorite.date}
                </span>

                <h2>
                  {favorite.title}
                </h2>

                {/* ACTIONS */}

                <div className="favorite-actions">

                  <Link
                    to={`/apod?date=${favorite.date}`}
                    className="favorite-view-button"
                  >
                    View Discovery →
                  </Link>

                  <button
                    type="button"
                    className="favorite-remove-button"
                    onClick={() =>
                      removeFavorite(
                        favorite.date
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            </article>

          ))}

        </section>

      )}

    </main>
  );
}

export default Favorites;