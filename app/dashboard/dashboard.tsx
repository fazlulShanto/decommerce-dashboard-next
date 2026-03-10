import Header from "./Header";
import { headers } from "next/headers"; // Add this import
import SystemOverview from "./SystemOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProcessRow from "@/components/ProcessRow";
import StorageItem from "@/components/StorageItem";
import { DecodedToken } from "@/lib/utils";
import { getOrderList, getProductList, getKnowledgeList } from "./dashboard.service";
import StoreProductTable from "./products";
import { DashboardDataTabs } from "./DataTabs";
import { Product } from "./products/product-columns";

// Function to get user info from headers
async function getUserInfo(): Promise<DecodedToken | null> {
  const headersList = await headers();
  const tokenInfo = headersList.get("x-token-info");

  if (tokenInfo) {
    try {
      return JSON.parse(tokenInfo);
    } catch (error) {
      console.error("Error parsing token info:");
      return null;
    }
  }
  return null;
}

export default async function Dashboard() {
  const userInfo = await getUserInfo();

  if (!userInfo) return null;

  const productList = (await getProductList(userInfo.guildId)) as unknown as Product[];
  const customerList = [];
  const ordersList = await getOrderList(userInfo.guildId);
  const knowledgeList = await getKnowledgeList(userInfo.guildId);

  return (
    <div
      className={`dark flex p-1 flex-col gap-1 h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}
    >
      <div className="p-2 border-b bg-gradient-to-br from-primary/30 to-slate-950 rounded-md">
        <Header />
      </div>
      <div className="flex-1 rounded-md overflow-auto px-4">
        <SystemOverview storeName={userInfo?.guildName ?? ""} />
        <DashboardDataTabs productList={productList} orderList={ordersList} knowledgeList={knowledgeList} guildId={userInfo.guildId} />
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
