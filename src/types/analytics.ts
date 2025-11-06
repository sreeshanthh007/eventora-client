
export interface Overview {
  totalRevenue: number
  totalBookings: number
  upcomingBookings: number
  upcomingEvents: number
  totalEvents: number
  averageRating: number
}

export interface Revenue {
  totalRevenue: number
  chartData: Array<{ date: string; revenue: number }>
}

export interface ServicePerformanceItem {
  totalBookings: number
  revenue: number
  serviceTitle: string
  averageRating: number
  status: string
}

export interface BookingAnalytics {
  completed: number
  ongoing: number
  cancelled: number
  pending: number
}

export interface EventAnalytics {
  totalEvents: number
  upcomingEvents: number
  completedEvents: number
  cancelledEvents: number
  totalTicketsSold: number
  totalEventRevenue: number
}

export interface RatingDistribution {
  [key: string]: number
}

export interface RatingInsights {
  average: number
  totalReviews: number
  distribution: RatingDistribution
}

export type AnalyticsData = {
  overview: Overview
  revenue: Revenue
  servicePerformance: ServicePerformanceItem[]
  bookingAnalytics: BookingAnalytics
  eventAnalytics: EventAnalytics
  ratingInsights: RatingInsights
}