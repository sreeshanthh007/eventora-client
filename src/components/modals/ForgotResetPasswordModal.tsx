import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../pages/ui/dialog"
import { Button } from "../pages/ui/button"
import { Label } from "../pages/ui/label"
import { Input } from "../pages/ui/input"
import { Lock, Eye, EyeOff, X, CheckCircle, } from "lucide-react"
import { useClientForgotPasswordMutation } from "@/hooks/client/UseClientForgotPassword"
import { usePasswordValidation } from "@/hooks/services/Usepasswordvalidation"

interface ResetPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  email: string
  role: string
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  email,
  role,
}) => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; api?: string }>({})

  const { mutate: forgotPasswordClient } = useClientForgotPasswordMutation()
  const passwordValidation = usePasswordValidation(password)

  const validatePassword = (pwd: string): string | undefined => {
    if (!pwd) return "Password is required"
    if (pwd.length < 8) return "Password must be at least 8 characters"
    if (!/[A-Z]/.test(pwd)) return "Password must contain at least one uppercase letter"
    if (!/[a-z]/.test(pwd)) return "Password must contain at least one lowercase letter"
    if (!/\d/.test(pwd)) return "Password must contain at least one number"
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return "Password must contain at least one special character"
    return undefined
  }

  const validateConfirmPassword = (pwd: string, confirmPwd: string): string | undefined => {
    if (!confirmPwd) return "Please confirm your password"
    if (pwd !== confirmPwd) return "Passwords don't match"
    return undefined
  }

  const handleSubmit = async () => {
    const newErrors: { password?: string; confirmPassword?: string; api?: string } = {}

    const passwordError = validatePassword(password)
    if (passwordError) newErrors.password = passwordError

    const confirmPasswordError = validateConfirmPassword(password, confirmPassword)
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setIsLoading(true)

    try {
      const resetPasswordData = { email, password, role }

      await new Promise((resolve, reject) => {
        forgotPasswordClient(resetPasswordData, {
          onSuccess: (response) => {
            setIsLoading(false)
            onSuccess()
            handleClose()
            resolve(response)
          },
          onError: (error: any) => {
            setIsLoading(false)
            setErrors(prev => ({
              ...prev,
              api: error?.response?.data?.message || "Failed to reset password. Please try again."
            }))
            reject(error)
          }
        })
      })
    } catch (error) {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setPassword("")
    setConfirmPassword("")
    setShowPassword(false)
    setShowConfirmPassword(false)
    setErrors({})
    onClose()
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    if (errors.password || errors.api) {
      setErrors(prev => ({ ...prev, password: undefined, api: undefined }))
    }
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setConfirmPassword(value)
    if (errors.confirmPassword || errors.api) {
      setErrors(prev => ({ ...prev, confirmPassword: undefined, api: undefined }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white border-gray-300 shadow-2xl">
        <DialogHeader className="relative">
     
          <button
            onClick={handleClose}
          >
          </button>

          <div className="flex flex-col items-center space-y-4 pt-8">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>

            <DialogTitle className="text-2xl font-bold text-center text-black">
              Reset Password
            </DialogTitle>

            <p className="text-gray-600 text-center text-sm max-w-xs">
              Create a new secure password for your account
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-6">
          {/* API Error */}
          {errors.api && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm font-medium">{errors.api}</p>
            </div>
          )}

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-3 pr-12 border-2 rounded-lg transition-all duration-200 ${
                  errors.password
                    ? "border-red-400 focus:border-red-400"
                    : "border-gray-300 focus:border-black"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Password Requirements */}
          {password && (
            <div className="space-y-2 text-xs">
              <p className="font-semibold text-gray-700">Password must contain:</p>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { valid: passwordValidation.minLength, text: "At least 8 characters" },
                  { valid: passwordValidation.hasUpper, text: "One uppercase letter" },
                  { valid: passwordValidation.hasLower, text: "One lowercase letter" },
                  { valid: passwordValidation.hasNumber, text: "One number" },
                  { valid: passwordValidation.hasSpecial, text: "One special character (!@#$%^&*)" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center space-x-2 ${item.valid ? "text-green-600" : "text-gray-400"}`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`w-full px-4 py-3 pr-12 border-2 rounded-lg transition-all duration-200 ${
                  errors.confirmPassword
                    ? "border-red-400 focus:border-red-400"
                    : "border-gray-300 focus:border-black"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
            {confirmPassword && password === confirmPassword && passwordValidation.isValid && (
              <p className="text-green-600 text-xs flex items-center space-x-1 mt-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Passwords match perfectly</span>
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition-all duration-200 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!passwordValidation.isValid || password !== confirmPassword || isLoading}
              className="flex-1 bg-black hover:bg-gray-900 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Updating...</span>
                </div>
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}