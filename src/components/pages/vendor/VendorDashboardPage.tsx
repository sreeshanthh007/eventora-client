import { motion } from "framer-motion"
import { FilterSection } from "@/components/vendor/analyticsDashboard/FilterSection"
import { OverviewCards } from "@/components/vendor/analyticsDashboard/OverviewCards"
import { RevenueAnalytics } from "@/components/vendor/analyticsDashboard/RevenueAnalytics"
import { ServicePerformance } from "@/components/vendor/analyticsDashboard/ServicePerformance"
import { BookingAnalytics } from "@/components/vendor/analyticsDashboard/BookingAnalytics"
import { EventAnalytics } from "@/components/vendor/analyticsDashboard/EventAnalytics"
import { RatingInsights } from "@/components/vendor/analyticsDashboard/RatingInsights"
import { UpcomingEvents } from "@/components/vendor/analyticsDashboard/UpcomingEvents"
import { useState } from "react"
import { VendorLayout } from "@/components/layouts/VendorLayout"
import { useGetVenodorAnalyticsDashboard } from "@/hooks/vendor/UseGetVendorAnalyticsDashboard"
import type { AnalyticsData } from "@/types/analytics" // Adjust import path as needed

export function VendorAnalyticsDashboardPage() {
  const [dateRange, setDateRange] = useState({ period: "month", start: "", end: "" })

  const { data: analyticsResponse, isLoading } = useGetVenodorAnalyticsDashboard({
    period: dateRange.period,
    startDate: dateRange.start,
    endDate: dateRange.end,
  })

  const analytics: AnalyticsData | undefined = analyticsResponse?.analytics?.data

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  if (isLoading) {
    return (
      <VendorLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg text-slate-600">Loading analytics...</div>
        </div>
      </VendorLayout>
    )
  }

  return (
    <VendorLayout>
      <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-b border-slate-200 bg-white/80 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Vendor Analytics Dashboard
            </h1>
            <p className="text-slate-600 mt-1">Track your business performance and insights</p>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.main
          className="max-w-7xl mx-auto px-6 py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Filter Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <FilterSection dateRange={dateRange} setDateRange={setDateRange} />
          </motion.div>

          {/* Overview Cards */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <OverviewCards overview={analytics?.overview} />
          </motion.div>

          {/* Revenue Analytics */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <RevenueAnalytics revenue={analytics?.revenue} />
          </motion.div>

          {/* Service Performance */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <ServicePerformance servicePerformance={analytics?.servicePerformance || []} />
          </motion.div>

          {/* Booking Analytics */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <BookingAnalytics bookingAnalytics={analytics?.bookingAnalytics} />
          </motion.div>

          {/* Event Analytics */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <EventAnalytics eventAnalytics={analytics?.eventAnalytics} />
          </motion.div>

          {/* Rating Insights */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <RatingInsights ratingInsights={analytics?.ratingInsights} />
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="mt-8 pb-12"
          >
            <UpcomingEvents />
          </motion.div>
        </motion.main>
      </div>
    </VendorLayout>
  )
}