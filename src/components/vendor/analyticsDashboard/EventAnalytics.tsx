import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, Calendar, Ticket, DollarSign } from "lucide-react"

interface EventAnalyticsProps {
  eventAnalytics?: {
    totalEvents: number
    upcomingEvents: number
    completedEvents: number
    cancelledEvents: number
    totalTicketsSold: number
    totalEventRevenue: number
  }
}

export function EventAnalytics({ eventAnalytics }: EventAnalyticsProps) {
  const eventData: Array<{ month: string; ticketsSold: number; eventRevenue: number }> = []

  const eventStats = eventAnalytics ? [
    {
      label: "Total Events",
      value: eventAnalytics.totalEvents.toString(),
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Upcoming Events",
      value: eventAnalytics.upcomingEvents.toString(),
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      label: "Tickets Sold",
      value: eventAnalytics.totalTicketsSold.toLocaleString(),
      icon: Ticket,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Event Revenue",
      value: `₹${eventAnalytics.totalEventRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "from-amber-500 to-amber-600",
    },
  ] : []

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Event Analytics</CardTitle>
          <CardDescription>Ticket sales and event revenue trends</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={eventData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis yAxisId="left" stroke="#64748b" />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="ticketsSold"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
                name="Tickets Sold"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="eventRevenue"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 4 }}
                name="Event Revenue"
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {eventStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider">{stat.label}</p>
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}