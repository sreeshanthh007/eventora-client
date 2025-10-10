
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Button } from "@/components/pages/ui/button"
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"
import { Eye, EyeOff, Lock } from "lucide-react"
import { useFormik } from "formik"
import { PasswordSchema } from "@/utils/validations/change-password.validator"


interface ChangePasswordFormProps {
    onSubmit: (data: { currentPassword: string; newPassword: string }) => void
}



export function ChangePasswordForm({ onSubmit }: ChangePasswordFormProps) {
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNext, setShowNext] = useState(false)

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: ""
        },
        validationSchema: PasswordSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            onSubmit(values)
            setSubmitting(false)
            resetForm()
        }
    })

    return (
        <Card className="border-primary/20">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    <CardTitle className="text-balance">Change Password</CardTitle>
                </div>
                <CardDescription>Enter your current password and your new password.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={formik.handleSubmit} className="space-y-4" aria-label="Change password form">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Current password</Label>
                        <div className="relative">
                            <Input
                                id="current-password"
                                name="currentPassword"
                                type={showCurrent ? "text" : "password"}
                                value={formik.values.currentPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="••••••••"
                                required
                                aria-required="true"
                            />
                            <button
                                type="button"
                                aria-label={showCurrent ? "Hide current password" : "Show current password"}
                                className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                                onClick={() => setShowCurrent((v) => !v)}
                            >
                                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {formik.touched.currentPassword && formik.errors.currentPassword && (
                            <p className="text-xs text-red-500">{formik.errors.currentPassword}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="new-password">New password</Label>
                        <div className="relative">
                            <Input
                                id="new-password"
                                name="newPassword"
                                type={showNext ? "text" : "password"}
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="At least 8 characters"
                                minLength={8}
                            />
                            <button
                                type="button"
                                aria-label={showNext ? "Hide new password" : "Show new password"}
                                className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                                onClick={() => setShowNext((v) => !v)}
                            >
                                {showNext ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {formik.touched.newPassword && formik.errors.newPassword && (
                            <p className="text-xs text-red-500">{formik.errors.newPassword}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            Use 8+ characters with a mix of letters, numbers, and symbols.
                        </p>
                    </div>

                    <div className="pt-2">
                        <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? "Updating..." : "Update Password"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}