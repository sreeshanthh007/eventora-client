import { useState, useRef } from "react"
import { Button } from "../pages/ui/button"
import { GoogleAuthButton } from "./GoogleAuth"
import { Input } from "../pages/ui/input"
import { toast } from "sonner"
import OTPModal from "../modals/OTPModal"
import ImageCropper from "@/utils/helpers/ImageCropper"
import type { User } from "@/types/User"
import { useSendOtpMutation } from "@/hooks/auth/UseSendOtp"
import { useVerifyOtpMutation } from "@/hooks/auth/UseVerifyOtp"
import { Eye, EyeOff, UserIcon, Phone, Mail, Lock, Camera, Upload, X } from "lucide-react"
import { ForgotPasswordModal } from "../modals/ForgotPasswordModal"
import { ResetPasswordModal } from "../modals/ForgotResetPasswordModal"
import ClientSignupSchema from "@/utils/validations/client.signUp.validator"
import { useFormik } from "formik"
import { signInschema } from "@/utils/validations/signIn.validator"
import { Link, useNavigate } from "react-router-dom"
import type { CredentialResponse } from "@react-oauth/google"

interface AuthFormProps {
  type: "login" | "register"
  buttonLabel: string
  redirectTo: string
  redirectText: string
  redirectLinkText: string
  role?: "client" | "vendor"
  onSubmit: (data: User) => void
  handleGoogleAuth: (credential: CredentialResponse) => void
}

export const AuthForm = ({
  type,
  buttonLabel,
  redirectTo,
  redirectText,
  redirectLinkText,
  onSubmit,
  role,
  handleGoogleAuth,
}: AuthFormProps) => {
  const navigate = useNavigate()
  const isRegister = type === "register"
  const isVendorRegister = isRegister && role === "vendor"
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Existing state
  const [visible, setVisible] = useState(false)
  const [isOtpModalOpen, setOtpModalOpen] = useState(false)
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false)
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false)
  const [emailForReset, setEmailForReset] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [userdata, setUserData] = useState<User>({} as User)
  
  // Image upload state
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [showCropper, setShowCropper] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  
  const { mutate: sendVerificationOtp } = useSendOtpMutation()
  const { mutate: verifyOtp } = useVerifyOtpMutation()

  // Existing handlers
  const handleOpenOtpModal = () => {
    setOtpModalOpen(true)
  }

  const handleCloseOtpModal = () => {
    setOtpModalOpen(false)
  }

  const handleOpenForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(true)
  }

  const handleCLoseForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false)
  }

  const handleForgotPasswordSuccess = (email: string) => {
    setEmailForReset(email)
    setIsForgotPasswordModalOpen(false)
    setIsResetPasswordModalOpen(true)
  }

  const handleResetPasswordSuccess = () => {
    setIsResetPasswordModalOpen(false)
    toast.success("Password reset successfully! You can now login with your new password.")
  }

  // Image upload handlers
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB")
        return
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file")
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result as string)
        setShowCropper(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = (croppedFile: File | null) => {
    if (croppedFile) {
      setCroppedImage(croppedFile)
      const previewUrl = URL.createObjectURL(croppedFile)
      setPreviewUrl(previewUrl)
      toast.success("Image cropped successfully!")
    }
  }

  const handleRemoveImage = () => {
    setCroppedImage(null)
    setPreviewUrl(null)
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleSentOtp = (email?: string) => {
    setIsSending(true)
    sendVerificationOtp(email ?? userdata.email, {
      onSuccess: (data) => {
        toast.success(data.message)
        setIsSending(false)
      },
      onError: (err: any) => {
        toast.error(err.response.data.message)
        handleCloseOtpModal()
      },
    })
  }

  const submitRegister = () => {
     const finalUserData = isVendorRegister && croppedImage 
      ? { ...userdata, idProof:croppedImage }
      : userdata
    onSubmit(finalUserData)
  }

  const submitLogin = (email: string, pass: string) => {
    const userLoginData: any = {}
    ;(userLoginData.email = email), (userLoginData.password = pass)
    onSubmit(userLoginData)
  }

  const handleVerifyOtp = (otp: string) => {
    verifyOtp(
      { email: userdata.email, otp: otp },
      {
        onSuccess: (data) => {
          toast.success(data.message)
          if (role == "client") {
            navigate("/login")
          } else {
            navigate("/vendor/login")
          }
          submitRegister()
          setOtpModalOpen(false)
        },
        onError: (err: any) => {
          toast.error(err.response.data.message)
        },
      },
    )
  }

  const formik = useFormik({
    initialValues: isRegister
      ? {
          name: "",
          email: "",
          phone: "",
          password: "",
        }
      : {
          email: "",
          password: "",
        },
    validationSchema: isRegister ? ClientSignupSchema : signInschema,
    onSubmit: (values, actions) => {
      if (isRegister) {
        if(isVendorRegister && !croppedImage){
          toast.error("please upload your id proof")
          return
        }
        setUserData(() => values as User)
        handleSentOtp(values.email)
        
        handleOpenOtpModal()
      } else {
        submitLogin(values.email, values.password)
        actions.resetForm({
          values: {
            email: "",
            password: "",
          },
        })
      }
    },
  })

  return (
    <>
      <div className="space-y-6">
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          {type === "register" && (
            <>
              {isVendorRegister && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Image <span className="text-red-500">*</span>
                  </label>
                  
                  {!previewUrl ? (
                    <div 
                      onClick={triggerImageUpload}
                      className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50/50 transition-all duration-200 group"
                    >
                      <div className="space-y-2">
                        <div className="mx-auto  bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                          <Camera className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Upload Profile Image</p>
                          <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            triggerImageUpload()
                          }}
                        >
                          <Upload className="w-3 h-3 mr-1" />
                          Choose File
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="relative w-32 h-32 mx-auto rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
                        <img 
                          src={previewUrl} 
                          alt="Profile preview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={triggerImageUpload}
                            className="text-white border-white hover:bg-white hover:text-black text-xs"
                          >
                            <Camera className="w-3 h-3 mr-1" />
                            Change
                          </Button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <p className="text-center text-xs text-gray-500 mt-2">Profile Image Selected</p>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-1">
                <div className="relative">
                  <span className="absolute left-4 inset-y-0 flex items-center">
                    <UserIcon size={18} className="text-gray-500" />
                  </span>
                  <Input
                    placeholder="Full Name"
                    {...formik.getFieldProps("name")}
                    type="text"
                    className="pl-12 h-14 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl text-base hover:bg-gray-50 transition-colors"
                  />
                </div>
                {formik.touched.name && formik.errors.name && (
                  <p className="text-sm text-red-500">{formik.errors.name}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-1">
                <div className="relative">
                  <span className="absolute left-4 inset-y-0 flex items-center">
                    <Phone size={18} className="text-gray-500" />
                  </span>
                  <Input
                    placeholder="Phone Number"
                    type="tel"
                    className="pl-12 h-14 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl text-base hover:bg-gray-50 transition-colors"
                    {...formik.getFieldProps("phone")}
                  />
                </div>
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-sm text-red-500">{formik.errors.phone}</p>
                )}
              </div>
            </>
          )}

          {/* Email Field */}
          <div className="space-y-1">
            <div className="relative">
              <span className="absolute left-4 inset-y-0 flex items-center">
                <Mail size={18} className="text-gray-500" />
              </span>
              <Input
                placeholder="Email Address"
                type="email"
                className="pl-12 h-14 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl text-base hover:bg-gray-50 transition-colors"
                {...formik.getFieldProps("email")}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <div className="relative">
              <span className="absolute left-4 inset-y-0 flex items-center">
                <Lock size={18} className="text-gray-500" />
              </span>
              <Input
                placeholder="Password"
                type={visible ? "text" : "password"}
                className="pl-12 pr-14 h-14 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl text-base hover:bg-gray-50 transition-colors"
                {...formik.getFieldProps("password")}
              />
              <span
                className="absolute right-4 inset-y-0 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setVisible(!visible)}
              >
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>

          {type == "login" && (
            <p
              className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer transition-colors"
              onClick={handleOpenForgotPasswordModal}
            >
              Forgot your password?
            </p>
          )}

          {/* Submit Button */}
          <Button
            className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-800 text-white h-14 text-base tracking-wider font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            type="submit"
          >
            {buttonLabel}
          </Button>

          {/* Google Auth for Client Login */}
          {type === "login" && role === "client" && (
            <>
              <div className="relative flex items-center justify-center">
                <div className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
                <div className="flex-grow border-t border-gray-300" />
              </div>
              <GoogleAuthButton handleGoogleSuccess={handleGoogleAuth} />
            </>
          )}
        </form>

        {/* Redirect Link */}
        <div className="text-center pt-6">
          <Link to={redirectTo} className="group">
            <span className="text-base text-gray-600 group-hover:text-gray-800 transition-colors">
              {redirectText}{" "}
              <span className="font-medium text-gray-800 group-hover:text-black">{redirectLinkText}</span>
            </span>
          </Link>
        </div>

        {/* Modals */}
        <OTPModal
          isOpen={isOtpModalOpen}
          onClose={handleCloseOtpModal}
          onResend={handleSentOtp}
          isSending={isSending}
          onVerify={handleVerifyOtp}
        />
        <ForgotPasswordModal
          isOpen={isForgotPasswordModalOpen}
          onClose={handleCLoseForgotPasswordModal}
          onSuccess={handleForgotPasswordSuccess}
          role={role}
        />
        <ResetPasswordModal
          isOpen={isResetPasswordModalOpen}
          onClose={() => setIsResetPasswordModalOpen(false)}
          onSuccess={handleResetPasswordSuccess}
          email={emailForReset}
          role={role}
        />

        {/* Image Cropper Modal */}
        {showCropper && selectedImage && (
          <ImageCropper
            image={selectedImage}
            onCropComplete={handleCropComplete}
            aspect={1} // Square aspect ratio for profile images
            showCropper={setShowCropper}
          />
        )}
      </div>
    </>
  )
}