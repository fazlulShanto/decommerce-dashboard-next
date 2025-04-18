
import { HeroSection } from "./HeroSection";
import { Navbar } from "./Navbar";
import { PricingSection } from "./Pricing";
import { FeatureSection } from "./FeatureSection";  

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-radial text-white">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <PricingSection />
    </div>
  );
};

export default LandingPage;