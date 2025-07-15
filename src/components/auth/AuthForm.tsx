import { Button } from '../pages/ui/button';
import { Input } from '../pages/ui/input';
import {toast} from "sonner"

import OTPModal from '../modals/OTPModal';

import type {  User } from '@/types/User';
import { useSendOtpMutation } from '@/hooks/auth/UseSendOtp';
import { useVerifyOtpMutation } from '@/hooks/auth/UseVerifyOtp';
import { Eye , EyeOff , UserIcon, Phone, Mail , Lock } from 'lucide-react';
import { ForgotPasswordModal } from '../modals/ForgotPasswordModal';
import { ResetPasswordModal } from '../modals/ForgotResetPasswordModal';
import ClientSignupSchema from '@/utils/validations/client.signUp.validator';

import {useFormik} from "formik"

import { useState } from 'react';
import { signInschema } from '@/utils/validations/signIn.validator';
import { Link, useNavigate } from 'react-router-dom';


interface AuthFormProps{
    type: "login" | "register";
    buttonLabel:string;
    redirectTo:string;
    redirectText:string;
    redirectLinkText:string;
    role?:"client" | "vendor"
    onSubmit:(data:User)=>void
}

export const AuthForm = ({
  type,
  buttonLabel,
  redirectTo,
  redirectText,
  redirectLinkText,
  onSubmit,
  role
}: AuthFormProps) => {
  const navigate = useNavigate()
  const isRegister = type === "register"
  const [visible,setVisible] = useState(false)
  const [isOtpModalOpen, setOtpModalOpen] = useState(false)
  const [isForgotPasswordModalOpen,setIsForgotPasswordModalOpen] = useState(false)
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false) 
  const [emailForReset, setEmailForReset] = useState("") 
  const [isSending,setIsSending] = useState(false)
  const [userdata,setUserData] = useState<User>({} as User)

  const {mutate:sendVerificationOtp} = useSendOtpMutation()
  const {mutate:verifyOtp} = useVerifyOtpMutation()

  const handleOpenOtpModal = ()=>{
    setOtpModalOpen(true)
  }

  const handleCloseOtpModal = ()=>{
    setOtpModalOpen(false)
  }

  const handleOpenForgotPasswordModal=()=>{
    setIsForgotPasswordModalOpen(true)
  }

  const handleCLoseForgotPasswordModal = ()=>{
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

  const handleSentOtp = (email?:string)=>{
    setIsSending(true)
    sendVerificationOtp(email ?? userdata.email,{
      onSuccess:(data)=>{
        toast.success(data.message)
        setIsSending(false)
      },
      onError:(err:any)=>{
        toast.error(err.response.data.message)
        handleCloseOtpModal()
      } 
    })
  }

  const submitRegister = ()=>{
    onSubmit(userdata)
  }

  const submitLogin = (email:string,pass:string)=>{
    let userLoginData : any = {}
    userLoginData.email = email,
    userLoginData.password = pass
    onSubmit(userLoginData)
    console.log(userLoginData)
  }

  const handleVerifyOtp = (otp:string)=>{
    verifyOtp(
      {email:userdata.email,otp:otp},
      {
        onSuccess:(data)=>{
          toast.success(data.message)
          if(role=="client"){
            navigate("/login")
          }else{
            navigate("/vendor/login")
          }
          
          submitRegister()
          setOtpModalOpen(false)
        },
        onError:(err:any)=>{
          toast.error(err.response.data.message)
        },
      }
    );
  }

  const formik = useFormik({
    initialValues: isRegister
      ? {
          name: "",
          email: "", 
          phone: "",
          password: "",
          confirmPassword: ""
        }
      : {
          email: "",
          password: ""
        },
    validationSchema: isRegister ? ClientSignupSchema : signInschema,
    onSubmit: (values,actions) => {
      if (isRegister) {
        setUserData(() => values as User);
        handleSentOtp(values.email);
        handleOpenOtpModal();
      } else {
        submitLogin(values.email,values.password)
        actions.resetForm({
          values:{
            email:"",
            password:""
          }
        })
      }
    }
  });

  return (
    <div className="space-y-6">
      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        {type === "register" && (
          <>
            <div className="relative">
              <UserIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="FullName"
                {...formik.getFieldProps("name")}
                type="text"
                className="pl-12 h-14 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl text-base hover:bg-gray-50 transition-colors"
              />
              {formik.touched.name && formik.errors.name && (
                  <p className="text-sm text-red-500">
                  {formik.errors.name}
                </p>
              )}
            </div>
            <div className="relative">
              <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="PhoneNumber"
                type="tel"
                className="pl-12 h-14 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl text-base hover:bg-gray-50 transition-colors"
                {...formik.getFieldProps("phone")}
              />
            
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-sm text-red-500">
                  {formik.errors.phone}
                </p>
              )}
            </div>
          </>
        )}

        <div className="relative">
          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Email Address"
            type="email"
            className="pl-12 h-14 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl text-base hover:bg-gray-50 transition-colors"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500">
                  {formik.errors.email}
                </p>
          )}
        </div>

        <div className="relative">
          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Password"
            type={visible ? "text" : "password"}
            className="pl-12 pr-14 h-14 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl text-base hover:bg-gray-50 transition-colors"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">
                  {formik.errors.password}
                </p>
              )}
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => setVisible(!visible)}
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
               
        </div>

          {type === "register" && (
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Confirm Password"
              type={visible ? "text" : "password"}
              className="pl-12 pr-14 h-14 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl text-base hover:bg-gray-50 transition-colors"
              {...formik.getFieldProps("confirmPassword")}
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-sm text-red-500">{formik.errors.confirmPassword}</p>
            )}
          </div>
        )}
        
        {type=="login" && (
          <p 
            className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer transition-colors"
            onClick={handleOpenForgotPasswordModal}
          >
            forgot your password ?
          </p>
        )}
        
        <Button className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-800 text-white h-14 text-base tracking-wider font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl" type='submit'>
          {buttonLabel}
        </Button>
      </form>

      <div className="text-center pt-6">
        <Link to={redirectTo} className="group">
          <span className="text-base text-gray-600 group-hover:text-gray-800 transition-colors">
            {redirectText} <span className="font-medium text-gray-800 group-hover:text-black">{redirectLinkText}</span>
          </span>
        </Link>
      </div>
      
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
    </div>
  )
};