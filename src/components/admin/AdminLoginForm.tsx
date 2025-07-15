
import { useState } from "react"
import { Button } from "../pages/ui/button"
import { Input } from "../pages/ui/input"
import { Label } from "@radix-ui/react-label"
import { signInschema } from "@/utils/validations/signIn.validator"
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "../pages/ui/card"
import { Eye, EyeOff, Shield } from "lucide-react"
import { useFormik } from "formik"
import type { ILoginData } from "@/services/auth/authServices"

interface AdminLoginFormProps {
  onLogin: (data: Omit<ILoginData, "role">) => void
  isLoading?: boolean
  error?: string
}

export function AdminLoginForm({ onLogin, isLoading = false, error }: AdminLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInschema,
    onSubmit: (values) => {
      onLogin(values)
    },
  })

  return (
    <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
      <CardHeader className="space-y-4 pb-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
            <Shield className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
          <CardDescription className="text-muted-foreground">Sign in to access the admin dashboard</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`h-11 ${
                formik.touched.email && formik.errors.email 
                  ? "border-red-500 focus:border-red-500" 
                  : ""
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`h-11 pr-10 ${
                  formik.touched.password && formik.errors.password 
                    ? "border-red-500 focus:border-red-500" 
                    : ""
                }`}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>

          {error && (
            <div className="text-sm text-red-500 text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-11" 
            disabled={isLoading || !formik.isValid || !formik.dirty}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}