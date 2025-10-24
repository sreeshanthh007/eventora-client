
import { useState } from "react"
import { Card } from "@/components/pages/ui/card"
import { Button } from "@/components/pages/ui/button"
import { ChevronRight, Star as StarIcon } from "lucide-react"
import { useQuery } from "@tanstack/react-query" // Assuming TanStack Query is used based on existing hook
import { Link } from "react-router-dom" // Assuming React Router

interface Service {
  _id: string
  serviceTitle: string
  serviceDescription: string
  servicePrice: number
  serviceDuration: number
  averageRating?: number 
}

interface VendorServicesResponse {
  services: Service[]
  totalPages: number
  currentPage: number
}

interface VendorOtherServicesProps {
  vendorId: string
}

// Mock or assume API function; replace with actual
const fetchVendorServices = async (vendorId: string, page: number = 1): Promise<VendorServicesResponse> => {
  
  const mockServices: Service[] = [
    {
      _id: "1",
      serviceTitle: "Portrait Photography",
      serviceDescription: "Capture your best moments with professional portraits.",
      servicePrice: 800,
      serviceDuration: 2,
      averageRating: 4.5
    },
    {
      _id: "2",
      serviceTitle: "Event Videography",
      serviceDescription: "High-quality video coverage for events.",
      servicePrice: 1500,
      serviceDuration: 4,
      averageRating: 4.8
    },
    // Add more for pagination demo
  ]
  return {
    services: mockServices.slice((page - 1) * 6, page * 6), // 6 per page
    totalPages: 2,
    currentPage: page
  }
}

export default function VendorOtherServices({ vendorId }: VendorOtherServicesProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, error } = useQuery({
    queryKey: ["vendor-services", vendorId, currentPage],
    queryFn: () => fetchVendorServices(vendorId, currentPage),
    keepPreviousData: true
  })

  const services = data?.services || []
  const totalPages = data?.totalPages || 1

  if (isLoading) {
    return (
      <Card className="p-8 bg-card border border-border">
        <div className="text-center">Loading other services...</div>
      </Card>
    )
  }

  if (error || services.length === 0) {
    return null // Or show "No other services" message
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Card className="p-8 bg-card border border-border">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-between">
          Other Services by {vendorId} {/* Replace with vendor.name if passed */}
          <Link to={`/vendor/${vendorId}`} className="text-sm text-primary hover:underline flex items-center gap-1">
            View All <ChevronRight size={16} />
          </Link>
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service._id} className="p-6 hover:shadow-md transition-shadow overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">{service.serviceTitle}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        size={14}
                        className={i < (service.averageRating || 4) ? "fill-accent text-accent" : "text-muted-foreground"}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">{service.averageRating || 4}</span>
                  </div>
                </div>
                <p className="text-sm text-foreground/70 line-clamp-2">{service.serviceDescription}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-2xl font-bold text-primary">{service.servicePrice}/-</p>
                    <p className="text-xs text-muted-foreground">{service.serviceDuration} hr{service.serviceDuration !== 1 ? 's' : ''}</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/services/${service._id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}