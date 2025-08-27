import * as React from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/pages/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"
import ImageCropper from "@/utils/helpers/ImageCropper"
import { useFormik } from "formik"
import { addCategorySchema } from "@/utils/validations/categoryValidator"
import { useToast } from "@/hooks/ui/UseToaster"
import { useNavigate } from "react-router-dom"

export function AddCategoryForm({onSubmit}) {

  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(null)
  const [imageToCrop, setImageToCrop] = React.useState<string | null>(null)
  const [showCropper, setShowCropper] = React.useState(false)
  const [imageError, setImageError] = React.useState<string | null>(null)
  const {showToast} = useToast()
  const navigate = useNavigate()


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageError(null)
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageToCrop(reader.result as string) 
        setShowCropper(true) 
      }
      reader.readAsDataURL(file)
    } else {
      clearImageState()
    }
  }

  const handleCropComplete = (croppedFile: File | null) => {
    if (croppedFile) {
      setImageFile(croppedFile)
      setImagePreviewUrl(URL.createObjectURL(croppedFile))
      setImageError(null)
    } else {
      setImageFile(null)
      setImagePreviewUrl(null)
    }
    setImageToCrop(null)
    setShowCropper(false)
  }

  const clearImageState = () => {
    setImageFile(null)
    setImagePreviewUrl(null)
    setImageToCrop(null)
    setShowCropper(false)
    setImageError(null)
    
 
    const fileInput = document.getElementById("category-image") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const handleRemoveImage = () => {
    clearImageState()
  }

  const handleSubmit = (title: string, image: File | null) => {
    if (!image) {
      showToast("please upload an image","error")
      return
    }

    const data = {
      title,
      image
    }

    onSubmit(data)
  }

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: addCategorySchema,
    onSubmit: (values, action) => {
      handleSubmit(values.title, imageFile)
      
      action.resetForm({
        values: {
          title: "",
        }
      })
      clearImageState()
    },
  })

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add New Category</CardTitle>
        <CardDescription>Fill in the details to create a new category.</CardDescription>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Category Title</Label>
            <Input
              id="title"
              placeholder="Enter category title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-sm text-red-500">{formik.errors.title}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="category-image">Category Image</Label>
            <Input
              id="category-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file:text-sm file:font-medium file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-3 file:py-1.5"
            />
            {imageError && (
              <p className="text-sm text-red-500">{imageError}</p>
            )}
          </div>
          
          {imagePreviewUrl && (
            <div className="relative w-full h-48 rounded-md overflow-hidden border border-input flex items-center justify-center">
              <img
                src={imagePreviewUrl}
                alt="Image Preview"
                className="object-cover w-full h-full"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 rounded-full h-7 w-7"
                onClick={handleRemoveImage}
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </CardFooter>
      </form>

      {showCropper && imageToCrop && (
        <ImageCropper
          image={imageToCrop}
          onCropComplete={handleCropComplete}
          showCropper={setShowCropper}
          aspect={4 / 3} 
        />
      )}
    </Card>
  )
}