import { useState, useEffect } from "react"
import { VendorLayout } from "@/components/layouts/VendorLayout"
import { VendorBookedServicesTable } from "@/components/vendor/VendorBookedServices"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Input } from "@/components/pages/ui/input"
import { Search } from "lucide-react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/pages/ui/pagination"
import { useGetBookedServices } from "@/hooks/vendor/service/UseGetBookedService"
import { useDebounce } from "@/hooks/services/UseDebounce"
import { Skeleton } from "@/components/pages/ui/skeleton"
import { Alert, AlertDescription } from "@/components/pages/ui/alert"
import { AlertTriangle } from "lucide-react"
import { type BookedService } from "@/components/vendor/VendorBookedServices"
import { useStartBookingMutation } from "@/hooks/vendor/UseStartBooking"
import { useStopBookingMutation } from "@/hooks/vendor/UseStopBooking"

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

          {/* Bookings Table Loading */}
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
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

          {/* Error State */}
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
          <CardContent className="space-y-4">
            <VendorBookedServicesTable 
              bookings={bookings} 
              onStartBookedServiceSubmit={handleStartBookedServiceSubmit}
              onStopBookedServiceSubmit={handleStopBookedServiceSubmit}
            />
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                      }}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === page}
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(page)
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  )
}