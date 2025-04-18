import { Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface SecurityStatusProps {
  securityLevel: number
}

export default function SecurityStatus({ securityLevel }: SecurityStatusProps) {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 flex items-center text-base">
          <Shield className="mr-2 h-5 w-5 text-green-500" />
          Security Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">Firewall</div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">Intrusion Detection</div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">Encryption</div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">Threat Database</div>
            <div className="text-sm text-cyan-400">
              Updated <span className="text-slate-500">12 min ago</span>
            </div>
          </div>

          <div className="pt-2 mt-2 border-t border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">Security Level</div>
              <div className="text-sm text-cyan-400">{securityLevel}%</div>
            </div>
            <Progress value={securityLevel} className="h-2 bg-slate-700">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                style={{ width: `${securityLevel}%` }}
              />
            </Progress>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 