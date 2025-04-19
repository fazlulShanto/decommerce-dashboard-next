import { Metadata } from "next";
import { HeroSection } from "./HeroSection";
import { Navbar } from "./Navbar";
import { PricingSection } from "./Pricing";
import { FeatureSection } from "./FeatureSection";  
import CustomerJourney from "./CustomerJourney";
import TestimonialSection from "./Testimonial";
import { Footer } from "./Footer";

export const metadata: Metadata = {
  title: "Decommerce - Discord Ecommerce Bot | Sell Products Directly in Discord",
  description: "Transform your Discord server into a fully-functional store with Decommerce. Manage products, process orders, and track sales all within Discord.",
  keywords: "discord bot, ecommerce solution, discord store, sell on discord",
};

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-radial text-white">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <CustomerJourney />
      <TestimonialSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default LandingPage;