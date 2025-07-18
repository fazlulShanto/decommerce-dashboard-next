"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StoreProductTable from "./products";
import ProcessRow from "@/components/ProcessRow";
import StorageItem from "@/components/StorageItem";
import { Product } from "./products/product-columns";
import { FC, useEffect } from "react";
import { useQueryState } from "nuqs";
import StoreCustomerTable from "./customers";
import StoreOrdersTable from "./orders";
import { OrderData } from "@/models/order.dal";

interface DashboardDataTabsProps {
  productList: Product[];
  orderList: OrderData[];
}

const tabs = [
  { value: "orders", label: "Orders" },
  // { value: "customers", label: "Customers" },
  { value: "products", label: "Products" },
];

const defaultTab = "orders";

export const DashboardDataTabs: FC<DashboardDataTabsProps> = ({
  productList,
  orderList,
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
      <div className="flex items-center justify-between my-4">
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
        <StoreOrdersTable data={orderList} />
      </TabsContent>
      {/*
      <TabsContent value="customers" className="mt-0">
        <StoreCustomerTable data={productList} />
      </TabsContent> */}

      <TabsContent value="products" className="mt-0">
        <StoreProductTable data={productList} />
      </TabsContent>
    </Tabs>
  );
};
