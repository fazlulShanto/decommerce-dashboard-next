"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import StoreAgentConfig from "@/app/dashboard/agent-config";
import { AgentConfig } from "@/models/aiAgentConfig.dal";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AgentConfigSheetProps {
  config: AgentConfig;
  guildId: string;
}

export default function AgentConfigSheet({ config, guildId }: AgentConfigSheetProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white border-slate-600 shadow-md">
                    <Settings size={18} />
                    <span className="font-semibold hidden sm:inline">Agent Config</span>
                </Button>
            </SheetTrigger>
            <SheetContent 
                className="w-full sm:max-w-2xl md:max-w-4xl flex flex-col p-0 bg-black/95 backdrop-blur-md border-l border-slate-800 lg:max-w-4xl"
                side="right"
            >
                <ScrollArea className="flex-1 p-6 h-full w-full">
                    <StoreAgentConfig config={config} guildId={guildId} />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
