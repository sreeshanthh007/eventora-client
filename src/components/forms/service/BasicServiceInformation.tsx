
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"
import { Textarea } from "@/components/pages/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/pages/ui/select"

import { Plus} from "lucide-react"

interface BasicInfoProps {
  formik: any
  categories: any[]
  isLoading: boolean
  isError: boolean
  error: any
}

export function BasicServiceInformation({ formik, categories, isLoading, isError, error }: BasicInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Basic Information
        </CardTitle>
        <CardDescription>Provide the essential details about your service</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="serviceTitle">Service Title *</Label>
            <Input
              id="serviceTitle"
              name="serviceTitle"
              placeholder="e.g., Wedding Photography Package"
              value={formik.values.serviceTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.serviceTitle && formik.errors.serviceTitle ? "border-red-500" : ""}
            />
            {formik.touched.serviceTitle && formik.errors.serviceTitle && (
              <p className="text-red-500 text-sm">{formik.errors.serviceTitle}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
            <Input
              id="yearsOfExperience"
              name="yearsOfExperience"
              type="number"
              min="0"
              max="50"
              placeholder="e.g., 5"
              value={formik.values.yearsOfExperience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.yearsOfExperience && formik.errors.yearsOfExperience ? "border-red-500" : ""}
            />
            {formik.touched.yearsOfExperience && formik.errors.yearsOfExperience && (
              <p className="text-red-500 text-sm">{formik.errors.yearsOfExperience}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="serviceDuration">Service Duration in (Hrs)</Label>
          <Input
            id="serviceDuration"
            name="serviceDuration"
            placeholder="e.g., 2 hours, Half day, Full day"
            value={formik.values.serviceDuration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.serviceDuration && formik.errors.serviceDuration ? "border-red-500" : ""}
          />
          {formik.touched.serviceDuration && formik.errors.serviceDuration && (
            <p className="text-red-500 text-sm">{formik.errors.serviceDuration}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Service Category *</Label>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading categories...</p>
          ) : isError ? (
            <p className="text-sm text-red-500">
              Error loading categories: {error instanceof Error ? error.message : "Unknown error"}
            </p>
          ) : (
            <Select
              name="categoryId"
              value={formik.values.categoryId}
              onValueChange={(value) => formik.setFieldValue("categoryId", value)}
              onOpenChange={() => formik.setFieldTouched("categoryId", true)}
            >
              <SelectTrigger
                className={formik.touched.categoryId && formik.errors.categoryId ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.categoryId} value={category.categoryId}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {formik.touched.categoryId && formik.errors.categoryId && (
            <p className="text-red-500 text-sm">{formik.errors.categoryId}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="serviceDescription">Service Description *</Label>
          <Textarea
            id="serviceDescription"
            name="serviceDescription"
            placeholder="Describe your service in detail..."
            className={`min-h-32 ${formik.touched.serviceDescription && formik.errors.serviceDescription ? "border-red-500" : ""}`}
            value={formik.values.serviceDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.serviceDescription && formik.errors.serviceDescription && (
            <p className="text-red-500 text-sm">{formik.errors.serviceDescription}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}