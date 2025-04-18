
import { HeroSection } from "./HeroSection";
import { Navbar } from "./Navbar";
import { PricingSection } from "./Pricing";
import { FeatureSection } from "./FeatureSection";  
import FAQ  from "./FAQ";
export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-radial text-white">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <PricingSection />
      <FAQ />
    </div>
  );
};

export default LandingPage;