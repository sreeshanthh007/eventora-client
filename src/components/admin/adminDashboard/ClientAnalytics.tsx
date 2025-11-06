// Updated ClientAnalytics.tsx
import { motion } from "framer-motion"
import { Card } from "@/components/pages/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface ClientAnalyticsProps {
  analyticsData?: {
    totalClients?: number
    activeClients?: number
    blockedClients?: number
  }
}

export default function ClientAnalytics({ analyticsData }: ClientAnalyticsProps) {
  const totalClients = analyticsData?.totalClients || 0
  const activeClients = analyticsData?.activeClients || 0
  const blockedClients = analyticsData?.blockedClients || 0

  const CLIENT_ACTIVITY = [
    { name: "Active", value: activeClients, fill: "#10b981" },
    { name: "Blocked", value: blockedClients, fill: "#f59e0b" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Client Analytics</h2>
          <p className="text-slate-600">Understand your client base growth and engagement</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Total Clients</p>
            <p className="text-3xl font-bold text-blue-900">{totalClients.toLocaleString()}</p>
          </Card>
        </div>

        {/* Activity Status */}
        {activeClients + blockedClients > 0 && (
          <Card className="bg-white border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Activity Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={CLIENT_ACTIVITY}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {CLIENT_ACTIVITY.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>
    </motion.div>
  )
}