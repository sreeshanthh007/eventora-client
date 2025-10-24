import { Card } from "@/components/pages/ui/card"
import { Button } from "@/components/pages/ui/button"
import {  MapPin, Award } from "lucide-react"
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage"
import { useState } from "react"
import { VendorWorkSampleModal } from "../VendorWorkSample"// Adjust import path as needed
import { UsegetVendorWorkfolioForClient } from "@/hooks/client/UseGetVendorPortfolio"

interface Vendor {
  vendorId:string
  name: string
  email: string
  place: string
  description: string
  profilePicture: string
}

interface VendorCardProps {
  vendor: Vendor
  yearsOfExperience: number
}



export default function VendorCard({ vendor, yearsOfExperience }: VendorCardProps) {
  
  const initials = vendor.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading } = UsegetVendorWorkfolioForClient(vendor.vendorId)

  const workfolioData = data?.success && data.worksample ? {
    id: vendor.vendorId, 
    title: data.worksample.title,
    description: data.worksample.description,
    images: data.worksample.images.map((image: string) => getCloudinaryImageUrl(image)),
    vendorName: vendor.name,
    email: vendor.email
  } : null

  const handleViewWorkSamples = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Card className="p-6 bg-card border border-border">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {vendor.profilePicture ? (
              <img
                src={getCloudinaryImageUrl(vendor.profilePicture)}
                alt={vendor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-2xl font-bold">
                {initials}
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-foreground">{vendor.name}</h3>
              <p className="text-sm text-muted-foreground">Service Provider</p>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-2 py-4 border-y border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Award size={16} className="text-accent" />
                Experience
              </span>
              <span className="font-semibold text-foreground">{yearsOfExperience} years</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin size={16} className="text-accent" />
                Location
              </span>
              <span className="font-semibold text-foreground">{vendor.place}</span>
            </div>
          </div>

    
          <p className="text-sm text-foreground/80">
            {vendor.description}
          </p>

          {/* Buttons */}
          <div className="space-y-2 pt-2">
            <Button 
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90" 
              onClick={handleViewWorkSamples}
              disabled={isLoading || !workfolioData}
            >
              {isLoading ? "Loading..." : "View Work Samples"}
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Message Provider
            </Button>
          </div>
        </div>
      </Card>

      {isModalOpen && workfolioData && (
        <VendorWorkSampleModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          workfolio={workfolioData}
        />
      )}
    </>
  )
}