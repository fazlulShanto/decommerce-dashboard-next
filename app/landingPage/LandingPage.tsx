import { HeroSection } from "./HeroSection";
import { Navbar } from "./Navbar";
import { PricingSection } from "./Pricing";
import { FeatureSection } from "./FeatureSection";  
import CustomerJourney from "./CustomerJourney";
import TestimonialSection from "./Testimonial";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-radial text-white">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <CustomerJourney />
      <TestimonialSection />
      <PricingSection />
    </div>
  );
};

export default LandingPage;