import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const PricingSection = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Simple, Transparent <span className="text-primary">Pricing</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "Free Trial",
              price: "Free",
              duration: "3 Days",
              features: [
                "Full Store Setup",
                "Product Management",
                "Basic Analytics",
                "Customer Orders",
                "Single Currency",
              ],
              button: "Start Trial",
              popular: false,
            },
            {
              title: "Premium",
              price: "$1",
              duration: "per month",
              yearlyPrice: "or $10/year",
              features: [
                "Everything in Free Trial",
                "Advanced Analytics",
                "Multiple Currencies",
                "Priority Support",
                "Unlimited Products",
              ],
              button: "Get Premium",
              popular: true,
            },
          ].map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl border ${
                plan.popular
                  ? "bg-primary/10 border-primary"
                  : "bg-card border-white/10"
              }`}
            >
              {plan.popular && (
                <span className="text-xs font-semibold text-primary bg-primary/20 px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              )}
              <h3 className="text-2xl font-bold text-white mt-4">{plan.title}</h3>
              <div className="mt-4 mb-2">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-white/70">/{plan.duration}</span>
              </div>
              {plan.yearlyPrice && (
                <div className="text-sm text-white/70 mb-6">{plan.yearlyPrice}</div>
              )}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-white">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {plan.button}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
