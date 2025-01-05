import "./SignupSection.scss";

const SignupSection = () => {
  return (
    <section className="newsletter-signup">
      <div className="container">
        <h2 className="heading-section">Stay Updated</h2>
        <p>
          Sign up for our newsletter to receive exclusive offers and product
          updates.
        </p>
        <form action="/subscribe" method="POST">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default SignupSection;
