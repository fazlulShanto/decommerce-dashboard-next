"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BadgeDollarSign,
  Package,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "@/components/MetricCard";
import { useState } from "react";

export default function SystemOverview({ storeName }: { storeName: string }) {
  const [cpuUsage, setCpuUsage] = useState(42);
  const [memoryUsage, setMemoryUsage] = useState(68);
  const [networkStatus, setNetworkStatus] = useState(92);
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="border-b border-slate-700/50 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center">
            <ShoppingBasket className="mr-2 h-5 w-5 text-cyan-500" />
            <span className="bg-gradient-to-r bg-clip-text text-transparent from-cyan-400 to-green-500 mr-2">
              {storeName}
            </span>{" "}
            store Overview
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
              Last Updated: 10 minutes ago
            </Badge>
            <Button variant="outline" className="h-8 w-fit text-slate-400">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Products"
            value={cpuUsage}
            icon={Package}
            color="cyan"
            detail=""
          />
          <MetricCard
            title="Total Orders"
            value={memoryUsage}
            icon={ShoppingBag}
            trend="up"
            color="purple"
            detail="+2 orders this month"
          />
          <MetricCard
            title="Total Sales"
            value={networkStatus}
            icon={BadgeDollarSign}
            trend="down"
            color="blue"
            detail="+$125.34 this month"
          />
        </div>
      </CardContent>
    </Card>
  );
}
