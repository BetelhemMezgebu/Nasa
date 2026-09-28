function SearchBar({
  value,
  onChange,
  placeholder = "Search..."
}) {
  return (
    <div className="search-bar">
      <span>⌕</span>

      <input
        type="search"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        aria-label="Search"
      />
    </div>
  );
}

export default SearchBar;