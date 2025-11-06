

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import BackToTop from "../ui/back-to-top"
import SummaryCards from "@/components/admin/adminDashboard/SummaryCards"
import RevenueAnalytics from "@/components/admin/adminDashboard/RevenueAnalytics"
import VendorAnalytics from "@/components/admin/adminDashboard/VendorAnalytics"
import ClientAnalytics from "@/components/admin/adminDashboard/ClientAnalytics"
import CategoryInsights from "@/components/admin/adminDashboard/CategoryInsights"
import GlobalFilters from "@/components/admin/adminDashboard/Globalfilters"
import { AppSidebar } from "@/components/mainComponents/AdminSidebar"
import { SidebarProvider } from "../ui/sidebar"
import { UsegetAdminAnalyticsDashboard } from "@/hooks/admin/UseGetAdminAnalyticsDashboard"

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("summary")
  const [filterData, setFilterData] = useState({ period: "month", startDate: null, endDate: null })
  const sectionRefs = {
    revenue: useRef(null),
    vendor: useRef(null),
    client: useRef(null),
    category: useRef(null),
  }

  const { data: analyticsResponse, isLoading } = UsegetAdminAnalyticsDashboard({
    period: filterData.period,
    startDate: filterData.startDate || undefined,
    endDate: filterData.endDate || undefined,
  })

  const analyticsData = analyticsResponse?.analyticsData?.data

  const handleCardClick = (section: string) => {
    setActiveSection(section)
    const ref = sectionRefs[section as keyof typeof sectionRefs]
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleFilterApply = (data: any) => {
    setFilterData(data)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
        <SidebarProvider>
          <AppSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <motion.header className="sticky top-0 z-40 bg-white border-b border-blue-100 shadow-sm">
              <div className="px-6 py-6 lg:px-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Analytics Dashboard</h1>
                <GlobalFilters onFilterApply={handleFilterApply} />
              </div>
            </motion.header>
            <main className="flex-1 overflow-y-auto px-6 py-8 lg:px-8 space-y-12 w-full">
              <div className="text-center py-12">Loading dashboard data...</div>
            </main>
          </div>
        </SidebarProvider>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      <SidebarProvider>
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sticky Header */}
          <motion.header
            className="sticky top-0 z-40 bg-white border-b border-blue-100 shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-6 py-6 lg:px-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Admin Analytics Dashboard</h1>
              <GlobalFilters onFilterApply={handleFilterApply} />
            </div>
          </motion.header>

          {/* Scrollable Main Content */}
          <main className="flex-1 overflow-y-auto px-6 py-8 lg:px-8 space-y-12 w-full">
            {/* Summary Cards Section */}
            <SummaryCards 
              onCardClick={handleCardClick} 
              activeSection={activeSection} 
              analyticsData={analyticsData?.overview} 
            />

            {/* Revenue Analytics */}
            <div ref={sectionRefs.revenue}>
              <RevenueAnalytics 
                analyticsData={analyticsData?.revenue} 
                overviewData={analyticsData?.overview} 
              />
            </div>

            {/* Vendor Analytics */}
            <div ref={sectionRefs.vendor}>
              <VendorAnalytics 
                analyticsData={analyticsData?.vendorStats} 
                topVendors={analyticsData?.vendorStats?.topVendors} 
              />
            </div>

            {/* Client Analytics */}
            <div ref={sectionRefs.client}>
              <ClientAnalytics 
                analyticsData={analyticsData?.clientStats} 
              />
            </div>

            {/* Category Insights */}
            <div ref={sectionRefs.category}>
              <CategoryInsights 
                analyticsData={analyticsData?.categoryInsights} 
              />
            </div>
          </main>

          {/* Back to Top Button */}
          <BackToTop />
        </div>
      </SidebarProvider>
    </div>
  )
}