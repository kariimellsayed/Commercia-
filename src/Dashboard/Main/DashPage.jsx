import { useEffect } from "react";
import "./Dashboard.scss";

function DashPage() {
  // Title Of Tap
  useEffect(() => {
    document.title = "Dashboard | Commercia";
  }, []);

  return (
    <div className="dash-page">
      <div className="dash-page-content">
        <i className="fa-solid fa-gauge"></i>
        <h2>Dashboard</h2>
      </div>
    </div>
  );
}

export default DashPage;
