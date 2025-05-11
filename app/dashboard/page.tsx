import Dashboard from "./dashboard"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "DeCommerce Dashboard",
  description: "Monitor and manage your Discord store",
}

export default function DashboardPage() {
  return <Dashboard />
}
