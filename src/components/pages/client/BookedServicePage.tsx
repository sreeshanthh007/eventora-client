
import { Breadcrumbs } from "@/components/common/breadCrumbs/BreadCrumbs"
import { Footer } from "@/components/mainComponents/Footer"
import { ProfileSidebar } from "@/components/mainComponents/ProfileSidebar"
import { ClientBookedServices } from "@/components/client/ClientBookedService"
import { useEffect, useState } from "react"
import { useGetClientBookingDetails } from "@/hooks/client/UseGetClientBookingDetails"
import { useDebounce } from "@/hooks/services/UseDebounce"
import { Input } from "@/components/pages/ui/input"
import { Search } from "lucide-react"
import { useToast } from "@/hooks/ui/UseToaster"
import { useCancelServiceMutation } from "@/hooks/client/UseCancelService"

const LIMIT = 6

export default function ClientBookedServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const { showToast } = useToast()
  const { mutate: cancelService } = useCancelServiceMutation()

  const { data, isLoading, isError, error } = useGetClientBookingDetails({
    page: currentPage,
    limit: LIMIT,
    search: debouncedSearchTerm,
  })

  // Reset page on search
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm])

  // Show error toast
  useEffect(() => {
    if (isError) {
      showToast(error?.message || "Failed to fetch bookings", "error")
    }
  }, [isError, error, showToast])

  const handleCancelService = (serviceId: string, vendorId: string, bookingId: string) => {
    if (serviceId && vendorId && bookingId) {
      cancelService({ serviceId, vendorId, bookingId })
    } else {
      showToast("Failed to cancel service", "error")
    }
  }

  const total = data?.total || 0
  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb with border - consistent with all pages */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs role="client" />
        </div>
      </div>

      {/* Main Content + Sidebar */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-6">
              <ProfileSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 order-1 lg:order-2">
            <div className="space-y-8">
              {/* Page Header */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Booked Services</h1>
                <p className="text-gray-600 mt-2">View and manage all your booked services</p>
              </div>

              {/* Search Bar */}
              <div className="max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search booked services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Booked Services List */}
              <ClientBookedServices
                onCancelSubmit={handleCancelService}
                bookings={data?.bookings || []}
                totalPages={totalPages}
                isLoading={isLoading}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                searchTerm={searchTerm}
              />
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}