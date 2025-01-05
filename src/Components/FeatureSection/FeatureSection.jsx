import "./FeatureSection.scss";

const FeatureSection = () => {
  return (
    <section className="featured-categories">
      <div className="container">
        <h2 className="heading-section">Featured Categories</h2>
        <div className="categories-grid">
          <div className="category-card">
            <i className="fa-solid fa-mobile-button"></i>
            <h3>Phones</h3>
          </div>
          <div className="category-card">
            <i className="fa-solid fa-laptop"></i>
            <h3>Laptops</h3>
          </div>
          <div className="category-card">
            <i className="fa-regular fa-keyboard"></i>
            <h3>Accessories</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
