import { createContext, useContext, useState } from "react";

const FAVORITES_KEY = "nasaExplorerFavorites";

const FavoritesContext = createContext(null);

function readFavorites() {
  try {
    return JSON.parse(
      localStorage.getItem(FAVORITES_KEY)
    ) || [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readFavorites);

  function save(nextFavorites) {
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(nextFavorites)
    );

    setFavorites(nextFavorites);
  }

  function isFavorite(id) {
    return favorites.some(
      (item) => (item.id || item.date) === id
    );
  }

  function toggleFavorite(item) {
    const id = item.id || item.date;

    const exists = favorites.some(
      (favorite) =>
        (favorite.id || favorite.date) === id
    );

    if (exists) {
      save(
        favorites.filter(
          (favorite) =>
            (favorite.id || favorite.date) !== id
        )
      );
    } else {
      save([...favorites, item]);
    }
  }

  function removeFavorite(id) {
    save(
      favorites.filter(
        (favorite) =>
          (favorite.id || favorite.date) !== id
      )
    );
  }

  function clearFavorites() {
    localStorage.removeItem(FAVORITES_KEY);
    setFavorites([]);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}