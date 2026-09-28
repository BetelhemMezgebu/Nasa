import FavoriteButton from "./FavoriteButton";

function SpaceCard({
  item,
  onOpen,
  isFavorite,
  onToggleFavorite
}) {
  const image =
    item.url || item.img_src;

  const title =
    item.title ||
    `${item.rover?.name || "Mars"} Rover Photo`;

  return (
    <article className="space-card">

      <button
        className="space-card-image-button"
        onClick={() => onOpen?.(item)}
        aria-label={`Open ${title}`}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="space-card-image"
        />
      </button>

      <div className="space-card-content">

        <span className="space-card-date">
          {item.date ||
            item.earth_date ||
            "NASA"}
        </span>

        <h2>{title}</h2>

        <div className="space-card-actions">

          <button
            className="space-card-view"
            onClick={() => onOpen?.(item)}
          >
            View Discovery →
          </button>

          <FavoriteButton
            item={item}
            isFavorite={isFavorite}
            onToggle={onToggleFavorite}
          />

        </div>

      </div>

    </article>
  );
}

export default SpaceCard;