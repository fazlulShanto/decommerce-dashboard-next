import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

function NavItem({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
    return (
      <Button
        variant="ghost"
        className={`w-full justify-start ${active ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
      >
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Button>
    )
  }

export default NavItem;