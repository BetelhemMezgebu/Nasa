
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

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

  // Keep Favorites synchronized across the whole app
  useEffect(() => {
    function handleFavoritesUpdated() {
      setFavorites(readFavorites());
    }

    window.addEventListener(
      "favoritesUpdated",
      handleFavoritesUpdated
    );

    return () => {
      window.removeEventListener(
        "favoritesUpdated",
        handleFavoritesUpdated
      );
    };
  }, []);

  function save(nextFavorites) {
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(nextFavorites)
    );

    setFavorites(nextFavorites);

    window.dispatchEvent(
      new Event("favoritesUpdated")
    );
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

    window.dispatchEvent(
      new Event("favoritesUpdated")
    );
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
