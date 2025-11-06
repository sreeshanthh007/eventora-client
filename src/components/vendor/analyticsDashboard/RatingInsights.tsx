import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface RatingInsightsProps {
  ratingInsights?: {
    average: number
    totalReviews: number
    distribution: {
      [key: string]: number
    }
  }
}

export function RatingInsights({ ratingInsights }: RatingInsightsProps) {
  const totalReviews = ratingInsights?.totalReviews || 0
  const avgRating = ratingInsights?.average || 0

  const ratingData = ratingInsights ? Array.from({ length: 5 }, (_, idx) => {
    const starNum = 5 - idx
    const count = ratingInsights.distribution[starNum.toString()] || 0
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
    return {
      stars: `${starNum}★`,
      count,
      percentage: percentage.toFixed(1)
    }
  }).reverse() : [] // Reverse to have 1★ first, but display 5 to 1

  const chartData = ratingData.map((item) => ({
    name: item.stars,
    reviews: item.count,
  }))

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Rating Insights</CardTitle>
          <CardDescription>Customer rating distribution and feedback summary</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
                formatter={(value) => `${value} reviews`}
              />
              <Bar dataKey="reviews" fill="#fbbf24" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Rating Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Reviews */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <p className="text-sm text-slate-600 mb-1">Total Reviews</p>
              <p className="text-3xl font-bold text-blue-900">{totalReviews.toLocaleString()}</p>
            </div>

            {/* Average Rating */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
              <p className="text-sm text-slate-600 mb-1">Average Rating</p>
              <p className="text-3xl font-bold text-yellow-900">
                {avgRating} <span className="text-xl">★</span>
              </p>
            </div>

            {/* Positive Reviews */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200">
              <p className="text-sm text-slate-600 mb-1">Positive Reviews (4-5★)</p>
              <p className="text-3xl font-bold text-emerald-900">
                {(ratingInsights?.distribution["4"] || 0) + (ratingInsights?.distribution["5"] || 0)}
              </p>
              <p className="text-xs text-emerald-700 mt-1">
                {totalReviews > 0 ? (((ratingInsights?.distribution["4"] || 0) + (ratingInsights?.distribution["5"] || 0)) / totalReviews * 100).toFixed(1) : "0"}%
              </p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="space-y-2">
            {ratingData.map((rating, index) => (
              <motion.div
                key={rating.stars}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 font-semibold text-sm text-slate-700">{rating.stars}</div>
                <div className="flex-1">
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${rating.percentage}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-slate-900">{rating.count}</span>
                  <span className="text-xs text-slate-600 ml-2">{rating.percentage}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}