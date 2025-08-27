
import { Button } from "@/components/pages/ui/button"
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"
import { Textarea } from "@/components/pages/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/pages/ui/select"
import { Plus } from "lucide-react" // Import Plus component
import { useFormik } from "formik"
import { ServiceValidationSchema } from "@/utils/validations/addService.validator"
import { useGetCategoriesForService } from "@/hooks/vendor/UseGetCategoryForService"

export interface ServiceFormData {
  serviceTitle: string;
  yearsOfExperience: number | string;
  serviceDescription: string;
  servicePrice: number | string;
  additionalHourPrice: number | string;
  serviceDuration:number
  cancellationPolicies: string[];
  termsAndConditions: string[];
  categoryId: string;
}

interface AddServiceFormProps {
  onSubmit: (data: ServiceFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function AddServiceForm({ onSubmit, onCancel, isSubmitting = false }: AddServiceFormProps) {
    const { data: response, isLoading, isError, error } = useGetCategoriesForService();
    const categories = response?.data ? response.data : [];
    
  const formik = useFormik<ServiceFormData>({
    initialValues: {
      serviceTitle: "",
      yearsOfExperience: "",
      serviceDescription: "",
      servicePrice: "",
      additionalHourPrice: "",
      serviceDuration:1,
      cancellationPolicies: [],
      termsAndConditions: [],
      categoryId: "",
    },
    validationSchema: ServiceValidationSchema,
    onSubmit: (values) => {
      onSubmit({
        ...values,
        yearsOfExperience: values.yearsOfExperience ? Number(values.yearsOfExperience) : "",
        servicePrice: values.servicePrice ? Number(values.servicePrice) : "",
        additionalHourPrice: Number(values.additionalHourPrice),
        serviceDuration: Number(values.serviceDuration),
        termsAndConditions:[values.termsAndConditions],
        cancellationPolicies:[values.cancellationPolicies]
      })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Basic Information */}
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
              <Label htmlFor="title">Service Title *</Label>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceDuration">Service Duration</Label>
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
            <Label htmlFor="description">Service Description *</Label>
            <Textarea
              id="serviceDescription"
              name="serviceDescription"
              placeholder="Describe your service in detail. Include what's included, your approach, and what makes your service special..."
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

      {/* Pricing Information */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing Information</CardTitle>
          <CardDescription>Set your service rates and additional charges</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="servicePrice">Base Service Price *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="servicePrice"
                  name="servicePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className={`pl-8 ${formik.touched.servicePrice && formik.errors.servicePrice ? "border-red-500" : ""}`}
                  value={formik.values.servicePrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.servicePrice && formik.errors.servicePrice && (
                <p className="text-red-500 text-sm">{formik.errors.servicePrice}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalHourPrice">Additional Hour Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="additionalHourPrice"
                  name="additionalHourPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className={`pl-8 ${formik.touched.additionalHourPrice && formik.errors.additionalHourPrice ? "border-red-500" : ""}`}
                  value={formik.values.additionalHourPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.additionalHourPrice && formik.errors.additionalHourPrice && (
                <p className="text-red-500 text-sm">{formik.errors.additionalHourPrice}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms & Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Terms & Conditions</CardTitle>
          <CardDescription>Define your service terms, cancellation policy, and agreement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cancellationPolicy">Cancellation Policy *</Label>
              <Textarea
                id="cancellationPolicies"
                name="cancellationPolicies"
                placeholder="Enter your cancellation policy including refund terms, notice requirements, and any cancellation fees..."
                className={`min-h-32 ${formik.touched.cancellationPolicies && formik.errors.cancellationPolicies ? "border-red-500" : ""}`}
                value={formik.values.cancellationPolicies}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.cancellationPolicies && formik.errors.cancellationPolicies && (
                <p className="text-red-500 text-sm">{formik.errors.cancellationPolicies}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="termsAndConditions">Terms & Conditions *</Label>
              <Textarea
                id="termsAndConditions"
                name="termsAndConditions"
                placeholder="Enter your general terms and conditions including service terms, equipment requirements, liability, and any other conditions that apply to your service..."
                className={`min-h-32 ${formik.touched.termsAndConditions && formik.errors.termsAndConditions ? "border-red-500" : ""}`}
                value={formik.values.termsAndConditions}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.termsAndConditions && formik.errors.termsAndConditions && (
                <p className="text-red-500 text-sm">{formik.errors.termsAndConditions}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || !formik.isValid} className="min-w-32">
          {isSubmitting ? "Creating..." : "Create Service"}
        </Button>
      </div>
    </form>
  )
}
