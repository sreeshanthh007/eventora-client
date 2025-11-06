"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/pages/ui/table"
import { TrendingUp, Calendar, Star, AlertCircle } from "lucide-react"

import { OverviewCards } from "../../vendor/analyticsDashboard/OverviewCards"
import { EarningInsights } from "../../vendor/analyticsDashboard/EarningInsights"
import { BookingInsights } from "../../vendor/analyticsDashboard/BookingInsights"
import { RatingsInsights } from "../../vendor/analyticsDashboard/RatingsInsights"
import { ServiceStatusInsights } from "../../vendor/analyticsDashboard/ServiceStatusInsights"

export function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [dateFilter, setDateFilter] = useState("month")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">


      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Overview Cards */}
        <OverviewCards />

        {/* Detailed Insights Tabs */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Earnings</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="ratings" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span className="hidden sm:inline">Ratings</span>
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Services</span>
              </TabsTrigger>
            </TabsList>

            {/* Earnings Tab */}
            <TabsContent value="overview" className="space-y-6">
              <EarningInsights dateFilter={dateFilter} setDateFilter={setDateFilter} />
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <BookingInsights />
            </TabsContent>

            {/* Ratings Tab */}
            <TabsContent value="ratings" className="space-y-6">
              <RatingsInsights />
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <ServiceStatusInsights />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
