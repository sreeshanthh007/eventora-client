import { useState } from "react"
import { Download } from "lucide-react"
import { motion } from "framer-motion"
import jsPDF from "jspdf"

// Vendor Analytics Data Interface
interface VendorAnalyticsData {
  overview?: {
    totalRevenue: number
    totalBookings: number
    upcomingBookings: number
    upcomingEvents: number
    totalEvents: number
    averageRating: number
  }
  revenue?: {
    totalRevenue: number
    chartData: Array<{ date: string; revenue: number }>
  }
  servicePerformance?: Array<{
    totalBookings: number
    revenue: number
    serviceTitle: string
    averageRating: number
    status: string
  }>
  bookingAnalytics?: {
    completed: number
    ongoing: number
    cancelled: number
    pending: number
  }
  eventAnalytics?: {
    totalEvents: number
    upcomingEvents: number
    completedEvents: number
    cancelledEvents: number
    totalTicketsSold: number
    totalEventRevenue: number
  }
  ratingInsights?: {
    average: number
    totalReviews: number
    distribution: { [key: string]: number }
  }
}

// Admin Analytics Data Interface
interface AdminAnalyticsData {
  overview?: {
    totalClients?: number
    totalVendors?: number
    verifiedVendors?: number
    blockedVendors?: number
    totalCategories?: number
    totalRevenue?: number
  }
  revenue?: {
    totalRevenue?: number
    chartData?: Array<{ date: string; revenue: number }>
  }
  vendorStats?: {
    totalVendors?: number
    verifiedVendors?: number
    unverifiedVendors?: number
    activeVendors?: number
    blockedVendors?: number
    topVendors?: Array<{
      name: string
      revenue: number
      percentage: string
    }>
  }
  clientStats?: {
    totalClients?: number
    activeClients?: number
    blockedClients?: number
  }
  categoryInsights?: Array<{
    categoryName: string
    revenue: number
    percentageOfTotal: number
    growth: string
  }>
}

interface DownloadPDFButtonProps {
  analytics?: VendorAnalyticsData | AdminAnalyticsData
  dateRange: { period: string; start: string; end: string }
  dashboardType: "vendor" | "admin"
}

export function DownloadAnalyticsPDFButton({ 
  analytics, 
  dateRange, 
  dashboardType 
}: DownloadPDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateVendorPDF = (pdf: jsPDF, data: VendorAnalyticsData) => {
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 15
    let yPosition = 50

    const valueX = pageWidth - margin
    const labelX = margin

    const checkAndAddPage = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin
        return true
      }
      return false
    }

    const addSectionTitle = (title: string) => {
      checkAndAddPage(15)
      pdf.setFillColor(59, 130, 246)
      pdf.rect(margin, yPosition, pageWidth - 2 * margin, 10, "F")
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(14)
      pdf.setFont(undefined, "bold")
      pdf.text(title, margin + 3, yPosition + 7)
      yPosition += 15
      pdf.setTextColor(0, 0, 0)
    }

    const printKeyValuePair = (label: string, value: string) => {
      checkAndAddPage(10)
      pdf.setFont(undefined, "bold")
      pdf.text(label + ":", labelX, yPosition)
      pdf.setFont(undefined, "normal")

      if (value.startsWith("₹")) {
        const symbol = "₹"
        const numberStr = value.slice(1)
        const numberWidth = pdf.getTextWidth(numberStr)
        pdf.text(numberStr, valueX, yPosition, { align: "right" })
        pdf.text(symbol, valueX - numberWidth - 1, yPosition)
      } else {
        pdf.text(value, valueX, yPosition, { align: "right" })
      }
      yPosition += 8
    }

    // Overview Section
    if (data?.overview) {
      addSectionTitle("Overview")
      const overview = data.overview
      const overviewData = [
        ["Total Revenue", `₹${overview.totalRevenue.toLocaleString('en-IN')}`],
        ["Total Bookings", overview.totalBookings.toLocaleString('en-IN')],
        ["Upcoming Bookings", overview.upcomingBookings.toLocaleString('en-IN')],
        ["Average Rating", `${overview.averageRating.toFixed(1)} ⭐`],
      ]

      pdf.setFontSize(11)
      overviewData.forEach(([label, value]) => {
        printKeyValuePair(label, value)
      })
      yPosition += 5
    }


    if (data?.revenue) {
      addSectionTitle("Revenue Analytics")
      pdf.setFontSize(11)
      pdf.setFont(undefined, "bold")
      pdf.text("Total Revenue:", labelX, yPosition)
      pdf.setFont(undefined, "normal")

     
      const symbol = "₹"
      const numberStr = data.revenue.totalRevenue.toLocaleString('en-IN')
      const numberWidth = pdf.getTextWidth(numberStr)
      pdf.text(numberStr, valueX, yPosition, { align: "right" })
      pdf.text(symbol, valueX - numberWidth - 1, yPosition)
      yPosition += 10

      if (data.revenue.chartData.length > 0) {
        pdf.setFont(undefined, "bold")
        pdf.text("Revenue Breakdown:", labelX, yPosition)
        yPosition += 8
        pdf.setFont(undefined, "normal")
        pdf.setFontSize(10)

        data.revenue.chartData.slice(-10).forEach((item) => {
          checkAndAddPage(7)
          const date = new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
          pdf.text(`${date}: ₹${item.revenue.toLocaleString('en-IN')}`, margin + 5, yPosition)
          yPosition += 6
        })
      }
      yPosition += 5
    }

    // Service Performance
    if (data?.servicePerformance && data.servicePerformance.length > 0) {
      addSectionTitle("Service Performance")
      pdf.setFontSize(10)

      const serviceLeft = margin + 2
      const bookingsRight = margin + 95
      const revenueRight = margin + 130
      const ratingLeft = margin + 132

      checkAndAddPage(40)
      pdf.setFillColor(241, 245, 249)
      pdf.rect(margin, yPosition, pageWidth - 2 * margin, 8, "F")
      pdf.setFont(undefined, "bold")
      pdf.text("Service", serviceLeft, yPosition + 5)
      pdf.text("Bookings", bookingsRight, yPosition + 5, { align: "right" })
      pdf.text("Revenue", revenueRight, yPosition + 5, { align: "right" })
      pdf.text("Rating", ratingLeft, yPosition + 5)
      yPosition += 10

      pdf.setFont(undefined, "normal")
      data.servicePerformance.forEach((service, index) => {
        checkAndAddPage(8)
        if (index % 2 === 0) {
          pdf.setFillColor(249, 250, 251)
          pdf.rect(margin, yPosition - 3, pageWidth - 2 * margin, 7, "F")
        }
        pdf.text(service.serviceTitle.substring(0, 25), serviceLeft, yPosition + 2)
        pdf.text(service.totalBookings.toLocaleString('en-IN'), bookingsRight, yPosition + 2, { align: "right" })

        const revNumberStr = service.revenue.toLocaleString('en-IN')
        const revNumberWidth = pdf.getTextWidth(revNumberStr)
        pdf.text(revNumberStr, revenueRight, yPosition + 2, { align: "right" })
        pdf.text("₹", revenueRight - revNumberWidth - 1, yPosition + 2)

        pdf.text(`${service.averageRating.toFixed(1)} ⭐`, ratingLeft, yPosition + 2)
        yPosition += 7
      })
      yPosition += 5
    }

    // Booking Analytics
    if (data?.bookingAnalytics) {
      addSectionTitle("Booking Analytics")
      const bookings = data.bookingAnalytics
      const total = bookings.completed + bookings.ongoing + bookings.cancelled + bookings.pending
      const bookingData = [
        ["Completed", bookings.completed],
        ["Ongoing", bookings.ongoing],
        ["Pending", bookings.pending],
        ["Cancelled", bookings.cancelled],
      ]

      pdf.setFontSize(11)
      pdf.setFont(undefined, "bold")
      pdf.text(`Total Bookings: ${total.toLocaleString('en-IN')}`, labelX, yPosition)
      yPosition += 10
      pdf.setFont(undefined, "normal")

      bookingData.forEach(([status, count]) => {
        checkAndAddPage(8)
        const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0.0
        pdf.text(`${status}: ${count.toLocaleString('en-IN')} (${percentage}%)`, margin + 5, yPosition)
        yPosition += 7
      })
      yPosition += 5
    }

    // Event Analytics
    if (data?.eventAnalytics) {
      addSectionTitle("Event Analytics")
      const events = data.eventAnalytics
      const eventData = [
        ["Total Events", events.totalEvents.toLocaleString('en-IN')],
        ["Upcoming Events", events.upcomingEvents.toLocaleString('en-IN')],
        ["Completed Events", events.completedEvents.toLocaleString('en-IN')],
        ["Cancelled Events", events.cancelledEvents.toLocaleString('en-IN')],
        ["Total Tickets Sold", events.totalTicketsSold.toLocaleString('en-IN')],
        ["Event Revenue", `₹${events.totalEventRevenue.toLocaleString('en-IN')}`],
      ]

      pdf.setFontSize(11)
      eventData.forEach(([label, value]) => {
        checkAndAddPage(8)
        pdf.setFont(undefined, "bold")
        pdf.text(label + ":", labelX, yPosition)
        printKeyValuePair("", value) // Reuse but without label
        yPosition += 8
      })
      yPosition += 5
    }

    // Rating Insights
    if (data?.ratingInsights) {
      addSectionTitle("Rating Insights")
      const ratings = data.ratingInsights
      pdf.setFontSize(11)
      pdf.setFont(undefined, "bold")
      pdf.text("Average Rating:", labelX, yPosition)
      pdf.setFont(undefined, "normal")
      pdf.text(`${ratings.average.toFixed(1)} ⭐`, valueX, yPosition, { align: "right" })
      yPosition += 8

      pdf.setFont(undefined, "bold")
      pdf.text("Total Reviews:", labelX, yPosition)
      pdf.setFont(undefined, "normal")
      pdf.text(ratings.totalReviews.toLocaleString('en-IN'), valueX, yPosition, { align: "right" })
      yPosition += 10

      pdf.setFont(undefined, "bold")
      pdf.text("Rating Distribution:", labelX, yPosition)
      yPosition += 8
      pdf.setFont(undefined, "normal")

      for (let i = 5; i >= 1; i--) {
        checkAndAddPage(7)
        const count = ratings.distribution[i.toString()] || 0
        const percentage = ratings.totalReviews > 0 ? ((count / ratings.totalReviews) * 100).toFixed(1) : "0.0"
        pdf.text(`${i} ⭐: ${count.toLocaleString('en-IN')} reviews (${percentage}%)`, margin + 5, yPosition)
        yPosition += 7
      }
    }
  }

  const generateAdminPDF = (pdf: jsPDF, data: AdminAnalyticsData) => {
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 15
    let yPosition = 50

    const valueX = pageWidth - margin
    const labelX = margin

    const checkAndAddPage = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin
        return true
      }
      return false
    }

    const addSectionTitle = (title: string) => {
      checkAndAddPage(15)
      pdf.setFillColor(59, 130, 246)
      pdf.rect(margin, yPosition, pageWidth - 2 * margin, 10, "F")
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(14)
      pdf.setFont(undefined, "bold")
      pdf.text(title, margin + 3, yPosition + 7)
      yPosition += 15
      pdf.setTextColor(0, 0, 0)
    }

    const printKeyValuePair = (label: string, value: string) => {
      checkAndAddPage(10)
      pdf.setFont(undefined, "bold")
      pdf.text(label + ":", labelX, yPosition)
      pdf.setFont(undefined, "normal")

      if (value.startsWith("₹")) {
        const symbol = "₹"
        const numberStr = value.slice(1)
        const numberWidth = pdf.getTextWidth(numberStr)
        pdf.text(numberStr, valueX, yPosition, { align: "right" })
        pdf.text(symbol, valueX - numberWidth - 1, yPosition)
      } else {
        pdf.text(value, valueX, yPosition, { align: "right" })
      }
      yPosition += 8
    }

    // Overview Section
    if (data?.overview) {
      addSectionTitle("Platform Overview")
      const overview = data.overview
      const overviewData = [
        ["Total Clients", (overview.totalClients || 0).toLocaleString('en-IN')],
        ["Total Vendors", (overview.totalVendors || 0).toLocaleString('en-IN')],
        ["Verified Vendors", (overview.verifiedVendors || 0).toLocaleString('en-IN')],
        ["Total Categories", (overview.totalCategories || 0).toLocaleString('en-IN')],
        ["Total Revenue", `₹${(overview.totalRevenue || 0).toLocaleString('en-IN')}`],
      ]

      pdf.setFontSize(11)
      overviewData.forEach(([label, value]) => {
        printKeyValuePair(label, value)
      })
      yPosition += 5
    }

    // Revenue Analytics
    if (data?.revenue) {
      addSectionTitle("Revenue Analytics")
      pdf.setFontSize(11)
      pdf.setFont(undefined, "bold")
      pdf.text("Total Revenue:", labelX, yPosition)
      pdf.setFont(undefined, "normal")

      const totalRevValue = (data.revenue.totalRevenue || 0).toLocaleString('en-IN')
      const numberWidth = pdf.getTextWidth(totalRevValue)
      pdf.text(totalRevValue, valueX, yPosition, { align: "right" })
      pdf.text("₹", valueX - numberWidth - 1, yPosition)
      yPosition += 10

      if (data.revenue.chartData && data.revenue.chartData.length > 0) {
        pdf.setFont(undefined, "bold")
        pdf.text("Revenue Trend:", labelX, yPosition)
        yPosition += 8
        pdf.setFont(undefined, "normal")
        pdf.setFontSize(10)

        data.revenue.chartData.slice(-10).forEach((item) => {
          checkAndAddPage(7)
          const date = new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
          pdf.text(`${date}: ₹${item.revenue.toLocaleString('en-IN')}`, margin + 5, yPosition)
          yPosition += 6
        })
      }
      yPosition += 5
    }

    // Vendor Statistics
    if (data?.vendorStats) {
      addSectionTitle("Vendor Statistics")
      const vendors = data.vendorStats
      const vendorData = [
        ["Total Vendors", (vendors.totalVendors || 0).toLocaleString('en-IN')],
        ["Verified Vendors", (vendors.verifiedVendors || 0).toLocaleString('en-IN')],
        ["Unverified Vendors", (vendors.unverifiedVendors || 0).toLocaleString('en-IN')],
        ["Active Vendors", (vendors.activeVendors || 0).toLocaleString('en-IN')],
        ["Blocked Vendors", (vendors.blockedVendors || 0).toLocaleString('en-IN')],
      ]

      pdf.setFontSize(11)
      vendorData.forEach(([label, value]) => {
        printKeyValuePair(label, value)
      })
      yPosition += 5

      // Top Vendors
      if (vendors.topVendors && vendors.topVendors.length > 0) {
        yPosition += 5
        pdf.setFont(undefined, "bold")
        pdf.text("Top Vendors by Revenue:", labelX, yPosition)
        yPosition += 8
        pdf.setFontSize(10)

        const vendorNameLeft = margin + 2
        const revenueRight = margin + 140
        const percentRight = pageWidth - margin

        checkAndAddPage(40)
        pdf.setFillColor(241, 245, 249)
        pdf.rect(margin, yPosition, pageWidth - 2 * margin, 8, "F")
        pdf.setFont(undefined, "bold")
        pdf.text("Vendor Name", vendorNameLeft, yPosition + 5)
        pdf.text("Revenue", revenueRight, yPosition + 5, { align: "right" })
        pdf.text("% of Total", percentRight, yPosition + 5, { align: "right" })
        yPosition += 10

        pdf.setFont(undefined, "normal")
        vendors.topVendors.forEach((vendor, index) => {
          checkAndAddPage(8)
          if (index % 2 === 0) {
            pdf.setFillColor(249, 250, 251)
            pdf.rect(margin, yPosition - 3, pageWidth - 2 * margin, 7, "F")
          }
          pdf.text(vendor.name.substring(0, 30), vendorNameLeft, yPosition + 2)

          const revNumberStr = vendor.revenue.toLocaleString('en-IN')
          const revNumberWidth = pdf.getTextWidth(revNumberStr)
          pdf.text(revNumberStr, revenueRight, yPosition + 2, { align: "right" })
          pdf.text("₹", revenueRight - revNumberWidth - 1, yPosition + 2)

          pdf.text(`${vendor.percentage}%`, percentRight, yPosition + 2, { align: "right" })
          yPosition += 7
        })
        yPosition += 5
      }
    }

    // Client Statistics
    if (data?.clientStats) {
      addSectionTitle("Client Statistics")
      const clients = data.clientStats
      const clientData = [
        ["Total Clients", (clients.totalClients || 0).toLocaleString('en-IN')],
        ["Active Clients", (clients.activeClients || 0).toLocaleString('en-IN')],
        ["Blocked Clients", (clients.blockedClients || 0).toLocaleString('en-IN')],
      ]

      pdf.setFontSize(11)
      clientData.forEach(([label, value]) => {
        printKeyValuePair(label, value)
      })
      yPosition += 5
    }

    // Category Insights
    if (data?.categoryInsights && data.categoryInsights.length > 0) {
      addSectionTitle("Category Performance")
      pdf.setFontSize(10)

      const categoryLeft = margin + 2
      const revenueRight = margin + 120
      const percentRight = margin + 155
      const growthRight = pageWidth - margin

      checkAndAddPage(40)
      pdf.setFillColor(241, 245, 249)
      pdf.rect(margin, yPosition, pageWidth - 2 * margin, 8, "F")
      pdf.setFont(undefined, "bold")
      pdf.text("Category", categoryLeft, yPosition + 5)
      pdf.text("Revenue", revenueRight, yPosition + 5, { align: "right" })
      pdf.text("% of Total", percentRight, yPosition + 5, { align: "right" })
      pdf.text("Growth", growthRight, yPosition + 5, { align: "right" })
      yPosition += 10

      pdf.setFont(undefined, "normal")
      data.categoryInsights.forEach((category, index) => {
        checkAndAddPage(8)
        if (index % 2 === 0) {
          pdf.setFillColor(249, 250, 251)
          pdf.rect(margin, yPosition - 3, pageWidth - 2 * margin, 7, "F")
        }
        pdf.text(category.categoryName.substring(0, 25), categoryLeft, yPosition + 2)

        const revNumberStr = category.revenue.toLocaleString('en-IN')
        const revNumberWidth = pdf.getTextWidth(revNumberStr)
        pdf.text(revNumberStr, revenueRight, yPosition + 2, { align: "right" })
        pdf.text("₹", revenueRight - revNumberWidth - 1, yPosition + 2)

        pdf.text(`${category.percentageOfTotal.toFixed(1)}%`, percentRight, yPosition + 2, { align: "right" })
        pdf.text(category.growth, growthRight, yPosition + 2, { align: "right" })
        yPosition += 7
      })
    }
  }

  const generatePDF = async () => {
    setIsGenerating(true)
    try {
      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // Header
      pdf.setFillColor(30, 58, 138)
      pdf.rect(0, 0, pageWidth, 40, "F")
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(24)
      pdf.setFont(undefined, "bold")
      pdf.text(
        dashboardType === "vendor" ? "Vendor Analytics Report" : "Admin Analytics Report",
        15,
        20
      )
      pdf.setFontSize(12)
      pdf.setFont(undefined, "normal")
      const reportDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      pdf.text(`Generated on: ${reportDate}`, 15, 30)
      pdf.text(`Period: ${dateRange.period}`, 15, 35)

      // Generate content based on dashboard type
      if (dashboardType === "vendor") {
        generateVendorPDF(pdf, analytics as VendorAnalyticsData)
      } else {
        generateAdminPDF(pdf, analytics as AdminAnalyticsData)
      }

      // Footer
      const totalPages = pdf.internal.pages.length - 1
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        pdf.setFontSize(9)
        pdf.setTextColor(100, 100, 100)
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, {
          align: "center",
        })
        pdf.text(
          dashboardType === "vendor" 
            ? "© Vendor Analytics Dashboard" 
            : "© Admin Analytics Dashboard",
          pageWidth - 15,
          pageHeight - 10,
          { align: "right" }
        )
      }

      // Save the PDF
      const filename = `${dashboardType}-analytics-${new Date().toISOString().split("T")[0]}.pdf`
      pdf.save(filename)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.button
      onClick={generatePDF}
      disabled={isGenerating}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        isGenerating
          ? "bg-slate-300 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg"
      }`}
    >
      {isGenerating ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Generating PDF...</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span>Download PDF Report</span>
        </>
      )}
    </motion.button>
  )
}