import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { motion } from "framer-motion"
import { TrendingUp, Calendar, Star, ShoppingCart } from "lucide-react"

interface OverviewProps {
  overview?: {
    totalRevenue: number
    totalBookings: number
    upcomingBookings: number
    upcomingEvents: number
    totalEvents: number
    averageRating: number
  }
}

export function OverviewCards({ overview }: OverviewProps) {
  const overviewData = overview ? [
    {
      title: "Total Revenue",
      value: `₹${overview.totalRevenue.toLocaleString()}`,
      change: "+0%",
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Bookings",
      value: overview.totalBookings.toLocaleString(),
      change: "+0%",
      icon: ShoppingCart,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Upcoming Bookings",
      value: overview.upcomingBookings.toLocaleString(),
      change: "+0%",
      icon: Calendar,
      color: "from-amber-500 to-amber-600",
    },
    {
      title: "Average Rating",
      value: overview.averageRating.toFixed(1),
      change: "+0.0",
      icon: Star,
      color: "from-purple-500 to-purple-600",
    },
  ] : []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {overviewData.map((item, index) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ translateY: -8 }}
          >
            <Card className="border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-sm font-medium text-slate-600">{item.title}</CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                  <p className="text-xs font-medium text-emerald-600">↑ {item.change} from last month</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}