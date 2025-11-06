import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Badge } from "@/components/pages/ui/badge"

interface ServicePerformanceItem {
  totalBookings: number
  revenue: number
  serviceTitle: string
  averageRating: number
  status: string
}

interface ServicePerformanceProps {
  servicePerformance: ServicePerformanceItem[]
}

export function ServicePerformance({ servicePerformance }: ServicePerformanceProps) {
  const serviceData = servicePerformance.map((s) => ({
    service: s.serviceTitle,
    revenue: s.revenue,
  }))

  const serviceTableData = servicePerformance.map((service) => ({
    name: service.serviceTitle,
    bookings: service.totalBookings,
    revenue: `₹${service.revenue.toLocaleString()}`,
    rating: service.averageRating,
    status: service.status.charAt(0).toUpperCase() + service.status.slice(1),
  }))

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Service Performance</CardTitle>
          <CardDescription>Revenue breakdown by service type</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="service" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
                formatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Service Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Bookings</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Revenue</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Avg. Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {serviceTableData.map((service, index) => (
                  <motion.tr
                    key={service.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-100 hover:bg-blue-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-slate-900">{service.name}</td>
                    <td className="py-3 px-4 text-slate-600">{service.bookings}</td>
                    <td className="py-3 px-4 font-semibold text-blue-600">{service.revenue}</td>
                    <td className="py-3 px-4">
                      <span className="text-yellow-500">★</span> {service.rating}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={`${
                          service.status === "Active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {service.status}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}