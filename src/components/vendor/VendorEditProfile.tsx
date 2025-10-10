import type React from "react"
import { useRef } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/pages/ui/card"
import { Save, X, User, Camera, Trash2 } from "lucide-react"
import { Textarea } from "@/components/pages/ui/textarea"
import { Label } from "@/components/pages/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/pages/ui/avatar"
import { Button } from "@/components/pages/ui/button"
import { Input } from "@/components/pages/ui/input"
import { useFormik } from "formik"
import { vendorProfileValidationSchema } from "@/utils/validations/vendorProfileValidator"

interface VendorData {
    id?: string,
    name: string
    phone: string
    place?: string
    bio?: string
    profileImage?: string
}

interface VendorEditFormProps {
  vendor?: VendorData
  onSave: (vendorData: VendorData) => void
  onCancel: () => void
  isLoading?: boolean
}

export const VendorEditForm: React.FC<VendorEditFormProps> = ({ vendor, onSave, onCancel, isLoading = false }) => {

  const fileInputRef = useRef<HTMLInputElement>(null)

  const formik = useFormik({
    initialValues: {
      name: vendor?.name || "",
      phone: vendor?.phone || "",
      place: vendor?.place || "",
      bio: vendor?.bio || "",
      profileImage: vendor?.profileImage || "",
    },
    validationSchema:vendorProfileValidationSchema,
    onSubmit: (values) => {
      onSave({
        id: vendor?.id,
        ...values
      })
    },
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        formik.setFieldValue("profileImage", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageRemove = () => {
    formik.setFieldValue("profileImage", "")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerImageUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex-1">
      <Card className="rounded-xl shadow-lg border border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-900">EDIT VENDOR PROFILE</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 p-6 bg-gray-100 rounded-lg border border-gray-200">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="relative group">
                <Avatar className="w-16 h-16 bg-green-600 cursor-pointer" onClick={triggerImageUpload}>
                  {formik.values.profileImage ? (
                    <AvatarImage src={formik.values.profileImage || "/placeholder.svg"} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-green-600 text-white text-xl font-semibold">
                      {formik.values.name?.[0]?.toUpperCase() || <User className="h-8 w-8" />}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={triggerImageUpload}
                >
                  <Camera className="h-6 w-6 text-white" />
                </div>
                {formik.values.profileImage && (
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={handleImageRemove}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{formik.values.name || "Vendor Name"}</h3>
                <p className="text-gray-600">{formik.values.place || "Location"}</p>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Enter vendor name"
                  className={`bg-white border focus:ring-2 focus:ring-gray-200 focus:border-gray-400 ${
                    formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && <p className="text-sm text-red-600">{formik.errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="place" className="text-gray-700 font-medium">
                  Place *
                </Label>
                <Input
                  id="place"
                  placeholder="Enter location"
                  className={`bg-white border focus:ring-2 focus:ring-gray-200 focus:border-gray-400 ${
                    formik.touched.place && formik.errors.place ? "border-red-500" : "border-gray-300"
                  }`}
                  {...formik.getFieldProps("place")}
                />
                {formik.touched.place && formik.errors.place && <p className="text-sm text-red-600">{formik.errors.place}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone" className="text-gray-700 font-medium">
                  Contact Number *
                </Label>
                <Input
                  id="phone"
                  placeholder="(0123) 45678"
                  className={`bg-white border focus:ring-2 focus:ring-gray-200 focus:border-gray-400 ${
                    formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone && <p className="text-sm text-red-600">{formik.errors.phone}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="about" className="text-gray-700 font-medium">
                  About Me
                </Label>
                <Textarea
                  id="about"
                  placeholder="Write about yourself and your business..."
                  className="bg-white min-h-[120px] border border-gray-300 focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
                  {...formik.getFieldProps("about")}
                />
                {formik.touched.bio && formik.errors.bio && <p className="text-sm text-red-600">{formik.errors.bio}</p>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md flex items-center justify-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-md flex items-center justify-center bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}