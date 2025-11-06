import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

interface BookingAnalyticsProps {
  bookingAnalytics?: {
    completed: number
    ongoing: number
    cancelled: number
    pending: number
  }
}

export function BookingAnalytics({ bookingAnalytics }: BookingAnalyticsProps) {
  const data = bookingAnalytics ? [
    { name: "Completed", value: bookingAnalytics.completed, fill: "#10b981" },
    { name: "Ongoing", value: bookingAnalytics.ongoing, fill: "#3b82f6" },
    { name: "Pending", value: bookingAnalytics.pending, fill: "#f59e0b" },
    { name: "Cancelled", value: bookingAnalytics.cancelled, fill: "#ef4444" },
  ] : []

  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Booking Analytics</CardTitle>
          <CardDescription>Booking status distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pie Chart */}
            <div className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} bookings`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Summary */}
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-600 uppercase tracking-wider mb-1 font-semibold">Total Bookings</p>
                <p className="text-3xl font-bold text-slate-900">{total.toLocaleString()}</p>
              </div>

              {data.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-semibold text-slate-900">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}