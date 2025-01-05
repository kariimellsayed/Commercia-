import "./BrandsSection.scss";

const BrandsSection = () => {
  return (
    <section className="brands-section">
      <div className="container">
        <h2 className="heading-section">Our Brands</h2>
        <div className="brands-grid">
          <img src="/assets/images/apple_logo.png" alt="apple" />
          <img src="/assets/images/dell_logo.jpg" alt="dell" />
          <img src="/assets/images/hp_logo.png" alt="hp" />
          <img src="/assets/images/lenovo_logo.jpg" alt="lenovo" />
          <img src="/assets/images/asus_logo.jpg" alt="asus" />
          <img src="/assets/images/samsung_logo.jpg" alt="samsung" />
          <img src="/assets/images/xiaomi_logo.png" alt="xiaomi" />
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
