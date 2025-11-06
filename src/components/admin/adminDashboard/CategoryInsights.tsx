
import { motion } from "framer-motion"
import { Card } from "@/components/pages/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { IndianRupeeIcon } from "lucide-react"

interface CategoryInsightsProps {
  analyticsData?: Array<{
    categoryName: string
    revenue: number
    percentageOfTotal: number
    growth: string
  }>
}

export default function CategoryInsights({ analyticsData }: CategoryInsightsProps) {
  const CATEGORY_DATA = (analyticsData || []).map(item => ({
    category: item.categoryName,
    revenue: item.revenue,
    growth: item.growth,
    percentageOfTotal: item.percentageOfTotal,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Category Insights</h2>
          <p className="text-slate-600">Analyze revenue distribution across product categories</p>
        </div>

        {/* Bar Chart */}
        {CATEGORY_DATA.length > 0 && (
          <Card className="bg-white border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Revenue by Category</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={CATEGORY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="category" stroke="#64748b" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px", color: "#fff" }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Top Categories List */}
        {CATEGORY_DATA.length > 0 && (
          <Card className="bg-white border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Performing Categories</h3>
            <div className="space-y-3">
              {CATEGORY_DATA.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-100 hover:border-blue-300 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{item.category}</p>
                    <p className="text-sm text-slate-600">
                      {item.percentageOfTotal?.toFixed(1)}% of total revenue
                    </p>
                  </div>
                  <div className="text-right">
                      <p className=" text-2xl font-bold text-black-900 flex items-center gap-1">
                        <IndianRupeeIcon className="w-5 h-5" />
                      {item.revenue}
                      </p>
                    <p className="text-sm text-emerald-600 font-semibold">{item.growth}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </motion.div>
  )
}