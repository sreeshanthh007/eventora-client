
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card } from "@/components/pages/ui/card"

interface SummaryCardsProps {
  onCardClick: (section: string) => void
  activeSection: string
  analyticsData?: {
    totalClients?: number
    totalVendors?: number
    verifiedVendors?: number
    blockedVendors?: number
    totalCategories?: number
    totalRevenue?: number
  }
}

export default function SummaryCards({ onCardClick, activeSection, analyticsData }: SummaryCardsProps) {
  const SUMMARY_DATA = [
    {
      id: "clients",
      label: "Total Clients",
      value: analyticsData?.totalClients?.toLocaleString() || "0",
      change: "+15.2%",
      isPositive: true,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "vendors",
      label: "Total Vendors",
      value: analyticsData?.totalVendors?.toLocaleString() || "0",
      change: "+8.5%",
      isPositive: true,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      id: "verified",
      label: "Verified Vendors",
      value: analyticsData?.verifiedVendors?.toLocaleString() || "0",
      change: "+22.1%",
      isPositive: true,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "categories",
      label: "Total Categories",
      value: analyticsData?.totalCategories?.toLocaleString() || "0",
      change: "+4.2%",
      isPositive: true,
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "revenue",
      label: "Total Revenue",
      value: `${(analyticsData?.totalRevenue || 0).toLocaleString()}`,
      change: "+32.5%",
      isPositive: true,
      color: "from-rose-500 to-rose-600",
    },
  ]

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, staggerChildren: 0.1 }}
    >
      {SUMMARY_DATA.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02 }}
          onClick={() =>
            onCardClick(
              item.id === "revenue"
                ? "revenue"
                : item.id === "vendors"
                  ? "vendor"
                  : item.id === "clients"
                    ? "client"
                    : "category",
            )
          }
          className="cursor-pointer group"
        >
          <Card className="relative overflow-hidden h-full bg-white hover:shadow-lg transition-all duration-300 border border-blue-100">
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            ></div>

            <div className="relative p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-slate-600">{item.label}</h3>
                <div className={`flex items-center gap-1 ${item.isPositive ? "text-emerald-600" : "text-red-600"}`}>
                  {item.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span className="text-xs font-semibold">{item.change}</span>
                </div>
              </div>

              <p className="text-3xl font-bold text-slate-900 mb-2">{item.value}</p>

              <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.2 + index * 0.05, duration: 0.8 }}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}