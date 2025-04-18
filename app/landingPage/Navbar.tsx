import { Button } from "@/components/ui/button";
import { DISCORD_BOT_INVITE } from "@/lib/constants";
import { MessageSquare, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleGetStarted = () => {
    window.open(DISCORD_BOT_INVITE, "_blank");
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const scrollToCommands = () => {
    const faqSection = document.getElementById("faq");
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-lg shadow-md"
          : "bg-black/10 backdrop-blur-sm"
      } border-b border-white/10`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold text-white">DeCommerce</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={scrollToFeatures}
          >
            Features
          </Button>
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={scrollToPricing}
          >
            Pricing
          </Button>
          <Button
            variant="ghost"
            className="text-white/70 hover:bg-white/10 hover:text-white w-full justify-start"
            onClick={scrollToCommands}
          >
            View Commands
          </Button>

          <Button
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "max-h-screen py-4" : "max-h-0 py-0"
        } overflow-hidden transition-all duration-300 ease-in-out bg-black/90 backdrop-blur-lg`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white w-full justify-start"
            onClick={scrollToFeatures}
          >
            Features
          </Button>
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white w-full justify-start"
            onClick={scrollToPricing}
          >
            Pricing
          </Button>
          <Button
            variant="ghost"
            className="text-white/70 hover:bg-white/10 hover:text-white w-full justify-start"
            onClick={scrollToCommands}
          >
            Commands
          </Button>
          <Button
            onClick={handleGetStarted}
            className="bg-primary hover:bg-primary/90 text-white w-full"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};
