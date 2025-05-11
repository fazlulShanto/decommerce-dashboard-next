import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Hexagon } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Hexagon className="h-8 w-8 text-cyan-500" />
        <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          DeCommerce Bot
        </span>
      </div>

      <div className="flex items-center space-x-6">
        <Avatar className="border border-blue-400">
          <AvatarImage
            src="https://cdn.discordapp.com/embed/avatars/1.png"
            alt="User"
          />
          <AvatarFallback className="bg-slate-700 text-cyan-500">
            BOT
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
