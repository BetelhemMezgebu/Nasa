import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found-page">

      <p className="section-label">
        404 ERROR
      </p>

      <h1>Page Not Found</h1>

      <p>
        The page you're looking for doesn't exist.
      </p>

      <Link to="/" className="primary-button">
        ← Back to Home
      </Link>

    </main>
  );
}

export default NotFound;