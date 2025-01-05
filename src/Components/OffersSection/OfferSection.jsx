import { Link } from "react-router-dom";
import "./OfferSection.scss";

const OfferSection = () => {
  return (
    <section className="special-offers">
      <div className="container">
        <h2 className="heading-section">Special Offers</h2>
        <div className="offer-grid">
          <div className="offer-card">
            <h3>Up to 50% Off Laptops</h3>
            <p>Limited time offer</p>
            <Link to={"/electronics"} className="cta-button">
              Shop Now
            </Link>
          </div>
          <div className="offer-card">
            <h3>Buy 1 Get 1 Free on Accessories</h3>
            <p>Dont miss out!</p>
            <Link to={"/electronics"} className="cta-button">
              Shop Now
            </Link>
          </div>
          <div className="offer-card">
            <h3>Up to 20% Off Mobiles</h3>
            <p>Limited time offer</p>
            <Link to={"/electronics"} className="cta-button">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
