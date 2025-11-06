
import { motion } from "framer-motion"
import { Card } from "@/components/pages/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

interface VendorAnalyticsProps {
  analyticsData?: {
    totalVendors?: number
    verifiedVendors?: number
    unverifiedVendors?: number
    activeVendors?: number
    blockedVendors?: number
  }
  topVendors?: Array<{
    name: string
    revenue: number
    profilePicture?: string
    percentage: string
  }>
}

export default function VendorAnalytics({ analyticsData, topVendors }: VendorAnalyticsProps) {
  const VENDOR_STATUS = [
    { name: "Verified", value: analyticsData?.verifiedVendors || 0, fill: "#10b981" },
    { name: "Unverified", value: analyticsData?.unverifiedVendors || 0, fill: "#f59e0b" },
  ]

  const VENDOR_ACTIVE_STATUS = [
    { name: "Active", value: analyticsData?.activeVendors || 0, fill: "#3b82f6" },
    { name: "Blocked", value: analyticsData?.blockedVendors || 0, fill: "#ef4444" },
  ]

  const TOP_VENDORS = (topVendors || []).map(vendor => ({
    name: vendor.name,
    revenue: vendor.revenue,
    percentage: vendor.percentage,
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
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Vendor Analytics</h2>
          <p className="text-slate-600">Monitor vendor verification and activity status</p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Verification Status */}
          {(analyticsData?.verifiedVendors || 0) + (analyticsData?.unverifiedVendors || 0) > 0 && (
            <Card className="bg-white border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Verification Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={VENDOR_STATUS}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {VENDOR_STATUS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          )}

          {/* Active Status */}
          {(analyticsData?.activeVendors || 0) + (analyticsData?.blockedVendors || 0) > 0 && (
            <Card className="bg-white border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Active Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={VENDOR_ACTIVE_STATUS}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {VENDOR_ACTIVE_STATUS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          )}
        </div>

        {/* Top Vendors Table */}
        {TOP_VENDORS.length > 0 && (
          <Card className="bg-white border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Vendors by Revenue</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Vendor Name</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">Revenue</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_VENDORS.map((vendor, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 text-sm text-slate-900">{vendor.name}</td>
                        <td className="px-4 py-3 text-sm text-right font-semibold text-slate-900">
                          ₹{vendor.revenue}
                        </td>

                      <td className="px-4 py-3 text-sm text-right text-slate-600">
                        {vendor.percentage}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </motion.div>
  )
}