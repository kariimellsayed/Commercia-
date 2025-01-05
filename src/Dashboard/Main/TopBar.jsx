import { Link } from "react-router-dom";
import "./Dashboard.scss";

function TopBar() {
  return (
    <header className="topbar flex flex-between">
      <div className="topbar-logo ">
        <Link to={"/dashboard"}>
          <i className="fa-solid fa-gauge"></i>Dashboard
        </Link>
      </div>
      <div className="topbar-web">
        <Link to={"/"}>
          <i className="fa-solid fa-right-from-bracket"></i>
          To Website
        </Link>
      </div>
    </header>
  );
}

export default TopBar;
