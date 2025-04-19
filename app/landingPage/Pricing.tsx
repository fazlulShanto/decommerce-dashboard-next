import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import {
  DISCORD_BOT_INVITE,
  DISCORD_SUPPORT_SERVER_INVITE,
} from "@/lib/constants";
export const PricingSection = () => {
  const handleGetStarted = () => {
    window.open(DISCORD_BOT_INVITE, "_blank");
  };

  const handleJoinSupportServer = () => {
    window.open(DISCORD_SUPPORT_SERVER_INVITE, "_blank");
  };
  const renderFreePricingCard = () => {
    return (
      <div className="p-8 relative rounded-xl border bg-card border-white/10">
        <h3 className="text-2xl font-bold text-white mt-4">Free Trial</h3>
        <div className="mt-4 mb-2">
          <span className="text-4xl font-bold text-white">Free</span>
          <span className="text-white/70">/3 Days</span>
        </div>

        <ul className="space-y-4 mt-12">
          <li className="flex items-center text-white">
            <Check className="w-5 h-5 text-primary mr-2" />
            Store Setup
          </li>
          <li className="flex items-center text-white">
            <Check className="w-5 h-5 text-primary mr-2" />
            Product Management
          </li>
          <li className="flex items-center text-white">
            <Check className="w-5 h-5 text-primary mr-2" />
            Order Tracking
          </li>
          <li className="flex items-center text-white">
            <Check className="w-5 h-5 text-primary mr-2" />
            Basic Analytics
          </li>
        </ul>
        <Button
          onClick={handleGetStarted}
          className="sm:absolute w-full mt-8 mx-auto sm:bottom-8 sm:w-4/5 sm:left-1/2 sm:-translate-x-1/2 bg-white/10 hover:bg-white/20"
        >
          Start Trial
        </Button>
      </div>
    );
  };

  const renderPremiumPricingCard = () => {
    return (
      <div className="p-8 rounded-xl border bg-primary/10 border-primary">
        <div className="border rounded-full px-3 py-1 border-primary/50 w-fit">
          <span className="text-xs flex w-fit font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text  text-transparent">
            <Sparkles className="w-4 h-4 mr-2 text-emerald-300" />
            MOST POPULAR
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white mt-4">Premium</h3>
        <div className="mt-4 mb-2">
          <span className="text-4xl font-bold text-white">$1</span>
          <span className="text-white/70">/per month</span>
        </div>
        <div className="text-sm text-white/70 mb-6">or $10/year</div>
        <ul className="space-y-4 mb-8">
          <li className="flex items-center text-white">
            <Check className="w-5 h-5 text-primary mr-2" />
            Everything in Free Trial
          </li>
          <li className="flex items-center text-white">
            <Check className="w-5 h-5 text-primary mr-2" />
            Advanced Analytics(Web Dashboard)
          </li>
          <li className="flex items-center text-white">
            <Check className="w-5 h-5 text-primary mr-2" />
            High Priority Support
          </li>
          <li className="flex items-center text-white">
            <Check className="w-5 h-5 text-primary mr-2" />
            Unlimited Products/orders
          </li>
        </ul>
        <Button
          onClick={handleJoinSupportServer}
          className="w-full bg-primary font-semibold hover:bg-primary/90"
        >
          Get Premium
        </Button>
      </div>
    );
  };

  return (
    <div id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Simple, Transparent <span className="text-primary">Pricing</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {renderFreePricingCard()}
          {renderPremiumPricingCard()}
        </div>
      </div>
    </div>
  );
};
