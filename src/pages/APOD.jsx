import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAPOD } from "../services/nasaApi";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const FAVORITES_KEY = "nasaExplorerFavorites";

function APOD() {
  const [searchParams] = useSearchParams();

  const [apod, setApod] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [latestDate, setLatestDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const dateFromUrl = searchParams.get("date");

    loadAPOD(dateFromUrl || "");
  }, []);

  useEffect(() => {
    if (apod) {
      checkFavorite(apod.date);
    }
  }, [apod]);

  async function loadAPOD(date = "") {
    try {
      setLoading(true);
      setError("");

      const data = await getAPOD(date);
      const latestAPOD = data[0];

      setApod(latestAPOD);

      if (!latestDate && latestAPOD?.date) {
        setLatestDate(latestAPOD.date);
      }

      if (date) {
        setSelectedDate(date);
      } else if (latestAPOD?.date) {
        setSelectedDate(latestAPOD.date);
      }
    } catch (err) {
      setError(err.message);
      setApod(null);
    } finally {
      setLoading(false);
    }
  }

  function checkFavorite(date) {
    const favorites =
      JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

    const exists = favorites.some(
      (favorite) => favorite.date === date
    );

    setIsFavorite(exists);
  }

  function toggleFavorite() {
    const favorites =
      JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.date !== apod.date
      );

      localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(false);
      return;
    }

    const favoriteAPOD = {
      date: apod.date,
      title: apod.title,
      explanation: apod.explanation,
      url: apod.url,
      hdurl: apod.hdurl || apod.url,
      media_type: apod.media_type,
      credit: apod.credit || "",
    };

    const updatedFavorites = [
      ...favorites,
      favoriteAPOD,
    ];

    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(updatedFavorites)
    );

    setIsFavorite(true);
  }

  function handleDateChange(event) {
    setSelectedDate(event.target.value);
  }

  function handleDateSubmit(event) {
    event.preventDefault();

    if (!selectedDate) {
      return;
    }

    loadAPOD(selectedDate);
  }

  function changeDate(days) {
    const currentDate = new Date(
      `${selectedDate}T00:00:00`
    );

    currentDate.setDate(
      currentDate.getDate() + days
    );

    const newDate =
      currentDate.toISOString().split("T")[0];

    if (latestDate && newDate > latestDate) {
      return;
    }

    setSelectedDate(newDate);
    loadAPOD(newDate);
  }

  function goToLatest() {
    loadAPOD();
  }

  function closeFullscreen() {
    setIsFullscreen(false);
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <main className="apod-page">
        <ErrorMessage message={error} />

        <button
          className="primary-button"
          onClick={() => loadAPOD()}
        >
          Back to Latest APOD
        </button>
      </main>
    );
  }

  if (!apod) {
    return (
      <ErrorMessage message="No APOD data found." />
    );
  }

  return (
    <>
      <main className="apod-page">

        <section className="apod-header">

          <p className="section-label">
            NASA • DAILY DISCOVERY
          </p>

          <h1>Astronomy Picture of the Day</h1>

          <p className="apod-intro">
            Explore the universe through NASA's featured
            image or video of the day.
          </p>

          <form
            className="apod-date-picker"
            onSubmit={handleDateSubmit}
          >
            <label htmlFor="apod-date">
              Explore another date
            </label>

            <div className="date-picker-controls">

              <input
                id="apod-date"
                type="date"
                value={selectedDate}
                max={latestDate}
                onChange={handleDateChange}
              />

              <button
                type="submit"
                className="primary-button"
              >
                View APOD
              </button>

            </div>
          </form>

          <div className="apod-date-navigation">

            <button
              type="button"
              className="date-nav-button"
              onClick={() => changeDate(-1)}
            >
              ← Previous
            </button>

            <button
              type="button"
              className="today-button"
              onClick={goToLatest}
            >
              Latest
            </button>

            <button
              type="button"
              className="date-nav-button"
              onClick={() => changeDate(1)}
              disabled={selectedDate >= latestDate}
            >
              Next →
            </button>

          </div>

        </section>

        <article className="apod-card">

          <div className="apod-image-wrapper">

            {apod.media_type === "video" ? (
              <iframe
                src={apod.url}
                title={apod.title}
                className="apod-video"
                allowFullScreen
              ></iframe>
            ) : (
              <button
                className="apod-image-button"
                onClick={() =>
                  setIsFullscreen(true)
                }
                aria-label="Open image fullscreen"
              >
                <img
                  src={apod.hdurl || apod.url}
                  alt={apod.title}
                  className="apod-image"
                />

                <span className="image-expand-label">
                  ⛶ Click to expand
                </span>
              </button>
            )}

          </div>

          <div className="apod-content">

            <div className="apod-date">
              {apod.date}
            </div>

            <h2>{apod.title}</h2>

            <div className="apod-divider"></div>

            <h3>About this discovery</h3>

            <p
              dangerouslySetInnerHTML={{
                __html: apod.explanation,
              }}
            />

            {apod.credit && (
              <p
                className="apod-credit"
                dangerouslySetInnerHTML={{
                  __html: apod.credit,
                }}
              />
            )}

            <div className="apod-actions">

              <button
                type="button"
                className={`favorite-button ${
                  isFavorite
                    ? "favorite-active"
                    : ""
                }`}
                onClick={toggleFavorite}
              >
                {isFavorite
                  ? "♥ Saved"
                  : "♡ Save to Favorites"}
              </button>

              <a
                href={apod.url}
                target="_blank"
                rel="noreferrer"
                className="apod-external-link"
              >
                View on NASA →
              </a>

            </div>

          </div>

        </article>

      </main>

      {isFullscreen && (
        <div
          className="image-lightbox"
          onClick={closeFullscreen}
        >
          <button
            className="lightbox-close"
            onClick={closeFullscreen}
            aria-label="Close fullscreen image"
          >
            ×
          </button>

          <img
            src={apod.hdurl || apod.url}
            alt={apod.title}
            className="lightbox-image"
            onClick={(event) =>
              event.stopPropagation()
            }
          />

          <p className="lightbox-title">
            {apod.title}
          </p>
        </div>
      )}

    </>
  );
}

export default APOD;