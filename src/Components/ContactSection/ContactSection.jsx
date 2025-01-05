import "./ContactSection.scss";

const ContactSection = () => {
  return (
    <section className="contact-us" id="contact">
      <div className="conatiner">
        <h2 className="heading-section">Contact Us</h2>
        <p>Have a question or need help? Reach out to us!</p>
        <form action="/contact" method="POST">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
