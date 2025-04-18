import { Card } from "@/components/ui/card";
import { Store, Package, Users, DollarSign, LineChart, Lock, ChartNoAxesColumn, ChartNoAxesCombined } from "lucide-react";

export const FeatureSection = () => {
  const features = [
    {
      icon: Store,
      title: "Store Management",
      description: "Setup and manage your store with simple commands. Set your currency, Store manager role, and more.",
    },
    {
      icon: Package,
      title: "Product Management",
      description: "Add, update, and remove products easily. Manage inventory and pricing in real-time.",
    },
    {
      icon: Users,
      title: "Customer Orders",
      description: "Let customers browse your products and place orders directly through Discord.",
    },
    {
      icon: ChartNoAxesCombined,
      title: "Tracking System",
      description: "Track your orders and deliveries with a simple commands, both for you and your customers.",
    },
    {
      icon: LineChart,
      title: "Sales Analytics",
      description: "Analyze your sales performance with detailed statistics. Web Dashboard is available for more detailed analytics.",
    },
    {
      icon: Lock,
      title: "Multiple Payment Methods",
      description: "Set up multiple payment methods to suit your customers' preferences.",
    },
  ];

  return (
    <div id="features" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Everything You Need to <span className="text-primary">Sell on Discord</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-white/10 p-6">
              <feature.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};


