import { Button } from "@/components/pages/ui/button"
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"
import { Textarea } from "@/components/pages/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/pages/ui/select"
import { Checkbox } from "@/components/pages/ui/checkbox"
import { Badge } from "@/components/pages/ui/badge"
import { Plus, X } from "lucide-react"
import { useFormik } from "formik"
import { useGetCategoriesForService } from "@/hooks/vendor/service/UseGetCategoryForService"
import { ScheduleSlotConfig, type ScheduleSlotConfig as ScheduleSlotConfigType } from "./ScheduleSlotConfg"
import { useState } from "react"

export interface ServiceFormData {
  serviceTitle: string
  yearsOfExperience: number
  serviceDescription: string
  servicePrice: number
  additionalHourPrice: number
  serviceDuration: number
  cancellationPolicies: string[]
  termsAndConditions: string[]
  categoryId: string
  scheduleConfig: {
    frequency: string
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    slotDuration: number
    slotCapacity: number
    workingDays: string[]
    holidays: string[]
  }
}

interface AddServiceFormProps {
  onSubmit: (data: ServiceFormData) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export function AddServiceForm({ onSubmit, onCancel, isSubmitting = false }: AddServiceFormProps) {
  const { data: response, isLoading, isError, error } = useGetCategoriesForService()
  const categories = response?.data ? response.data : []

  const [scheduleConfig, setScheduleConfig] = useState<ScheduleSlotConfigType>({
    frequency: "once",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    slotDuration: 30,
    slotCapacity: 1,
    workingDays: [],
    holidays: [],
  })

  const cancellationPolicyOptions = [
    {
      value: "24-hour-full-refund",
      label: "24 Hour Notice - Full Refund",
      description: "Full refund if cancelled 24 hours before service. No refund for cancellations within 24 hours.",
    },
    {
      value: "48-hour-full-refund",
      label: "48 Hour Notice - Full Refund",
      description:
        "Full refund if cancelled 48 hours before service. 50% refund if cancelled within 24-48 hours. No refund within 24 hours.",
    },
    {
      value: "72-hour-tiered",
      label: "72 Hour Tiered Policy",
      description:
        "Full refund if cancelled 72+ hours before. 75% refund 48-72 hours before. 50% refund 24-48 hours before. No refund within 24 hours.",
    },
    {
      value: "week-notice",
      label: "1 Week Notice Required",
      description:
        "Full refund if cancelled 7+ days before service. 50% refund if cancelled 3-7 days before. No refund within 3 days.",
    },
    {
      value: "non-refundable-deposit",
      label: "Non-Refundable Deposit",
      description:
        "50% deposit is non-refundable upon booking. Remaining balance refundable up to 48 hours before service.",
    },
    {
      value: "flexible-policy",
      label: "Flexible Cancellation",
      description:
        "Full refund available up to 12 hours before service start time. Emergency cancellations considered case-by-case.",
    },
  ]

  const validateForm = (values: ServiceFormData) => {
    const errors: Partial<ServiceFormData> & { scheduleConfig?: string } = {}

    if (!values.serviceTitle) errors.serviceTitle = "Service title is required"
    if (!values.yearsOfExperience) errors.yearsOfExperience = "Years of experience is required"
    if (!values.serviceDescription) errors.serviceDescription = "Service description is required"
    if (!values.servicePrice) errors.servicePrice = "Service price is required"
    if (!values.categoryId) errors.categoryId = "Service category is required"
    if (!values.termsAndConditions) errors.termsAndConditions = "Terms and conditions are required"
    if (values.cancellationPolicies.length === 0)
      errors.cancellationPolicies = "At least one cancellation policy must be selected"

    // Schedule validation
    const config = values.scheduleConfig
    if (!config.startDate || !config.startTime || !config.endTime) {
      errors.scheduleConfig = "Schedule start date, start time, and end time are required"
    } else if (config.frequency !== "once" && !config.endDate) {
      errors.scheduleConfig = "End date is required for recurring schedules"
    
    } else if ((config.frequency === "daily" || config.frequency === "weekly") && config.workingDays.length === 0) {
      errors.scheduleConfig = "At least one working day must be selected for daily or weekly schedules"
    }

    return errors
  }

  const formik = useFormik<ServiceFormData>({
    initialValues: {
      serviceTitle: "",
      yearsOfExperience: 0,
      serviceDescription: "",
      servicePrice: 0,
      additionalHourPrice: 0,
      serviceDuration: 1,
      cancellationPolicies: [],
      termsAndConditions: [],
      categoryId: "",
      scheduleConfig,
    },
    validate: validateForm,
    onSubmit: (values) => {
      onSubmit({
        ...values,
        yearsOfExperience: values.yearsOfExperience ? Number(values.yearsOfExperience) : 0,
        servicePrice: values.servicePrice ? Number(values.servicePrice) : 0,
        additionalHourPrice: Number(values.additionalHourPrice) || 0,
        serviceDuration: Number(values.serviceDuration),
        scheduleConfig,
      })
    },
  })

  const handleScheduleChange = (newConfig: ScheduleSlotConfigType) => {
    setScheduleConfig(newConfig)
    formik.setFieldValue("scheduleConfig", newConfig)
    formik.setFieldTouched("scheduleConfig", true)
  }

  const handlePolicyToggle = (policyValue: string, policyDescription: string) => {
    const currentPolicies = formik.values.cancellationPolicies
    const isSelected = currentPolicies.includes(policyDescription)

    if (isSelected) {
      formik.setFieldValue(
        "cancellationPolicies",
        currentPolicies.filter((policy) => policy !== policyDescription),
      )
    } else {
      formik.setFieldValue("cancellationPolicies", [...currentPolicies, policyDescription])
    }
  }

  const removePolicyFromSelection = (policyToRemove: string) => {
    formik.setFieldValue(
      "cancellationPolicies",
      formik.values.cancellationPolicies.filter((policy) => policy !== policyToRemove),
    )
  }

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
              <Label htmlFor="serviceDuration">Service Duration (in Hrs)</Label>
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

      <ScheduleSlotConfig value={scheduleConfig} onChange={handleScheduleChange} />
      {formik.touched.scheduleConfig && formik.errors.scheduleConfig && (
        <p className="text-red-500 text-sm">{formik.errors.scheduleConfig}</p>
      )}

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
            <div className="space-y-3">
              <Label>Cancellation Policies * (Select one or more)</Label>

              {formik.values.cancellationPolicies.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-md">
                  {formik.values.cancellationPolicies.map((policy, index) => {
                    const policyOption = cancellationPolicyOptions.find((opt) => opt.description === policy)
                    return (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1 pr-1">
                        <span className="text-xs">{policyOption?.label || "Selected Policy"}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => removePolicyFromSelection(policy)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )
                  })}
                </div>
              )}

              <div className="grid gap-3 max-h-64 overflow-y-auto border rounded-md p-3">
                {cancellationPolicyOptions.map((policy) => {
                  const isSelected = formik.values.cancellationPolicies.includes(policy.description)
                  return (
                    <div key={policy.value} className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-sm">
                      <Checkbox
                        id={policy.value}
                        checked={isSelected}
                        onCheckedChange={() => handlePolicyToggle(policy.value, policy.description)}
                        className="mt-1"
                      />
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => handlePolicyToggle(policy.value, policy.description)}
                      >
                        <Label htmlFor={policy.value} className="font-medium cursor-pointer">
                          {policy.label}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">{policy.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

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
        <Button type="submit" disabled={isSubmitting} className="min-w-32">
          {isSubmitting ? "Creating..." : "Create Service"}
        </Button>
      </div>
    </form>
  )
}