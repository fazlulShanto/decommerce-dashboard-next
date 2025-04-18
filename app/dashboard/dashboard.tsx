"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import RightBar from "./rightBar"
import LeftBar from "./leftBar"
import Header from "./Header"
import AlertItem from "@/components/AlertItem"
import SystemOverview from "./SystemOverview"
import LoadingAnimation from "./LoadingAnimation"
import ParticleBackground from "./ParticleBackground"
import SecurityStatus from "./SecurityStatus"
import CommunicationsLog from "./CommunicationsLog"

export default function Dashboard() {
  const [securityLevel, setSecurityLevel] = useState(75)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`dark min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}
    >

      {/* Loading overlay */}
      <LoadingAnimation isLoading={isLoading} />

      <div className="container mx-auto p-4 relative z-10">
        {/* Header */}
        <Header />

        {/* Main content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <LeftBar />

          {/* Main dashboard */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7">
            <div className="grid gap-6">
              {/* System overview */}
              <SystemOverview />

              {/* Security & Alerts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SecurityStatus securityLevel={securityLevel} />

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                      System Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <AlertItem
                        title="Security Scan Complete"
                        time="14:32:12"
                        description="No threats detected in system scan"
                        type="info"
                      />
                      <AlertItem
                        title="Bandwidth Spike Detected"
                        time="13:45:06"
                        description="Unusual network activity on port 443"
                        type="warning"
                      />
                      <AlertItem
                        title="System Update Available"
                        time="09:12:45"
                        description="Version 12.4.5 ready to install"
                        type="update"
                      />
                      <AlertItem
                        title="Backup Completed"
                        time="04:30:00"
                        description="Incremental backup to drive E: successful"
                        type="success"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Communications */}
              <CommunicationsLog />
            </div>
          </div>

          {/* Right sidebar */}
          <RightBar />
        </div>
      </div>
    </div>
  )
}




