
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/pages/ui/card"
import { Label } from "@/components/pages/ui/label"
import { Input } from "@/components/pages/ui/input"
import { Button } from "@/components/pages/ui/button"
import { Eye, EyeOff, Lock } from "lucide-react"
import { useFormik } from "formik"
import { PasswordSchema } from "@/utils/validations/change-password.validator"

interface VendorChangePasswordFormProps {
  onSubmit: (data: { currentPassword: string; newPassword: string }) => void
}

export function VendorChangePasswordForm({ onSubmit }: VendorChangePasswordFormProps) {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: PasswordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
   
        onSubmit(values)
        resetForm()
      } catch {

      }
    },
  })

  return (
    <Card className="border-primary/20 shadow-lg rounded-lg bg-background/95 backdrop-blur-sm">
      <form onSubmit={formik.handleSubmit} noValidate aria-label="Change password form">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Lock className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl font-semibold">Update Password</CardTitle>
          </div>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your current password and your new password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-sm font-medium">
              Current Password
            </Label>
            <div className="relative">
              <Input
                id="current-password"
                name="currentPassword"
                type={showCurrent ? "text" : "password"}
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your current password"
                autoComplete="current-password"
                required
                aria-required="true"
                className="pr-10 h-10 rounded-md border border-input bg-background"
              />
              <button
                type="button"
                aria-label={showCurrent ? "Hide current password" : "Show current password"}
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowCurrent((v) => !v)}
              >
                {showCurrent ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {formik.touched.currentPassword && formik.errors.currentPassword && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.currentPassword}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-sm font-medium">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="new-password"
                name="newPassword"
                type={showNew ? "text" : "password"}
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your new password"
                autoComplete="new-password"
                required
                aria-required="true"
                className="pr-10 h-10 rounded-md border border-input bg-background"
              />
              <button
                type="button"
                aria-label={showNew ? "Hide new password" : "Show new password"}
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowNew((v) => !v)}
              >
                {showNew ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.newPassword}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Use 8+ characters with a mix of letters, numbers, and symbols.
            </p>
          </div>
        </CardContent>
        <CardContent className="pt-4">
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full h-10 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {formik.isSubmitting ? "Submitting..." : "Submit Password"}
          </Button>
        </CardContent>
      </form>
    </Card>
  )
}