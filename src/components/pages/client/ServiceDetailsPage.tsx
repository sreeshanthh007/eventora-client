import { useParams } from "react-router-dom"
import { Star } from "lucide-react"
import { Button } from "@/components/pages/ui/button"
import { Card } from "@/components/pages/ui/card"
import ServiceDescription from "@/components/client/serviceDetailsComponents/ServiceDescription"
import SlotDisplayer from "@/components/client/serviceDetailsComponents/SlotDisplayer" 
import ServiceBookingModal from "@/components/modals/ServiceBookingModal"
import VendorCard from "@/components/client/serviceDetailsComponents/VendorCard"
import ReviewsSection from "@/components/client/serviceDetailsComponents/ReviewsSection"
import TermsAndConditions from "@/components/client/serviceDetailsComponents/TermsAndConditions"
import CancellationPolicies from "@/components/client/serviceDetailsComponents/CancellationPolicies"
import { ClientLayout } from "@/components/layouts/ClientLayout"
import { useGetServiceDetails } from "@/hooks/client/UseGetServiceDetails"
import { useGetRatingsWithAverage } from "@/hooks/client/UseGetRatingsWithAverage"
import { useSelector } from "react-redux" 
import { useState, useCallback, useMemo } from "react"
import ReviewModal from "@/components/modals/ReviewModal" // Adjust path as needed
import type { RootState } from "@/store/store"
import { useAddRatingMutation } from "@/hooks/client/UseAddRating"
import type { IReviewData } from "@/types/service"
import { useEditRatingMutation } from "@/hooks/client/UseEditRating"
import { useToast } from "@/hooks/ui/UseToaster"
import { useRemoveReviewMutation } from "@/hooks/client/UseRemoveReview"

interface SelectedSlot {
  date: string
  time: string
}

interface BookingData {
  selectedSlotTime: string
  selectedDate: string
  name: string
  email: string
  phone: string
}

interface Review {
  reviewId:string
  clientId: string
  clientName: string
  profileImage: string
  rating: number
  description: string
  createdAt: string
}



export default function ServiceDetailsPage() {
  const params = useParams()
  const serviceId = params?.id as string
  const {showToast} = useToast()
  const { data: serviceResponse, isLoading, error } = useGetServiceDetails(serviceId)
  const { data: ratingsResponse } = useGetRatingsWithAverage(serviceId) 
  const {mutate:addRating} = useAddRatingMutation()
  const {mutate:editRating} = useEditRatingMutation()
  const {mutate:removeReviewMutation} = useRemoveReviewMutation()
  const currentClientId = useSelector((state:RootState)=>state.client.client?.clientId)
  const service =  serviceResponse?.service 
console.log("service details are",service)
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bookingData, setBookingData] = useState<BookingData | null>(null) 

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false) 

  const currentReview = useMemo(() => 
    ratingsResponse?.ratings?.reviews?.find((review: Review) => review.clientId === currentClientId),
  [ratingsResponse?.ratings?.reviews, currentClientId]
  )

  const refactoredReview = {
    ...currentReview,
    serviceId:serviceId
  }
  console.log("refactored",refactoredReview)

  const hasReviewed = !!currentReview

  const handleSlotSelect = useCallback((slot: SelectedSlot | null) => {
    setSelectedSlot(slot)
  }, [])

  const handleBookNow = useCallback(() => {
    if (selectedSlot) {
      setIsModalOpen(true)
    }
  }, [selectedSlot])

  const handleBookService = useCallback((bookingData: BookingData) => {
  
    setBookingData(bookingData)
  }, [])

  const handleSubmitReview = (data:IReviewData,type:boolean,ratingId?:string) => {
   if(type==false){
    addRating(data)
   }else if(type==true){
    if(ratingId) editRating({ratingId:ratingId,data:data})
   }else{
    showToast("invalid method","error")
  }
    
    setIsReviewModalOpen(false)
  }

  const handleAddReview = () => {
    setIsReviewModalOpen(true)
  }

  const handleEditReview = () => {
    setIsReviewModalOpen(true)
  }
  
  const handleRemoveReview = (reviewId:string) => {
    removeReviewMutation({reviewId})
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
                            className={i < (ratingsResponse?.ratings?.averageRating || 0) ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({ratingsResponse?.ratings?.totalRatings || 0} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <ServiceDescription description={service.serviceDescription} />

              <SlotDisplayer 
                slots={service.slots} 
                schedule={service.schedule}
                duration={service.serviceDuration}
                onSlotSelect={handleSlotSelect}
              />

              <ReviewsSection 
                ratingsData={ratingsResponse}
                currentClientId={currentClientId}
                hasReviewed={hasReviewed}
                onAddReview={handleAddReview}
                onEditReview={handleEditReview}
                onRemoveReview={handleRemoveReview}
              />

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
                    <p className="text-sm text-muted-foreground">{service.serviceDuration} hour{service.serviceDuration !== 1 ? 's' : ''}</p>
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

        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          onSubmit={handleSubmitReview}
          currentReview={refactoredReview}
          isEdit={hasReviewed}
        />
      </main>
    </ClientLayout>
  )
}