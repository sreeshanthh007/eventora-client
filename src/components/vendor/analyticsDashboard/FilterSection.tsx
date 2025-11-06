// Updated FilterSection to handle period changes properly
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Button } from "@/components/pages/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"

type FilterPeriod = "today" | "week" | "month" | "year" | "custom"

interface FilterSectionProps {
  dateRange: { period: string; start: string; end: string }
  setDateRange: (range: any) => void
}

export function FilterSection({ dateRange, setDateRange }: FilterSectionProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<FilterPeriod>("month")
  const [showCustom, setShowCustom] = useState(false)

  const periods = ["today", "week", "month", "year", "custom"] as const

  const getDateRange = (period: FilterPeriod): { start: string; end: string } => {
    const today = new Date()
    let start: Date
    const end = today
    end.setHours(23, 59, 59, 999)

    switch (period) {
      case "today":
        start = new Date(today)
        start.setHours(0, 0, 0, 0)
        break
      case "week":
        start = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        start.setHours(0, 0, 0, 0)
        break
      case "month":
        start = new Date(today.getFullYear(), today.getMonth(), 1)
        start.setHours(0, 0, 0, 0)
        break
      case "year":
        start = new Date(today.getFullYear(), 0, 1)
        start.setHours(0, 0, 0, 0)
        break
      default:
        return { start: dateRange.start, end: dateRange.end }
    }

    return {
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0],
    }
  }

  const handlePeriodChange = (period: FilterPeriod) => {
    setSelectedPeriod(period)
    setShowCustom(period === "custom")
    const range = getDateRange(period)
    setDateRange({ period, ...range })
  }

  const handleDateChange = (field: "start" | "end", value: string) => {
    setDateRange({ ...dateRange, [field]: value })
  }

  return (
    <Card className="border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">Filter Analytics</CardTitle>
        <CardDescription>Select time period to view your analytics data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          {/* Period Selector */}
          <div className="flex gap-2 flex-wrap">
            {periods.map((period) => (
              <motion.button
                key={period}
                onClick={() => handlePeriodChange(period as FilterPeriod)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all capitalize ${
                  selectedPeriod === period
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {period}
              </motion.button>
            ))}
          </div>

          {/* Custom Date Inputs */}
          {showCustom && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3 flex-wrap sm:flex-nowrap w-full sm:w-auto"
            >
              <input
                type="date"
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dateRange.start}
                onChange={(e) => handleDateChange("start", e.target.value)}
              />
              <span className="text-slate-400 hidden sm:block">to</span>
              <input
                type="date"
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dateRange.end}
                onChange={(e) => handleDateChange("end", e.target.value)}
              />
            </motion.div>
          )}

          {/* Apply Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Apply Filter
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}