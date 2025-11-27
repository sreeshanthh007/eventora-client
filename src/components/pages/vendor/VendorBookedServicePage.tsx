import { useState, useEffect } from "react"
import { VendorLayout } from "@/components/layouts/VendorLayout"
import { VendorBookedServicesTable } from "@/components/vendor/VendorBookedServices"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Input } from "@/components/pages/ui/input"
import { Search } from "lucide-react"
import { Pagination } from "@/components/common/paginations/Pagination"
import { useGetBookedServices } from "@/hooks/vendor/service/UseGetBookedService"
import { useDebounce } from "@/hooks/services/UseDebounce"
import { Alert, AlertDescription } from "@/components/pages/ui/alert"
import { AlertTriangle } from "lucide-react"
import { type BookedService } from "@/components/vendor/VendorBookedServices"
import { useStartBookingMutation } from "@/hooks/vendor/UseStartBooking"
import { useStopBookingMutation } from "@/hooks/vendor/UseStopBooking"
import { VendorBookedServicesSkeleton } from "@/components/common/skeletons/VendorsBookedServicesSkeleton"

export default function VendorBookedServicesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const limit = 6

  const { data, isError, isLoading } = useGetBookedServices({
    page: currentPage,
    limit: limit,
    search: debouncedSearchTerm
  });
  const bookings : BookedService[] = data?.bookings || []
  
  const total = data?.total || 0
  const totalPages = Math.ceil(total / limit)

  const {mutate:startBookedService} = useStartBookingMutation();
  const {mutate:stopBookedService} = useStopBookingMutation();

  const handleStartBookedServiceSubmit = (bookingId: string) => {
    if (bookingId) {
      startBookedService({ bookingId });
      
    }
  };

  const handleStopBookedServiceSubmit = (bookingId: string) => {
    if (bookingId) {
      stopBookedService({ bookingId });
    }
  };

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm])


  if (isLoading) {
    return (
      <VendorLayout>
        <VendorBookedServicesSkeleton
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          limit={limit}
        />
      </VendorLayout>
    )
  }

  if (isError) {
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


          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Failed to load bookings. Please try again later.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </VendorLayout>
    )
  }

  return (
    <VendorLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Booked Services</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage and track all your service bookings</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, total)} of {total} bookings
          </p>
        </div>


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
          <CardContent className="space-y-4">
            <VendorBookedServicesTable 
              bookings={bookings} 
              onStartBookedServiceSubmit={handleStartBookedServiceSubmit}
              onStopBookedServiceSubmit={handleStopBookedServiceSubmit}
            />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  )
}