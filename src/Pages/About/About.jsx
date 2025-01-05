import { useEffect } from "react";
import "./About.scss";

const About = () => {
  // Title
  useEffect(() => {
    document.title = "About | Commercia";
  }, []);
  return (
    <div className="about-page">
      <div className="container">
        <section className="about-intro">
          <h1 className="ws-2">
            About <span className="text-logo">Commercia</span>
          </h1>
          <p>
            We are an electronic store specializing in providing the latest
            technology at competitive prices.
          </p>
        </section>

        <section className="about-history">
          <h2>Our History</h2>
          <p>
            Since our founding, we have been committed to delivering the latest
            electronics and high-quality services.
          </p>
        </section>

        <section className="about-values">
          <h2>Our Values</h2>
          <div className="values-list">
            <div className="value-item">
              <i className="fa fa-star"></i>
              <h3>Excellence</h3>
              <p>
                We are dedicated to providing the best products and services.
              </p>
            </div>
            <div className="value-item">
              <i className="fa fa-lightbulb"></i>
              <h3>Innovation</h3>
              <p>
                We strive to offer the most advanced technological products.
              </p>
            </div>
            <div className="value-item">
              <i className="fa fa-handshake"></i>
              <h3>Transparency</h3>
              <p>We operate with honesty and openness with our customers.</p>
            </div>
          </div>
        </section>

        <section className="about-features">
          <h2>
            Why Choose
            <span className="text-logo ">Commercia ?</span>
          </h2>
          <ul>
            <li>Fast and secure delivery</li>
            <li>24/7 customer support</li>
            <li>Guaranteed original products</li>
          </ul>
        </section>

        <section className="about-contact">
          <h2>Contact Us</h2>
          <p>Follow us on social media or reach out to us for any inquiries.</p>
        </section>
      </div>
    </div>
  );
};

export default About;
