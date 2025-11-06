import { useState, useEffect } from "react"
import { Star, X } from "lucide-react"
import { Button } from "@/components/pages/ui/button"
import { Textarea } from "@/components/pages/ui/textarea"
import { useToast } from "@/hooks/ui/UseToaster"
import type { IReviewData } from "@/types/service"

interface Review {
  clientId: string
  clientName: string
  profileImage: string
  rating: number
  description: string
  createdAt: string
  reviewId:string
  serviceId:serviceId
}

interface serviceId{
  serviceId:string
}

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data:IReviewData,type:boolean,reviewId?:string) => void
  currentReview?: Review
  isEdit?: boolean
}

export default function ReviewModal({ isOpen, onClose, onSubmit, currentReview, isEdit = false }: ReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {showToast} = useToast()
  

  useEffect(() => {
    if (isOpen) {
      if (isEdit && currentReview) {
        setRating(currentReview.rating)
        setDescription(currentReview.description)
      } else {
        setRating(0)
        setDescription("")
      }
    }
  }, [isOpen, isEdit, currentReview])

  const handleSubmit = async () => {
    if (rating === 0) {
      showToast("please provide rating of 1 star","error")
      return
    }
    const data : IReviewData = {
        rating:rating,
        description:description,
        serviceId:currentReview?.serviceId
    }
    setIsSubmitting(true)
    if(isEdit==false){
        onSubmit(data,isEdit)
    }else if(isEdit==true){
        onSubmit(data,isEdit,currentReview?.reviewId)
    }
    setIsSubmitting(false)
    resetForm()
  }

  const resetForm = () => {
    setRating(0)
    setDescription("")
    setHoverRating(0)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background border border-border rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            {isEdit ? "Edit Your Review" : "Rate Your Experience"}
          </h2>
          <button onClick={resetForm} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-foreground">
            {isEdit 
              ? "Update your feedback to reflect your current experience." 
              : "Please rate the quality of service you received. Your feedback helps us improve our offerings and serve you better."
            }
          </p>
        </div>

        {/* Star Rating */}
        <div className="mb-6">
          <p className="text-sm font-medium text-foreground mb-3">Service Rating</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              Service rating: {rating} {rating === 1 ? "star" : "stars"}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground block mb-2">Additional Description</label>
          <Textarea
            placeholder="Please describe your service experience in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-24 resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={resetForm} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || rating === 0} className="flex-1">
            {isSubmitting ? "Posting..." : (isEdit ? "Update Review" : "Post Review")}
          </Button>
        </div>
      </div>
    </div>
  )
}