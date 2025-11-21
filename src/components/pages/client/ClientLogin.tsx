import { AuthLayout } from "@/components/auth/AuthLayout"
import CLientLoginImage from "../../../assets/common/ClientLoginImage.png"
import { AuthForm } from "@/components/auth/AuthForm"
import type { ILoginData } from "@/services/auth/authServices"
import { useLoginMutation } from "@/hooks/auth/userLogin"

import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { clientLogin } from "@/store/slices/clientSlice"
import type { CredentialResponse } from "@react-oauth/google"
import { UseGoogleAuth } from "@/hooks/auth/UseGoogleAuth"
import { useToast } from "@/hooks/ui/UseToaster"
import { requestNotificationPermission } from "@/services/firebase/notification"
import { UseSaveFcmTokenMutation } from "@/hooks/auth/UseSaveFcmToken"



export const ClientLogin = () => {
 const dispatch = useDispatch()

  const {mutate:loginUser} = useLoginMutation()
  const {mutate:GoogleLogin} = UseGoogleAuth()
  const {mutate:saveFcmToken} = UseSaveFcmTokenMutation()
  const {showToast} = useToast()
  const handleLoginSubmit = (data:Omit<ILoginData,"role">)=>{
    
    loginUser(
      {...data,role:"client"},
      {
        onSuccess:async(data)=>{
         
          toast.success(data.message)
          dispatch(clientLogin(data.user));
          const fcmToken = await requestNotificationPermission()

          if(fcmToken){
            saveFcmToken({
              userId:data.user._id,
              fcmToken:fcmToken,
              role:"client"
            });
          }

        },
        onError:(err)=>{
          toast.error(err.response?.data?.message)
        }
      }
    )
  }


  const googleAuth = (credentiaLResponse : CredentialResponse)=>{
    GoogleLogin(
      {
        credential:credentiaLResponse.credential as string,
        client_id:import.meta.env.VITE_GOOGLE_CLIENT_ID,
        role:"client"
      },
      {
        onSuccess:(data)=>{
          showToast(data.message,"success")
          dispatch(clientLogin(data.user))

        },
        onError:(err:Error)=>{
          showToast(err.response?.data?.message,"error")
        }
      }
    )
  }
  return (  
    <AuthLayout
      imageSrc={CLientLoginImage}
      heading="Log in into Exclusive"
      subHeading="Enter your details below"
    >
      <AuthForm 
      type="login" 
      buttonLabel="Login" 
      redirectTo="/register"
      redirectText="Don't have an Account ?" 
      redirectLinkText="Register now"
      onSubmit={handleLoginSubmit}
      handleGoogleAuth={googleAuth}
      role="client"
      />
      </AuthLayout>
  )
}
