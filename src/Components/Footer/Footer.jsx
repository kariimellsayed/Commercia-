import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  const currentYear = new Date().getFullYear(); // الحصول على السنة الحالية

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-section about">
          <h2 className="text-logo ls-1 fw-3">Commercia</h2>
          <p>
            We offer the best products at the best prices. Discover a variety of
            products from top brands.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/brands">Brands</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="footer-section help">
          <h2>Help</h2>
          <ul>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms & Conditions</a>
            </li>
          </ul>
        </div>
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <Link className="face">
              <i className="fab fa-facebook-f "></i>
            </Link>
            <Link className="x">
              <i className="fa-brands fa-x-twitter"></i>
            </Link>
            <Link className="insta">
              <i className="fab fa-instagram "></i>
            </Link>
            <Link className="lnkd">
              <i className="fab fa-linkedin-in "></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {currentYear} <span className="text-logo">Commercia</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
