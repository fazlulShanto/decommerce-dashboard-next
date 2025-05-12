"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StoreProductTable from "./products";
import ProcessRow from "@/components/ProcessRow";
import StorageItem from "@/components/StorageItem";
import { Product } from "./products/product-columns";
import { FC, useEffect } from "react";
import { useQueryState } from "nuqs";

interface DashboardDataTabsProps {
  productList: Product[];
}

const tabs = [
  { value: "orders", label: "Orders" },
  { value: "customers", label: "Customers" },
  { value: "products", label: "Products" },
];

const defaultTab = "orders";

export const DashboardDataTabs: FC<DashboardDataTabsProps> = ({
  productList,
}) => {
  const [tab, setTab] = useQueryState("tab", {
    defaultValue: defaultTab,
    clearOnDefault: false,
  });

  useEffect(() => {
    if (!tab) {
      setTab(defaultTab);
    }
  }, []);

  return (
    <Tabs defaultValue={"order"} value={tab} className="w-full">
      <div className="flex items-center justify-between mb-4">
        <TabsList className="bg-slate-800/50 p-1">
          {tabs.map((tab) => (
            <TabsTrigger
              value={tab.value}
              key={tab.value}
              onClick={() => setTab(tab.value)}
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value="orders" className="mt-0">
        Order list
      </TabsContent>

      <TabsContent value="customers" className="mt-0">
        <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
          <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
            <div className="col-span-1">PID</div>
            <div className="col-span-4">Process</div>
            <div className="col-span-2">User</div>
            <div className="col-span-2">CPU</div>
            <div className="col-span-2">Memory</div>
            <div className="col-span-1">Status</div>
          </div>

          <div className="divide-y divide-slate-700/30">
            <ProcessRow
              pid="1024"
              name="system_core.exe"
              user="SYSTEM"
              cpu={12.4}
              memory={345}
              status="running"
            />
            <ProcessRow
              pid="1842"
              name="nexus_service.exe"
              user="SYSTEM"
              cpu={8.7}
              memory={128}
              status="running"
            />
            <ProcessRow
              pid="2156"
              name="security_monitor.exe"
              user="ADMIN"
              cpu={5.2}
              memory={96}
              status="running"
            />
            <ProcessRow
              pid="3012"
              name="network_manager.exe"
              user="SYSTEM"
              cpu={3.8}
              memory={84}
              status="running"
            />
            <ProcessRow
              pid="4268"
              name="user_interface.exe"
              user="USER"
              cpu={15.3}
              memory={256}
              status="running"
            />
            <ProcessRow
              pid="5124"
              name="data_analyzer.exe"
              user="ADMIN"
              cpu={22.1}
              memory={512}
              status="running"
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="products" className="mt-0">
        <StoreProductTable data={productList} />
      </TabsContent>
    </Tabs>
  );
};
