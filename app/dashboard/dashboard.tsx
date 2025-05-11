import Header from "./Header";
import { headers } from "next/headers"; // Add this import
import SystemOverview from "./SystemOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProcessRow from "@/components/ProcessRow";
import StorageItem from "@/components/StorageItem";
import { DecodedToken } from "@/lib/utils";
import { getProductList } from "./dashboard.service";
import StoreProductTable from "./products";

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
  const productList = await getProductList(userInfo.guildId);

  // console.log(productList);

  return (
    <div
      className={`dark flex p-1 flex-col gap-1 h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}
    >
      <div className="p-2 border-b bg-gradient-to-br from-primary/30 to-slate-950 rounded-md">
        <Header />
      </div>
      <div className="flex-1 border border-cyan-400/40 rounded-md overflow-auto">
        <SystemOverview />
        <div className="mt-8">
          <Tabs defaultValue="performance" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-slate-800/50 p-1">
                <TabsTrigger
                  value="order"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                >
                  Orders
                </TabsTrigger>
                <TabsTrigger
                  value="processes"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                >
                  Customers
                </TabsTrigger>
                <TabsTrigger
                  value="storage"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                >
                  Products
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="order" className="mt-0">
              <div className="h-auto w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden"></div>
              <StoreProductTable data={productList} />
            </TabsContent>

            <TabsContent value="processes" className="mt-0">
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

            <TabsContent value="storage" className="mt-0">
              <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <StorageItem
                    name="System Drive (C:)"
                    total={512}
                    used={324}
                    type="SSD"
                  />
                  <StorageItem
                    name="Data Drive (D:)"
                    total={2048}
                    used={1285}
                    type="HDD"
                  />
                  <StorageItem
                    name="Backup Drive (E:)"
                    total={4096}
                    used={1865}
                    type="HDD"
                  />
                  <StorageItem
                    name="External Drive (F:)"
                    total={1024}
                    used={210}
                    type="SSD"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
