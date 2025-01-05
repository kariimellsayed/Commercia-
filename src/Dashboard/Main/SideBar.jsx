import { NavLink } from "react-router-dom";
import "./Dashboard.scss";

function SideBar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-list">
          <li>
            <NavLink to="/dashboard/users" className="sidebar-link">
              <i className="fa-solid fa-users"></i>
              <span>Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/products" className="sidebar-link">
              <i className="fa-brands fa-product-hunt"></i>
              <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add" className="sidebar-link">
              <i className="fa-regular fa-square-plus"></i>
              <span>Add Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/brands" className="sidebar-link">
              <i className="fa-brands fa-bandcamp"></i>
              <span>Brands</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/new" className="sidebar-link">
              <i className="fa-regular fa-square-plus"></i>
              <span>Add Brands</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
