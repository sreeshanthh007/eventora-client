

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/pages/ui/dialog"
import { Button } from "../pages/ui/button"
import { Input } from "../pages/ui/input"
import { Label } from "../pages/ui/label"
import { Mail, Shield, X, ArrowLeft } from 'lucide-react'
import { useVerifyOtpMutation } from "@/hooks/auth/UseVerifyOtp"
import { toast } from "sonner"
import { UseTimer } from "@/hooks/UseTimer"
import { useEffect } from "react"
import { useSendForgotOTPMutation } from "@/hooks/auth/useSendForgotOTP"
import { UseVendorSentOTP } from "@/hooks/vendor/UseVendorSentOTP"

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (data:string ) => void
  role:string
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  role
}) => {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"email" | "otp">("email")
  const [isLoading, setIsLoading] = useState(false)

  const {mutate:sendOtp} = useSendForgotOTPMutation()
  const {mutate:verifyOtp} =  useVerifyOtpMutation();
  const {mutate:sendVendorOTP}  = UseVendorSentOTP()
  const {startTimer , resetTimer , timeLeft} = UseTimer(60)

    useEffect(() => {
    if (isOpen) {
      setEmail("")
      setOtp("")
      setStep("email")
      setIsLoading(false)
      resetTimer()
    }
  }, [isOpen, resetTimer])

  useEffect(() => {
    if (step === "otp") {
      resetTimer()
      startTimer()
    }
  }, [step, startTimer, resetTimer])


    const handler = role=="vendor" ? sendVendorOTP : sendOtp
    
  const handleSendOTP = async () => {
    if (!email) return
    setIsLoading(true)
    handler(email,{
      onSuccess:(data)=>{
        toast.success(data.message);
        setIsLoading(false)
         setStep("otp")
      },
      onError:(err)=>{
        toast.error(err.response?.data.message)
        setIsLoading(false)
      }
    })
    

  }

  const handleVerifyOTP = async () => {
    setIsLoading(true)
    verifyOtp(
      {email,otp},
      {
        onSuccess:(data)=>{
          toast.success(data.message);
          setIsLoading(false)
          onSuccess(email)
          handleClose()
        },
        onError:(err)=>{
          toast.error(err.response?.data.message)
          setIsLoading(false)
        }
      }
    )
  }

  const handleClose = () => {
  
    setEmail("")
    setOtp("")
    setStep("email")
    setIsLoading(false)
    resetTimer()
    onClose()
  }

 
const handleResendOTP = () => {
  setOtp("")
  setIsLoading(true)
  sendOtp(email, {
    onSuccess: (data) => {
      toast.success(data.message);
      setIsLoading(false)
      resetTimer()
      startTimer()
    },
    onError: (err) => {
      toast.error(err.response?.data.message)
      setIsLoading(false)
    }
  })
}

  return (

    <>
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-purple-50 border-0 shadow-2xl">
        <DialogHeader className="relative">
          <button
            onClick={handleClose}
            className="absolute right-0 top-0 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
          
          {step === "otp" && (
            <button
              onClick={() => setStep("email")}
              className="absolute left-0 top-0 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 text-gray-500" />
            </button>
          )}

          <div className="flex flex-col items-center space-y-4 pt-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              step === "email" 
                ? "bg-gradient-to-r from-blue-500 to-purple-600" 
                : "bg-gradient-to-r from-green-500 to-emerald-600"
            }`}>
              {step === "email" ? (
                <Mail className="w-8 h-8 text-white" />
              ) : (
                <Shield className="w-8 h-8 text-white" />
              )}
            </div>
            
            <DialogTitle className="text-2xl font-bold text-center">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {step === "email" ? "Forgot Password?" : "Verify OTP"}
              </span>
            </DialogTitle>
            
            <p className="text-gray-600 text-center text-sm">
              {step === "email" 
                ? "Enter your email address and we'll send you a verification code"
                : `We've sent a 6-digit code to ${email}`
              }
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {step === "email" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 focus:border-purple-400 rounded-lg transition-colors duration-200"
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition-all duration-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendOTP}
                  disabled={!email || isLoading}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-semibold text-gray-700">
                  Verification Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 border-2 border-gray-200 focus:border-purple-400 rounded-lg transition-colors duration-200 text-center text-lg font-mono tracking-widest"
                  maxLength={6}
                />
              </div>

              <div className="text-center">
                {timeLeft > 0 ? (
                  <p className="text-sm text-gray-500 font-thin">
                    Resend code in <span className="font-semibold text-purple-600 font-serif">{timeLeft}s</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResendOTP}
                    className="text-sm text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition-all duration-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6 || isLoading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}
