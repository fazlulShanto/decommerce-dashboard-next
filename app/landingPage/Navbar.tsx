
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold text-white">DeCommerce</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white/70 hover:text-white">Features</Button>
          <Button variant="ghost" className="text-white/70 hover:text-white">Pricing</Button>
        </div>
      </div>
    </nav>
  );
};
