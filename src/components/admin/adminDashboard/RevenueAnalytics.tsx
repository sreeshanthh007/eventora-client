
import { motion } from "framer-motion"
import { Card } from "@/components/pages/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { IndianRupeeIcon } from "lucide-react"


interface RevenueAnalyticsProps {
  analyticsData?: {
    totalRevenue?: number
    chartData?: Array<{ date: string; revenue: number }>
  }
  overviewData?: {
    totalRevenue?: number
  }
}

export default function RevenueAnalytics({ analyticsData, overviewData }: RevenueAnalyticsProps) {
  const chartData = (analyticsData?.chartData || []).map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: item.revenue,
  }))

  const totalRevenue = overviewData?.totalRevenue || analyticsData?.totalRevenue || 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Revenue Analytics</h2>
          <p className="text-slate-600">Track your total revenue</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
           <p className="text-3xl font-bold text-blue-900 flex items-center gap-1">
            <IndianRupeeIcon className="w-5 h-5" />
            {totalRevenue}
          </p>
          </Card>
        </div>

        {/* Chart */}
        {chartData.length > 0 && (
          <Card className="bg-white border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px", color: "#fff" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>
    </motion.div>
  )
}