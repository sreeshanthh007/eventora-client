import { useParams } from "react-router-dom"
import { Star } from "lucide-react"
import { Button } from "@/components/pages/ui/button"
import { Card } from "@/components/pages/ui/card"
import ServiceDescription from "@/components/client/serviceDetailsComponents/ServiceDescription"
import AvailableSlots from "@/components/client/serviceDetailsComponents/AvailableSlots"
import ServiceBookingModal from "@/components/modals/ServiceBookingModal"
import VendorCard from "@/components/client/serviceDetailsComponents/VendorCard"
import ReviewsSection from "@/components/client/serviceDetailsComponents/ReviewsSection"
import TermsAndConditions from "@/components/client/serviceDetailsComponents/TermsAndConditions"
import CancellationPolicies from "@/components/client/serviceDetailsComponents/CancellationPolicies"
import { ClientLayout } from "@/components/layouts/ClientLayout"
import { useGetServiceDetails } from "@/hooks/client/UseGetServiceDetails"
import { useState } from "react"



export default function ServiceDetailsPage() {
  const params = useParams()
  const serviceId = params?.id as string
  const { data: serviceResponse, isLoading, error } = useGetServiceDetails(serviceId)
  const service =  serviceResponse?.service 
  console.log("service details",service)

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bookingData, setBookingData] = useState<{
    selectedSlot: string;
    name: string;
    email: string;
    phone: string;
  } | null>(null)

  const handleSlotSelect = (slotStartTime: string | null) => {
    setSelectedSlot(slotStartTime)
  }

  const handleBookNow = () => {
    if (selectedSlot) {
      setIsModalOpen(true)
    }
  }

  const handleBookService = (bookingData: { selectedSlot: string; name: string; email: string; phone: string }) => {
    setBookingData(bookingData)
  }

  if (isLoading) {
    return (
      <ClientLayout>
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div>Loading service details...</div>
        </main>
      </ClientLayout>
    )
  }

  if (error || !service) {
    return (
      <ClientLayout>
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div>Error loading service details.</div>
        </main>
      </ClientLayout>
    )
  }

  return (
    <ClientLayout>
      <main className="min-h-screen bg-background">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Service Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Service Title & Rating */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">{service.serviceTitle}</h1>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < 4 ? "fill-accent text-accent" : "text-muted-foreground"}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">(128 reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <ServiceDescription description={service.serviceDescription} />

              <AvailableSlots 
                slots={service.slots} 
                duration={service.serviceDuration}
                onSlotSelect={handleSlotSelect}
              />

              <ReviewsSection />

              <TermsAndConditions terms={service.termsAndConditions} />

              <CancellationPolicies policies={service.cancellationPolicies} />
            </div>

            <div className="space-y-6">
              <VendorCard vendor={service.vendor} yearsOfExperience={service.yearsOfExperience}/>

              {/* Booking Summary */}
              <Card className="p-6 sticky top-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Price</p>
                    <p className="text-3xl font-bold text-foreground">{service.servicePrice}/-</p>
                    <p className="text-m text-muted-foreground">{service.serviceDuration} hour{service.serviceDuration !== 1 ? 's' : ''}</p>
                  </div>
                  <Button 
                    onClick={handleBookNow}
                    disabled={!selectedSlot}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {selectedSlot ? "Book Now" : "Select a Slot to Book"}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <ServiceBookingModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          selectedSlot={selectedSlot}
          serviceDuration={service.serviceDuration}
          onBook={handleBookService}
          bookingData={bookingData}
          serviceId={serviceId}
          vendorId={service.vendor?.vendorId} // Assuming vendor has an id field
          serviceName={service.serviceTitle}
          amount={service.servicePrice}
          currency="INR" 
        />
      </main>
    </ClientLayout>
  )
}