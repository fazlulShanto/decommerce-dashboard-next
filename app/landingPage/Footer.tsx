import Link from "next/link";
import { Button } from "@/components/ui/button";
import {  Github, Twitter, Mail } from "lucide-react";
import { DISCORD_BOT_INVITE, DISCORD_SUPPORT_SERVER_INVITE } from "@/lib/constants";
import Image from "next/image";
import logo from "@/public/icon-256.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex flex-col">
              <Image src={logo} alt="DeCommerce Logo" className="size-20" />
              <span className="text-lg font-bold text-white">DeCommerce</span>
            </div>
            <p className="text-white/70 text-sm">
              Supercharge your Discord server with our advanced commerce bot.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                className="text-white/60 hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="text-white/60 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:info@decommerce.com" 
                className="text-white/60 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-white/70 hover:text-primary text-sm transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-white/70 hover:text-primary text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/commands" className="text-white/70 hover:text-primary text-sm transition-colors">
                  Commands
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-white/70 hover:text-primary text-sm transition-colors">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/commands" className="text-white/70 hover:text-primary text-sm transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href={`${DISCORD_BOT_INVITE}`} className="text-white/70 hover:text-primary text-sm transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href={`${DISCORD_SUPPORT_SERVER_INVITE}`} className="text-white/70 hover:text-primary text-sm transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`${DISCORD_SUPPORT_SERVER_INVITE}`} className="text-white/70 hover:text-primary text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <div className="text-white/70 hover:text-primary text-sm transition-colors">
                  Privacy Policy
                </div>
              </li>
              <li>
                <div className="text-white/70 hover:text-primary text-sm transition-colors">
                  Terms of Service
                </div>
              </li>
              <li>
                <Link href={`${DISCORD_SUPPORT_SERVER_INVITE}`} className="text-white/70 hover:text-primary text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {currentYear} DeCommerce. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={() => window.open(DISCORD_BOT_INVITE, "_blank")}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Add to Discord
            </Button>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-white/80 text-xs flex items-center justify-center">
            Made with ❤️ for Discord communities
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
