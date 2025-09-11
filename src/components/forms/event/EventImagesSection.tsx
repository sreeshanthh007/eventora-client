import React, { useState } from "react"
import { ImageIcon, Upload } from "lucide-react"
import { Button } from "@/components/pages/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"

interface EventImagesSectionProps {
  formik: any
}

export function EventImagesSection({ formik }: EventImagesSectionProps) {
  const [dragActive, setDragActive] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files)
    const newPreviews: string[] = []

    newFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            newPreviews.push(e.target.result as string)
            if (newPreviews.length === newFiles.length) {
              setPreviewImages((prev) => [...prev, ...newPreviews])
            }
          }
        }
        reader.readAsDataURL(file)
      }
    })

    formik.setFieldValue("Images", [...formik.values.Images, ...newFiles])
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleImageUpload(e.dataTransfer.files)
  }

  const removeImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
    formik.setFieldValue(
      "Images",
      formik.values.Images.filter((_, i) => i !== index),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          Event Images
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drop images here or click to upload</p>
              <p className="text-sm text-muted-foreground">Support for JPG, PNG, GIF up to 10MB each</p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id="image-upload"
              onChange={(e) => handleImageUpload(e.target.files)}
            />
            <Button
              type="button"
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              Choose Files
            </Button>
          </div>

          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previewImages.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}
          {formik.touched.Images && formik.errors.Images && (
            <p className="text-sm text-red-500">{String(formik.errors.Images)}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}