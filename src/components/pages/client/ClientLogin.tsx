import { AuthLayout } from "@/components/auth/AuthLayout"
import CLientLoginImage from "../../../assets/common/ClientLoginImage.png"
import { AuthForm } from "@/components/auth/AuthForm"
import type { ILoginData } from "@/services/auth/authServices"
import { useLoginMutation } from "@/hooks/auth/userLogin"

import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { clientLogin } from "@/store/slices/clientSlice"



export const ClientLogin = () => {
 const dispatch = useDispatch()

  const {mutate:loginUser} = useLoginMutation()

  const handleLoginSubmit = (data:Omit<ILoginData,"role">)=>{
    
    loginUser(
      {...data,role:"client"},
      {
        onSuccess:(data)=>{
          toast.success(data.message)
          dispatch(clientLogin(data.user))
        },
        onError:(err)=>{
          toast.error(err.response?.data?.message)
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
      />
      </AuthLayout>
  )
}
