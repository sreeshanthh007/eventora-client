
import { useState } from "react"
import { VendorLayout } from "@/components/layouts/VendorLayout"
import { VendorBookedServicesTable } from "@/components/vendor/VendorBookedServices"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Input } from "@/components/pages/ui/input"
import { Search } from "lucide-react"

export default function VendorBookedServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <VendorLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Booked Services</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage and track all your service bookings</p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by customer name, email, or booking ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <VendorBookedServicesTable searchTerm={searchTerm} />
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  )
}
