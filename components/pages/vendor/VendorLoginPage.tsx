import { AuthForm } from "@/components/auth/AuthForm";
import { AuthLayout } from "@/components/auth/AuthLayout";
import VendorSignInImage from "../../../assets/common/ProviderLoginImage.png"
import { useDispatch } from "react-redux";
import type { ILoginData } from "@/services/auth/authServices"
import { useLoginMutation } from "@/hooks/auth/userLogin";
import { toast } from "sonner";
import { vendorLogin } from "@/store/slices/vendorSlice";
import { UseGoogleAuth } from "@/hooks/auth/UseGoogleAuth";
import type { CredentialResponse } from "@react-oauth/google";
import { useToast } from "@/hooks/ui/UseToaster";
import { useState } from "react";




export const VendorLoginPage = () => {
     const dispatch = useDispatch()

  const {mutate:loginUser} = useLoginMutation()
  const {mutate:googleLogin} = UseGoogleAuth()
  const {showToast} = useToast()
  const handleLoginSubmit = (data:Omit<ILoginData,"role">)=>{
  
    loginUser(
      {...data,role:"vendor"},
      {
        onSuccess:(data)=>{
         
          console.log("data",data);
          
          toast.success(data.message)
          dispatch(vendorLogin(data.user))
        },
        onError:(err)=>{
          console.log(err)
          toast.error(err.response?.data.message)
        }
      }
    )
  }
  



  const handleGoogleLogin  = (credentiaLResponse:CredentialResponse)=>{
    googleLogin(
      {
        credential: credentiaLResponse.credential as string,
        client_id:import.meta.env.VITE_GOOGLE_CLIENT_ID,
        role:"vendor"
      },

      {
        onSuccess:(data)=>{
          showToast(data.message,"success")
          dispatch(vendorLogin(data.user))
        },
        onError:(err)=>{
          showToast(err.response?.data.message,"error")
        }
      }
    )
  }

  return (
   <AuthLayout 
   imageSrc={VendorSignInImage}
   heading="Login as Provider"
   subHeading="Enter your details below"
   >

    <AuthForm
    buttonLabel="Login"
    redirectText="Didn't have an Account ?"
    redirectLinkText="Register Now"
    onSubmit={handleLoginSubmit}
    redirectTo="/vendor/register"
    type="login"
    role="vendor"
    handleGoogleAuth={handleGoogleLogin}
    />
   </AuthLayout>
  )
}
