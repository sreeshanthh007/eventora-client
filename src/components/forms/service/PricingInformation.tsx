import { Card,CardContent,CardTitle,CardDescription,CardHeader } from "@/components/pages/ui/card"
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"



interface PricingInfoProps {
  formik: any
}

export function PricingInformation({ formik }: PricingInfoProps) {
  return (
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
  )
}