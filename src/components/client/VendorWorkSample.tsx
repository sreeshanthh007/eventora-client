
import type React from "react"
import { useState } from "react"
import { X, Mail, Building2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/pages/ui/button"

interface Workfolio {
  id: string
  title: string
  description: string
  images: string[]
  vendorName: string
  email: string
}

interface WorkfolioModalProps {
  isOpen: boolean
  onClose: () => void
  workfolio: Workfolio
}

export function VendorWorkSampleModal({ isOpen, onClose, workfolio }: WorkfolioModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen) return null

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? workfolio.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === workfolio.images.length - 1 ? 0 : prev + 1))
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">{workfolio.title}</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-muted rounded-x1 overflow-hidden aspect-video">
              <img
                src={workfolio.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${workfolio.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Image Navigation */}
              {workfolio.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {workfolio.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {workfolio.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {workfolio.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? "border-primary" : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">About This Project</h3>
            <p className="text-muted-foreground leading-relaxed text-base">{workfolio.description}</p>
          </div>

          {/* Vendor Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Building2 className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Vendor</p>
                <p className="text-foreground font-semibold">{workfolio.vendorName}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Mail className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Contact</p>
                <a href={`mailto:${workfolio.email}`} className="text-primary hover:underline font-semibold">
                  {workfolio.email}
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button asChild>
              <a href={`mailto:${workfolio.email}`}>Get in Touch</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
