import { useEffect } from "react";
import BrandsSection from "../../Components/BrandsSection/BrandsSection";
import ContactSection from "../../Components/ContactSection/ContactSection";
import CustomerSection from "../../Components/CustomerSection/CustomerSection";
import FeatureSection from "../../Components/FeatureSection/FeatureSection";
import HeroSection from "../../Components/HeroSection/HeroSection";
import OfferSection from "../../Components/OffersSection/OfferSection";
import SignupSection from "../../Components/SignupSection/SignupSection";
import WorksSection from "../../Components/WorksSection/WorksSection";
import "./Home.scss";

const Home = () => {
  // Title Of Tap
  useEffect(() => {
    document.title = "Home | Commercia";
  }, []);
  return (
    <section className="home">
      <HeroSection />
      <FeatureSection />
      <CustomerSection />
      <BrandsSection />
      <OfferSection />
      <SignupSection />
      <WorksSection />
      <ContactSection />
    </section>
  );
};

export default Home;
