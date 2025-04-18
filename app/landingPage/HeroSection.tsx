
import { Button } from "@/components/ui/button";
import { DISCORD_BOT_INVITE } from "@/lib/constants";
import { ShoppingBag, BarChart, CreditCard, LucideListOrdered } from "lucide-react";

export const HeroSection = () => {
  const handleGetStarted = () => {
    window.open(DISCORD_BOT_INVITE, "_blank");
  };    

  return (
    <div className="pt-32 pb-20 text-center relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Your Complete <span className="text-primary">Discord eCommerce</span> Solution
        </h1>
        <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
          Create and manage your store, handle products, process orders, and track sales - all within Discord. Start selling in minutes!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-primary text-md font-semibold hover:bg-primary/90" onClick={handleGetStarted}>
            Get Started Free
          </Button>
          <Button variant="outline" size="lg" className="bg-transparent border-white/40 hover:bg-white/10 text-md font-semibold" onClick={handleGetStarted}>
            Join Support Server
          </Button>

        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: ShoppingBag,
              title: "Easy Setup",
              description: "Setup your store and add products in minutes"
            },
            {
              icon: BarChart,
              title: "Sales Analytics",
              description: "Track your orders and analyze performance"
            },
            {
              icon: CreditCard,
              title: "Payments Details",
              description: "Multiple payment methods supported"
            }
          ].map((feature, index) => (
            <div key={index} className="p-6 rounded-xl bg-card border border-white/10 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
              <feature.icon className="w-10 h-10 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
