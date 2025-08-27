
import { VendorLayout } from "../layouts/VendorLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Badge } from "@/components/pages/ui/badge"
import { Button } from "@/components/pages/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/pages/ui/avatar"
import { User, Mail, Phone, MapPin,Edit, Camera, Shield } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { useState, useRef } from "react"
import ImageCropper from "@/utils/helpers/ImageCropper"
import { uploadImageToCloudinarySigned } from "@/services/cloudinary/cloudinary"
import { useToast } from "@/hooks/ui/UseToaster"
import { useUpdateVendorProfileImageMutation } from "@/hooks/vendor/UseUpdateProfileImage"
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage"
import { EditProfileModal, type EditProfileData } from "../modals/EditProfileModal"
import { useUpdateVendorPersonalInformationMutation } from "@/hooks/vendor/UseUpdateVendorPersonal-information"

export default function VendorProfilePage() {
  const [showCropper, setShowCropper] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { showToast } = useToast()
  const { mutate: updateVendorProfileImage } = useUpdateVendorProfileImageMutation();
  const {mutate:updatePersonalInformation} = useUpdateVendorPersonalInformationMutation();


  const vendor = useSelector((state: RootState) => state.vendor.vendor)

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

  const handleCropComplete = async (croppedFile: File | null) => {
    if (croppedFile) {
      const imageUrl = URL.createObjectURL(croppedFile)
      setProfileImage(imageUrl)

      let uploadImageUrl: string | null = null

      uploadImageUrl = await uploadImageToCloudinarySigned(croppedFile, "vendor-profile-images")

      if (!uploadImageUrl) {
        showToast("failed to upload", "error")
      }

      updateVendorProfileImage(uploadImageUrl!)
    }
  }

  const handleEditProfile = () => {
    setIsEditModalOpen(true)
  }

  const handleSaveProfile = async (data: EditProfileData) => {
    const updateDetails = {
      name:data.name,
      phone:data.phone,
      about:data.about,
      place:data.place
    }

    if(updateDetails){
      updatePersonalInformation(updateDetails)
    }
    setIsUpdatingProfile(true)
    try {
      setIsEditModalOpen(false)
    } catch (error) {
      showToast("Failed to update profile", "error")
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  return (
    <VendorLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage
                      src={vendor?.profilePicture ? getCloudinaryImageUrl(vendor.profilePicture) : "/placeholder"}
                    />
                    <AvatarFallback className="text-2xl">
                      {vendor?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                    onClick={handleCameraClick}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={vendor?.status === "verified" ? "default" : "secondary"}>
                    <Shield className="h-3 w-3 mr-1" />
                    {vendor?.status === "verified" ? "Verified" : "Pending"}
                  </Badge>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">{vendor?.name}</h1>
                  </div>
                  <Button className="w-fit" onClick={handleEditProfile}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <p className="text-muted-foreground leading-relaxed">{vendor?.about}</p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    {/* <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{vendorData.rating}</span> */}
                    {/* <span className="text-muted-foreground">rating</span> */}
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <Calendar className="h-4 w-4 text-blue-500" />/ */}
                    {/* <span className="font-medium">{vendorData.totalEvents}</span> */}
                    {/* <span className="text-muted-foreground">events completed</span> */}
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <Clock className="h-4 w-4 text-green-500" /> */}
                    {/* <span className="text-muted-foreground">Member since {vendor.joinDate}</span> */}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{vendor?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{vendor?.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{vendor?.place}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Achievements & Recognition</CardTitle>
            <CardDescription>Awards and recognitions earned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {vendorData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-green-200 dark:border-green-800">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">{achievement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}

        {/* Account Status */}
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
            <CardDescription>Current verification and account standing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">Verified Vendor</p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Your account has been verified by our team
                  </p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {showCropper && selectedImage && (
        <ImageCropper
          image={selectedImage}
          onCropComplete={handleCropComplete}
          aspect={1} // Square aspect ratio for profile pictures
          showCropper={setShowCropper}
        />
      )}

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={{
          name: vendor?.name || "",
          phone: vendor?.phone || "",
          about: vendor?.about || "",
          place: vendor?.place || "",
        }}
        isLoading={isUpdatingProfile}
      />
    </VendorLayout>
  )
}