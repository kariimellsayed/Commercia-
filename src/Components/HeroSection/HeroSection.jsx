import { Link } from "react-router-dom";
import "./HeroSection.scss";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>
          Welcome to <span className="text-logo">Commercia</span>
        </h1>
        <p>Discover the latest technology at unbeatable prices</p>
        <Link className="cta-button" to={"/electronics"}>
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
