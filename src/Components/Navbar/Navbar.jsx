import { Link, NavLink, useNavigate } from "react-router-dom";
import { Link as Slinck } from "react-scroll";
import { useState, useEffect } from "react";
import "./Navbar.scss";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, clearToken } from "../../features/authSlice";

function Navbar() {
  const [bars, setBars] = useState(false);
  // Navigate
  const navigation = useNavigate();
  // dispatch
  const dispatch = useDispatch();

  // Cookie
  const cookie = new Cookies();
  const tokenInCookie = cookie.get("Bearer");

  // UseRole
  const userRole = useSelector((state) => state.auth.userRole);

  // Cart Items

  // جلب السلة من Redux
  const cartItems = useSelector((state) => state.cart.items);

  const wishItems = useSelector((state) => state.wish.items);

  // Scrolled
  const [scrolled, setScrolled] = useState(false);

  // Click on Any Where With Sidebar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bars && !e.target.closest(".links") && !e.target.closest(".bars")) {
        setBars(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [bars]);

  // Scrolled With Blur
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    setBars(false);
    dispatch(clearToken());
    dispatch(clearAuth());
    cookie.remove("Bearer", { path: "/" });
    cookie.remove("userRole", { path: "/" });
    navigation("/");
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="content flex flex-between">
        <div className="brand">
          <Link to="/" className="text-commerce">
            Commercia
          </Link>
        </div>

        {/* Links */}
        <ul className={`links flex ${bars ? "show" : ""}`}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/electronics">Electronics</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <Slinck to="contact" smooth={true} duration={500} offset={-70}>
              Contact Us
            </Slinck>
          </li>
        </ul>

        {/* Account Options */}
        <div className={`account flex ${bars ? "show" : ""}`}>
          <div className="icons flex">
            <div className="cart">
              <NavLink
                to="/cart"
                className={`${cartItems.length > 0 && "cont"}`}
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </NavLink>
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </div>
            <div className="heart">
              <NavLink
                to="/wishlist"
                className={`${wishItems.length > 0 && "cont"}`}
              >
                <i className="fa-solid fa-heart"></i>
                {wishItems.length > 0 && (
                  <span className="wish-count">{wishItems.length}</span>
                )}
              </NavLink>
            </div>
          </div>

          <div className={`register flex ${bars ? "show" : ""}`}>
            {tokenInCookie ? (
              <>
                <Link onClick={handleLogout} className="logout">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  Logout
                </Link>
                {userRole && userRole.includes("Admin") && (
                  <Link to="/dashboard">
                    <i className="fa-solid fa-gauge"></i> Dashboard
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/register" className="reg">
                  <i className="fa-solid fa-user-plus"></i>
                  Register
                </Link>
                <Link to="/login" className="log">
                  <i className="fa-solid fa-right-to-bracket"></i>
                  Login
                </Link>
              </>
            )}
          </div>
          <div
            className={`bars ${bars ? "back" : ""}`}
            onClick={() => setBars(!bars)}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
