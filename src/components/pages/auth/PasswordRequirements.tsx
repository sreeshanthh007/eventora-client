import React from 'react'

export const PasswordRequirements = () => {
  return (
    <>
     {/* Password Requirements */}
          {password && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-700">Password Requirements:</p>
              <div className="grid grid-cols-1 gap-1 text-xs">
                <div
                  className={`flex items-center space-x-2 ${passwordValidation.minLength ? "text-green-600" : "text-gray-400"}`}
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>At least 8 characters</span>
                </div>
                <div
                  className={`flex items-center space-x-2 ${passwordValidation.hasUpper ? "text-green-600" : "text-gray-400"}`}
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>One uppercase letter</span>
                </div>
                <div
                  className={`flex items-center space-x-2 ${passwordValidation.hasLower ? "text-green-600" : "text-gray-400"}`}
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>One lowercase letter</span>
                </div>
                <div
                  className={`flex items-center space-x-2 ${passwordValidation.hasNumber ? "text-green-600" : "text-gray-400"}`}
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>One number</span>
                </div>
                <div
                  className={`flex items-center space-x-2 ${passwordValidation.hasSpecial ? "text-green-600" : "text-gray-400"}`}
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>One special character (!@#$%^&*)</span>
                </div>
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
                className={`w-full px-4 py-3 pr-12 border-2 rounded-lg transition-colors duration-200 ${
                  errors.confirmPassword
                    ? "border-red-400 focus:border-red-400"
                    : "border-gray-200 focus:border-purple-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
            {confirmPassword && password === confirmPassword && passwordValidation.isValid && (
              <p className="text-green-600 text-xs flex items-center space-x-1">
                <CheckCircle className="w-3 h-3" />
                <span>Passwords match</span>
              </p>
            )}
          </div>
    
    
    
    
    
    
    
    </>
  )
}
