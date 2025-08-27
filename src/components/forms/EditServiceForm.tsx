
import { Button } from "@/components/pages/ui/button";
import { Input } from "@/components/pages/ui/input";
import { Label } from "@/components/pages/ui/label";
import { Textarea } from "@/components/pages/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/pages/ui/select";
import { Edit } from "lucide-react";
import { useFormik } from "formik";
import { ServiceValidationSchema } from "@/utils/validations/addService.validator";
import { useGetCategoriesForService } from "@/hooks/vendor/UseGetCategoryForService";
import { toast } from "sonner";

export interface ServiceFormData {
  serviceId:string
  serviceTitle: string;
  yearsOfExperience: number ;
  serviceDescription: string;
  servicePrice: number ;
  additionalHourPrice: number ;
  serviceDuration: number;
  cancellationPolicies: string[];
  termsAndConditions: string[];
  categoryId: string;
}

interface Service {

  serviceTitle: string;
  serviceDescription: string;
  servicePrice: number;
  additionalHourPrice?: number;
  serviceDuration?: number;
  yearsOfExperience?: number;
  cancellationPolicies?: string[];
  termsAndConditions?: string[];
  categoryId?: string;
}

interface EditServiceFormProps {
  service: Service;
  onSubmit: (data: ServiceFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function EditServiceForm({ service, onSubmit, onCancel, isSubmitting = false }: EditServiceFormProps) {
  const { data: response, isLoading, isError, error } = useGetCategoriesForService();
  const categories = response?.data ? response.data : [];

  const formik = useFormik<ServiceFormData>({
    initialValues: {
      serviceTitle: service.serviceTitle || "",
      yearsOfExperience: service.yearsOfExperience || 0,
      serviceDescription: service.serviceDescription || "",
      servicePrice: service.servicePrice || 0,
      additionalHourPrice: service.additionalHourPrice || 0,
      serviceDuration: service.serviceDuration || 1,
      cancellationPolicies: service.cancellationPolicies?.join("\n") || "",
      termsAndConditions: service.termsAndConditions?.join("\n") || "",
      categoryId: service.categoryId || "",
    },
    validationSchema: ServiceValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const cancellationPolicies = values.cancellationPolicies
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item.length > 0);
        const termsAndConditions = values.termsAndConditions
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item.length > 0);

        if (cancellationPolicies.length === 0 || termsAndConditions.length === 0) {
          toast.error("Cancellation policies and terms must have at least one non-empty entry");
          return;
        }

         onSubmit({
          ...values,
          yearsOfExperience: Number(values.yearsOfExperience),
          servicePrice: Number(values.servicePrice),
          additionalHourPrice: Number(values.additionalHourPrice),
          serviceDuration: Number(values.serviceDuration),
          cancellationPolicies,
          termsAndConditions,
        });
  
        resetForm();
      } catch (error) {
        console.error("Failed to update service:", error);
        toast.error("Failed to update service");
      }
    },
    enableReinitialize: true,
  });

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
            <div className="space-y-2">
              <Label htmlFor="cancellationPolicies">Cancellation Policy *</Label>
              <Textarea
                id="cancellationPolicies"
                name="cancellationPolicies"
                placeholder="Enter each cancellation policy on a new line (e.g., 50% refund if canceled 7 days prior)"
                className={`min-h-32 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl ${
                  formik.touched.cancellationPolicies && formik.errors.cancellationPolicies ? "border-red-500" : ""
                }`}
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
          disabled={isSubmitting || !formik.isValid || !formik.dirty}
          className="min-w-32 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
        >
          {isSubmitting ? "Updating..." : "Update Service"}
        </Button>
      </div>
    </form>
  );
}
