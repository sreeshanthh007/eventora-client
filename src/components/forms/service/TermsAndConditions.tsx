
import { Card,CardContent,CardDescription,CardTitle,CardHeader } from "@/components/pages/ui/card"
import { Textarea } from "@/components/pages/ui/textarea"
import { Label } from "@/components/pages/ui/label"
import { CancellationPolicies } from "./CancellationPolicies"

interface TermsConditionsProps {
  formik: any
  cancellationPolicyOptions: any[]
  handlePolicyToggle: (policyValue: string, policyDescription: string) => void
  removePolicyFromSelection: (policyToRemove: string) => void
}

export function TermsConditions({ 
  formik, 
  cancellationPolicyOptions, 
  handlePolicyToggle, 
  removePolicyFromSelection 
}: TermsConditionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Terms & Conditions</CardTitle>
        <CardDescription>Define your service terms, cancellation policy, and agreement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <CancellationPolicies 
            formik={formik}
            cancellationPolicyOptions={cancellationPolicyOptions}
            handlePolicyToggle={handlePolicyToggle}
            removePolicyFromSelection={removePolicyFromSelection}
          />

          <div className="space-y-2">
            <Label htmlFor="termsAndConditions">Terms & Conditions *</Label>
            <Textarea
              id="termsAndConditions"
              name="termsAndConditions"
              placeholder="Enter your general terms and conditions..."
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
  )
}