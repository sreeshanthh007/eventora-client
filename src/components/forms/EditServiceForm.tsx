import { Button } from "@/components/pages/ui/button";
import { Input } from "@/components/pages/ui/input";
import { Label } from "@/components/pages/ui/label";
import { Textarea } from "@/components/pages/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/pages/ui/select";
import { Checkbox } from "@/components/pages/ui/checkbox";
import { Badge } from "@/components/pages/ui/badge";
import { Edit, X } from "lucide-react";
import { useFormik } from "formik";
import { ServiceValidationSchema } from "@/utils/validations/addService.validator";
import { useGetCategoriesForService } from "@/hooks/vendor/service/UseGetCategoryForService";
import { toast } from "sonner";
import { cancellationPolicyOptions } from "@/utils/helpers/CancellationPolicies";
import { ScheduleSlotConfig, type ScheduleSlotConfig as ScheduleSlotConfigType } from "./ScheduleSlotConfg";
import { useState } from "react";

export interface ServiceFormData {
  serviceId: string;
  serviceTitle: string;
  yearsOfExperience: number;
  serviceDescription: string;
  servicePrice: number;
  additionalHourPrice: number;
  serviceDuration: number;
  cancellationPolicies: string[];
  termsAndConditions: string[];
  categoryId: string;
  scheduleConfig: ScheduleSlotConfigType;
}

interface Service {
  serviceId?: string;
  serviceTitle: string;
  serviceDescription: string;
  servicePrice: number;
  additionalHourPrice?: number;
  serviceDuration?: number;
  yearsOfExperience?: number;
  cancellationPolicies?: string[];
  termsAndConditions?: string[];
  categoryId?: string;
  schedule?: {
    endDate: string;
    endTime: string;
    frequency: string;
    startDate: string;
    startTime: string;
    workingDays: number[];
    duration?: number;
    capacity?: number;
  };
  holidays?: string[];
}

interface EditServiceFormProps {
  service: Service;
  onSubmit: (data: ServiceFormData & { schedule: ScheduleSlotConfigType }) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function EditServiceForm({ service, onSubmit, onCancel, isSubmitting = false }: EditServiceFormProps) {
  const { data: response, isLoading, isError, error } = useGetCategoriesForService();
  const categories = response?.data ? response.data : [];


  const NUMBER_TO_DAY: { [key: number]: string } = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const initialScheduleConfig: ScheduleSlotConfigType = {
    frequency: service.schedule?.frequency?.toLowerCase() || "once",
    startDate: service.schedule?.startDate ? new Date(service.schedule.startDate).toISOString().split("T")[0] : "",
    endDate: service.schedule?.endDate ? new Date(service.schedule.endDate).toISOString().split("T")[0] : "",
    startTime: service.schedule?.startTime || "",
    endTime: service.schedule?.endTime || "",
    duration: service.schedule?.duration,
    capacity: service.schedule?.capacity,
    workingDays: service.schedule?.workingDays
      ?.map((d: number) => NUMBER_TO_DAY[d]) // Map numbers to day names (e.g., [1,2,3,0] -> ["Monday", "Tuesday", "Wednesday", "Sunday"])
      .filter(Boolean) || [], // Filter out any invalid mappings
    holidays: service.holidays || [],
    
  };

  const [scheduleConfig, setScheduleConfig] = useState<ScheduleSlotConfigType>(initialScheduleConfig);

  const formik = useFormik<ServiceFormData>({
    initialValues: {
      serviceId: service.serviceId || "",
      serviceTitle: service.serviceTitle || "",
      yearsOfExperience: service.yearsOfExperience || 0,
      serviceDescription: service.serviceDescription || "",
      servicePrice: service.servicePrice || 0,
      additionalHourPrice: service.additionalHourPrice || 0,
      serviceDuration: service.serviceDuration || 1,
      cancellationPolicies: service.cancellationPolicies || [],
      termsAndConditions: service.termsAndConditions?.join("\n") || "",
      categoryId: service.categoryId || "",
      scheduleConfig: initialScheduleConfig,
    },
    validationSchema: ServiceValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const termsAndConditionsArray = values.termsAndConditions
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item.length > 0);

        if (
          values.cancellationPolicies.length === 0 ||
          termsAndConditionsArray.length === 0 ||
          !values.scheduleConfig.startDate ||
          !values.scheduleConfig.startTime ||
          !values.scheduleConfig.endTime
        ) {
          toast.error("Cancellation policies, terms, and schedule configuration must be provided");
          return;
        }

      
        const DAY_TO_NUMBER: { [key: string]: number } = {
          Sunday: 0,
          Monday: 1,
          Tuesday: 2,
          Wednesday: 3,
          Thursday: 4,
          Friday: 5,
          Saturday: 6,
        };

        const adjustedSchedule = {
          ...values.scheduleConfig,
          frequency: values.scheduleConfig.frequency.toUpperCase(), // e.g., "weekly" -> "WEEKLY"
          workingDays: values.scheduleConfig.workingDays.map((day: string) => DAY_TO_NUMBER[day] || 0).filter((num: number) => num >= 0 && num <= 6), // Map back to numbers; filter invalids
          duration: values.scheduleConfig.duration,
          capacity: values.scheduleConfig.capacity,
        };

        const processedData = {
          ...values,
          yearsOfExperience: Number(values.yearsOfExperience),
          servicePrice: Number(values.servicePrice),
          additionalHourPrice: Number(values.additionalHourPrice),
          serviceDuration: Number(values.serviceDuration),
          termsAndConditions: termsAndConditionsArray,
          schedule: adjustedSchedule, 
        };

        onSubmit(processedData);

        resetForm();
      } catch (error) {

        toast.error("Failed to update service");
      }
    },
    enableReinitialize: true,
  });

  const handleScheduleChange = (newConfig: ScheduleSlotConfigType) => {
    setScheduleConfig(newConfig);
    formik.setFieldValue("scheduleConfig", newConfig);
    formik.setFieldTouched("scheduleConfig", true);
  };

  const handlePolicyToggle = (policyDescription: string) => {
    const currentPolicies = formik.values.cancellationPolicies;
    const isSelected = currentPolicies.includes(policyDescription);

    if (isSelected) {
      formik.setFieldValue(
        "cancellationPolicies",
        currentPolicies.filter((policy) => policy !== policyDescription),
      );
    } else {
      formik.setFieldValue("cancellationPolicies", [...currentPolicies, policyDescription]);
    }
  };

  const removePolicyFromSelection = (policyToRemove: string) => {
    formik.setFieldValue(
      "cancellationPolicies",
      formik.values.cancellationPolicies.filter((policy) => policy !== policyToRemove),
    );
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Basic Information
          </CardTitle>
          <CardDescription>Update the essential details about your service</CardDescription>
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
                className={`h-12 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl ${
                  formik.touched.serviceTitle && formik.errors.serviceTitle ? "border-red-500" : ""
                }`}
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
                className={`h-12 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl ${
                  formik.touched.yearsOfExperience && formik.errors.yearsOfExperience ? "border-red-500" : ""
                }`}
              />
              {formik.touched.yearsOfExperience && formik.errors.yearsOfExperience && (
                <p className="text-red-500 text-sm">{formik.errors.yearsOfExperience}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceDuration">Service Duration (hours)</Label>
              <Input
                id="serviceDuration"
                name="serviceDuration"
                type="number"
                min="1"
                placeholder="e.g., 2"
                value={formik.values.serviceDuration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`h-12 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl ${
                  formik.touched.serviceDuration && formik.errors.serviceDuration ? "border-red-500" : ""
                }`}
              />
              {formik.touched.serviceDuration && formik.errors.serviceDuration && (
                <p className="text-red-500 text-sm">{formik.errors.serviceDuration}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId">Service Category *</Label>
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
                  className={`h-12 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl ${
                    formik.touched.categoryId && formik.errors.categoryId ? "border-red-500" : ""
                  }`}
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
              placeholder="Describe your service in detail. Include what's included, your approach, and what makes your service special..."
              className={`min-h-32 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl ${
                formik.touched.serviceDescription && formik.errors.serviceDescription ? "border-red-500" : ""
              }`}
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

      {/* Schedule Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Availability Schedule
          </CardTitle>
          <CardDescription>Update the available schedule for your service</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScheduleSlotConfig value={scheduleConfig} onChange={handleScheduleChange} />
        </CardContent>
      </Card>
      {formik.touched.scheduleConfig && formik.errors.scheduleConfig && (
        <p className="text-red-500 text-sm">{formik.errors.scheduleConfig}</p>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Pricing Information</CardTitle>
          <CardDescription>Update your service rates and additional charges</CardDescription>
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
                  className={`h-12 pl-8 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl ${
                    formik.touched.servicePrice && formik.errors.servicePrice ? "border-red-500" : ""
                  }`}
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
                  className={`h-12 pl-8 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl ${
                    formik.touched.additionalHourPrice && formik.errors.additionalHourPrice ? "border-red-500" : ""
                  }`}
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

      <Card>
        <CardHeader>
          <CardTitle>Terms & Conditions</CardTitle>
          <CardDescription>Update your service terms, cancellation policy, and agreement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Cancellation Policies * (Select one or more)</Label>

              {formik.values.cancellationPolicies.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-md">
                  {formik.values.cancellationPolicies.map((policy, index) => {
                    const policyOption = cancellationPolicyOptions.find((opt) => opt.description === policy);
                    return (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1 pr-1">
                        <span className="text-xs">{policyOption?.label || policy}</span>
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
                    );
                  })}
                </div>
              )}

              <div className="grid gap-3 max-h-64 overflow-y-auto border rounded-md p-3">
                {cancellationPolicyOptions.map((policy) => {
                  const isSelected = formik.values.cancellationPolicies.includes(policy.description);
                  return (
                    <div key={policy.value} className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-sm">
                      <Checkbox
                        id={policy.value}
                        checked={isSelected}
                        onCheckedChange={() => handlePolicyToggle(policy.description)}
                        className="mt-1"
                      />
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => handlePolicyToggle(policy.description)}
                      >
                        <Label htmlFor={policy.value} className="font-medium cursor-pointer">
                          {policy.label}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">{policy.description}</p>
                      </div>
                    </div>
                  );
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
                placeholder="Enter each term or condition on a new line (e.g., Client must provide equipment)"
                className={`min-h-32 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl ${
                  formik.touched.termsAndConditions && formik.errors.termsAndConditions ? "border-red-500" : ""
                }`}
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

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-5 py-2.5 hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !formik.dirty}
          className="min-w-32 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
        >
          {isSubmitting ? "Updating..." : "Update Service"}
        </Button>
      </div>
    </form>
  );
}