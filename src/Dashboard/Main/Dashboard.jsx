import "./Dashboard.scss";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard">
      <TopBar />
      <div className="dashboard-container">
        <SideBar />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
