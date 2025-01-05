import "./CustomerSection.scss";

const CustomerSection = () => {
  return (
    <section className="customer-reviews">
      <div className="container">
        <h2 className="heading-section">Customer Reviews</h2>
        <div className="review-grid">
          <div className="review-card">
            <p>Great products and fast shipping and smart service!</p>
            <img src="/assets/images/stefan.jpg" alt="profile" loading="lazy" />
            <h4>- Stefan</h4>
          </div>
          <div className="review-card">
            <p>Amazing quality and excellent customer service.</p>
            <img src="/assets/images/olly.jpg" alt="profile" loading="lazy" />
            <h4>- Olly</h4>
          </div>
          <div className="review-card">
            <p>The best prices and fastest customer services.</p>
            <img src="/assets/images/justin.jpg" alt="profile" loading="lazy" />
            <h4>- Justin</h4>
          </div>
          <div className="review-card">
            <p>Great user experience and ease of use and services.</p>
            <img src="/assets/images/simon.jpg" alt="profile" loading="lazy" />
            <h4>- Simon</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerSection;
