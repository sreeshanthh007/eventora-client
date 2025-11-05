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
  const {mutate:cancelService} = useCancelServiceMutation()
  const { data, isLoading, isError, error } = useGetClientBookingDetails({
    page: currentPage,
    limit: LIMIT,
    search: debouncedSearchTerm,
  })



  const handleCancelService = (serviceId:string,vendorId:string,bookingId:string)=>{

    if(serviceId && vendorId && bookingId){
      cancelService({serviceId,vendorId,bookingId})
    }else{
      showToast("failed to cancel service","error")
    }

  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCurrentPage(1)
    }
  }

  
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm])

  
  useEffect(() => {
    if (isError) {
      showToast(error?.message || "Failed to fetch bookings", "error")
    }
  }, [isError, error, showToast])


  const total = data?.total || 0
  const totalPages = Math.ceil(total / LIMIT)

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProfileSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Booked Services</h1>
                  <p className="text-gray-600 mt-2">View and manage all your booked services</p>
                </div>

                {/* Search Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search booked services..."
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        onKeyPress={handleSearchKeyPress}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

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
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}