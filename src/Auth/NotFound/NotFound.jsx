import { Link } from "react-router-dom";
import "./NotFound.scss";

function NotFound() {
  return (
    <div className="notfound-page">
      <h1 className="error-code">404</h1>
      <p className="error-message">
        Oops! The page youre looking for doesnt exist.
      </p>
      <Link to="/">
        <button className="home-button">Go Home</button>
      </Link>
    </div>
  );
}

export default NotFound;
