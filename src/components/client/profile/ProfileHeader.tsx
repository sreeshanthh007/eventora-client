import { Edit, Camera } from "lucide-react"
import type React from "react"
import { useState, useRef } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/pages/ui/avatar"
import { Button } from "@/components/pages/ui/button"
import { Card } from "@/components/pages/ui/card"
import ImageCropper from "@/utils/helpers/ImageCropper"
import { uploadImageToCloudinarySigned } from "@/services/cloudinary/cloudinary"
import { useToast } from "@/hooks/ui/UseToaster"
import { useUpdateProfileImageMutation } from "@/hooks/client/UseUpdateProfileImage"
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage"

export const ProfileHeader: React.FC = () => {
 
  const client = useSelector((state: RootState) => state.client.client)
  
  const [showCropper, setShowCropper] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const {showToast} = useToast()
  const {mutate : updateProfileImage} = useUpdateProfileImageMutation()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCameraClick = () => {
    fileInputRef.current?.click()
  }   

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setSelectedImage(imageUrl)
        setShowCropper(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileImageSubmission = async (croppedFile: File | null) => {
    if (!croppedFile) return

    try {
     let uploadImageUrl : string | null = null

     if(croppedFile){
      uploadImageUrl = await uploadImageToCloudinarySigned(
        croppedFile,
        "client-profile-images"
      );

      if(!uploadImageUrl){
        showToast("failed to upload","error")
        return
      }
     }

     updateProfileImage(
      uploadImageUrl! 
     );

    } catch (error) {
      console.error("Error uploading profile image:", error)
    }
  }

  if (!client) {
    return null 
  }

  return (
    <>
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={client.profileImage ? getCloudinaryImageUrl(client.profileImage) : "/placeholder"} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-semibold">
                {client.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white shadow-md hover:shadow-lg"
              onClick={handleCameraClick}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{client.name}</h1>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Edit className="h-4 w-4 mr-2"/>
              Change Profile
            </Button>
          </div>
        </div>
      </Card>

      {showCropper && selectedImage && (
        <ImageCropper
          image={selectedImage}
          onCropComplete={handleProfileImageSubmission}
          aspect={1} 
          showCropper={setShowCropper}
        />
      )}
    </>
  )
}