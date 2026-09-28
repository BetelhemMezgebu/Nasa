function FavoriteButton({
  item,
  isFavorite,
  onToggle
}) {
  return (
    <button
      type="button"
      className={`favorite-button ${
        isFavorite ? "favorite-active" : ""
      }`}
      onClick={() => onToggle?.(item)}
      aria-pressed={isFavorite}
    >
      {isFavorite
        ? "♥️ Saved"
        : "♡ Save"}
    </button>
  );
}

export default FavoriteButton;