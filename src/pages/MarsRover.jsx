import { useEffect, useMemo, useState } from "react";

import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import SpaceCard from "../components/SpaceCard";
import Pagination from "../components/Pagination";

import { useFavorites } from "../context/FavoritesContext";
import { getMarsRoverPhotos } from "../services/nasaApi";

function MarsRover() {
  const [rover, setRover] = useState("curiosity");
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [camera, setCamera] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    async function loadPhotos() {
      try {
        setLoading(true);
        setError("");

        const data = await getMarsRoverPhotos(rover);

        setPhotos(data);
        setPage(1);
      } catch (err) {
        setError(
          err.message || "Failed to load Mars Rover photos."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPhotos();
  }, [rover]);

  const cameras = useMemo(() => {
    const uniqueCameras = [
      ...new Set(
        photos
          .map((photo) => photo.camera?.name)
          .filter(Boolean)
      ),
    ];

    return [
      { value: "all", label: "All Cameras" },
      ...uniqueCameras.map((name) => ({
        value: name,
        label: name,
      })),
    ];
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const title =
        photo.title ||
        `${photo.rover?.name || "Mars"} Rover Photo`;

      const searchText = search.toLowerCase();

      const searchMatch =
        title.toLowerCase().includes(searchText) ||
        photo.camera?.full_name
          ?.toLowerCase()
          .includes(searchText);

      const cameraMatch =
        camera === "all" ||
        photo.camera?.name === camera;

      return searchMatch && cameraMatch;
    });
  }, [photos, search, camera]);

  const itemsPerPage = 12;

  const totalPages = Math.ceil(
    filteredPhotos.length / itemsPerPage
  );

  const startIndex = (page - 1) * itemsPerPage;

  const currentPhotos = filteredPhotos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  function handleRoverChange(event) {
    setRover(event.target.value);
    setSearch("");
    setCamera("all");
  }

  return (
    <main className="mars-rover-page">
      <header className="mars-rover-header">
        <p className="section-label">
          MARS EXPLORATION
        </p>

        <h1>Mars Rover Photos</h1>

        <p>
          Explore photographs related to NASA's Mars
          rover missions and discover the Red Planet
          through NASA's image collection.
        </p>
      </header>

      <section className="mars-rover-controls">
        <div className="rover-selector">
          <label htmlFor="rover">
            Rover
          </label>

          <select
            id="rover"
            value={rover}
            onChange={handleRoverChange}
          >
            <option value="curiosity">
              Curiosity
            </option>

            <option value="opportunity">
              Opportunity
            </option>

            <option value="spirit">
              Spirit
            </option>
          </select>
        </div>

        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Search Mars photos..."
        />

        <FilterBar
          value={camera}
          onChange={(value) => {
            setCamera(value);
            setPage(1);
          }}
          options={cameras}
          label="Source"
        />
      </section>

      {loading && (
        <div className="loading">
          Loading Mars Rover photos...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <section className="space-grid">
            {currentPhotos.map((photo) => {
              const id = photo.id;

              return (
                <SpaceCard
                  key={id}
                  item={photo}
                  onOpen={() => {}}
                  isFavorite={isFavorite(id)}
                  onToggleFavorite={toggleFavorite}
                />
              );
            })}
          </section>

          {!currentPhotos.length && (
            <div className="error-message">
              No Mars photos match your search.
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </main>
  );
}

export default MarsRover;