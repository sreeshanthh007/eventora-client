import React, { useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/pages/ui/dialog"
import { Button } from "@/components/pages/ui/button"
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"
import { Upload, X } from "lucide-react"
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage"
import { useFormik } from "formik"
import { editCategorySchema } from "@/utils/validations/editCategory.validator"
import { uploadImageToCloudinarySigned } from "@/services/cloudinary/cloudinary"
import { useToast } from "@/hooks/ui/UseToaster"

interface ICategory {
  _id: string
  categoryId: string
  title: string
  image: string
  status: string
}

interface EditCategoryModalProps {
  isOpen: boolean
  category: ICategory | null
  onClose: () => void
  onSave: (categoryId: string, updatedData: { title: string; image?: string | null}) => Promise<void>
  isLoading?: boolean
}

export const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  category,
  onClose,
  onSave,
  isLoading = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {showToast} = useToast()
  const formik = useFormik({
    initialValues: {
      title: category?.title || "",
      image: null as File | null,
      imagePreview: category?.image ? getCloudinaryImageUrl(category.image) : "",
    },
    validationSchema: editCategorySchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!category) return

      try {
        const updatedData: { title: string; image?: string | null} = {
          title: values.title.trim(),
          
        }

        if (values.image) {
          let uploadImgUrl : string | null = null
          uploadImgUrl = await uploadImageToCloudinarySigned(values.image,"category-images")

         if(!uploadImgUrl){
          showToast("failed to upload to cloudinay","error")
         }

         updatedData.image = uploadImgUrl
        }
        await onSave(category._id, updatedData)
        handleClose()
      } catch (error) {
        showToast("Failed to save category changes","error")
      }
    },
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      formik.setFieldValue("image", file)
      const reader = new FileReader()
      reader.onload = (e) => {
        formik.setFieldValue("imagePreview", e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    formik.setFieldValue("image", null)
    formik.setFieldValue("imagePreview", "")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  if (!category) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4 py-4">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">Category Title</Label>
            <Input
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter category title"
              disabled={isLoading}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-sm">{formik.errors.title}</div>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Category Image</Label>

            {/* Current/Preview Image */}
            {formik.values.imagePreview && (
              <div className="relative inline-block">
                <img
                  src={formik.values.imagePreview || "/placeholder.svg"}
                  alt="Category preview"
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={handleRemoveImage}
                  disabled={isLoading}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}

            {/* Upload Button */}
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                {formik.values.imagePreview ? "Change Image" : "Upload Image"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isLoading}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formik.isValid || !formik.dirty}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}