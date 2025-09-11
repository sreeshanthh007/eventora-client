import { Button } from "@/components/pages/ui/button"
import { Label } from "@/components/pages/ui/label"
import { Checkbox } from "@radix-ui/react-checkbox"
import { Badge } from "lucide-react"
import { X } from "lucide-react"

interface CancellationPoliciesProps {
  formik: any
  cancellationPolicyOptions: any[]
  handlePolicyToggle: (policyValue: string, policyDescription: string) => void
  removePolicyFromSelection: (policyToRemove: string) => void
}

export function CancellationPolicies({ 
  formik, 
  cancellationPolicyOptions, 
  handlePolicyToggle, 
  removePolicyFromSelection 
}: CancellationPoliciesProps) {
  return (
    <div className="space-y-3">
      <Label>Cancellation Policies * (Select one or more)</Label>

      {formik.values.cancellationPolicies.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-md">
          {formik.values.cancellationPolicies.map((policy: string, index: number) => {
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
  )
}