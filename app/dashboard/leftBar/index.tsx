"use client";

import { useEffect, useState } from "react";
import {
    Activity, Command, Database, Globe, MessageSquare, Settings,
    Shield, Terminal
} from "lucide-react";

import {
    Card,
    CardContent
} from "@/components/ui/card";
import NavItem from "@/components/NavItem";
import StatusItem from "@/components/StatusItem";

export default function LeftBar() {
  const [systemStatus, setSystemStatus] = useState(85);
  const [cpuUsage, setCpuUsage] = useState(42);
  const [memoryUsage, setMemoryUsage] = useState(68);
  const [networkStatus, setNetworkStatus] = useState(92);
  const [securityLevel, setSecurityLevel] = useState(75);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 30);
      setMemoryUsage(Math.floor(Math.random() * 20) + 60);
      setNetworkStatus(Math.floor(Math.random() * 15) + 80);
      setSystemStatus(Math.floor(Math.random() * 10) + 80);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="col-span-12 md:col-span-3 lg:col-span-2">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
        <CardContent className="p-4">
          <nav className="space-y-2">
            <NavItem icon={Command} label="Dashboard" active />
            <NavItem icon={Activity} label="Diagnostics" />
            <NavItem icon={Database} label="Data Center" />
            <NavItem icon={Globe} label="Network" />
            <NavItem icon={Shield} label="Security" />
            <NavItem icon={Terminal} label="Console" />
            <NavItem icon={MessageSquare} label="Communications" />
            <NavItem icon={Settings} label="Settings" />
          </nav>

          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <div className="text-xs text-slate-500 mb-2 font-mono">
              SYSTEM STATUS
            </div>
            <div className="space-y-3">
              <StatusItem
                label="Core Systems"
                value={systemStatus}
                color="cyan"
              />
              <StatusItem
                label="Security"
                value={securityLevel}
                color="green"
              />
              <StatusItem label="Network" value={networkStatus} color="blue" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
