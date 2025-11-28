

import { Card } from "@/components/pages/ui/card"
import { Star } from "lucide-react"
import { Button } from "@/components/pages/ui/button"
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage"
import { ConfirmDialog } from "@/components/common/popups/ConfirmationPopup"
import { useState } from "react"

interface Review {
  clientId: string
  clientName: string
  profileImage: string
  rating: number
  reviewId:string
  description: string
  createdAt: string

}

interface InnerRatingsResponse {
  _id: string
  averageRating: number
  totalRatings: number
  reviews: Review[]
}

interface ApiRatingsResponse {
  success: boolean
  message: string
  ratings: InnerRatingsResponse
}

interface ReviewsSectionProps {
  ratingsData?: ApiRatingsResponse
  currentClientId?: string
  onAddReview: () => void
  onEditReview: () => void
  onRemoveReview: (reviewId:string) => void
  hasReviewed: boolean
}

export default function ReviewsSection({
  ratingsData,
  currentClientId,
  onAddReview,
  onEditReview,
  onRemoveReview,
  hasReviewed,
}: ReviewsSectionProps) {
  const reviews: Review[] = ratingsData?.ratings?.reviews || []
  const averageRating = ratingsData?.ratings?.averageRating || 0
  const totalRatings = ratingsData?.ratings?.totalRatings || 0

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [targetReviewId, setTargetReviewId] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24))
    if (diffInDays < 7) return `${diffInDays === 0 ? "Today" : `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`}`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? "s" : ""} ago`
    return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? "s" : ""} ago`
  }

  const getAvatar = (name: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    return initials || "NA"
  }

  const handleRemoveClick = (reviewId: string) => {
    setTargetReviewId(reviewId)
    setIsConfirmOpen(true)
  }

  const handleConfirmRemove = () => {
    if (targetReviewId) {
      onRemoveReview(targetReviewId)
    }
    setIsConfirmOpen(false)
    setTargetReviewId(null)
  }

  const handleCancelRemove = () => {
    setIsConfirmOpen(false)
    setTargetReviewId(null)
  }

  const currentReview = reviews.find((review) => review.clientId === currentClientId)

  return (
    <Card className="p-8 bg-card border border-border">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Client Reviews</h2>
            <p className="text-muted-foreground">Trusted by {totalRatings}+ satisfied clients</p>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < averageRating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-1">({totalRatings} reviews)</span>
            </div>
          </div>
          <div>
            {!hasReviewed && (
              <Button variant="default" size="sm" onClick={onAddReview}>
                Add Review
              </Button>
            )}
          </div>
        </div>

        {reviews.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => {
              const isCurrentUserReview = review.clientId === currentClientId
              const avatarSrc = review.profileImage ? getCloudinaryImageUrl(review.profileImage) : undefined
              const date = formatDate(review.createdAt)

              return (
                <div
                  key={review.clientId}
                  className={`p-4 rounded-lg border ${
                    isCurrentUserReview ? "bg-accent/10 border-accent" : "bg-muted/30 border-border/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      {avatarSrc ? (
                        <img
                          src={avatarSrc || "/placeholder.svg"}
                          alt={review.clientName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-sm font-bold">
                          {getAvatar(review.clientName)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4
                          className={`font-semibold text-base ${isCurrentUserReview ? "text-black" : "text-foreground"}`}
                        >
                          {review.clientName}
                          {isCurrentUserReview && (
                            <span className="ml-2 text-xs bg-black text-white px-2 py-1 rounded-full">You</span>
                          )}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{date}</span>
                          {isCurrentUserReview && (
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={onEditReview}
                                className="h-6 px-2 text-xs"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveClick(review.reviewId)}
                                className="h-6 px-2 text-xs text-destructive hover:text-destructive"
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}
                          />
                        ))}
                      </div>
                      <p
                        className={`text-base ${isCurrentUserReview ? "text-foreground font-medium" : "text-foreground"}`}
                      >
                        {review.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <ConfirmDialog
          open={isConfirmOpen}
          onCancel={handleCancelRemove}
          onConfirm={handleConfirmRemove}
          title="Remove Review?"
          description="Are you sure you want to remove this review? This action cannot be undone."
          confirmLabel="Remove"
          cancelLabel="Cancel"
          confirmColor="red"
        />
      </div>
    </Card>
  )
}