import { useCallback, useMemo } from "react";

export interface PasswordValidation {
  minLength: boolean
  hasUpper: boolean
  hasLower: boolean
  hasNumber: boolean
  hasSpecial: boolean
  isValid: boolean
}



export const usePasswordValidation = (password: string): PasswordValidation => {
  return useMemo(() => {
    const minLength = password.length >= 8
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial,
    }
  }, [password])



    const validateConfirmPassword = useCallback((pwd: string, confirmPwd: string): string | undefined => {
    if (!confirmPwd) return "Please confirm your password";
    if (pwd !== confirmPwd) return "Passwords don't match";
    return undefined;
  }, []);
}