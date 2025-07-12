import { AuthForm } from "@/components/auth/AuthForm";
import { AuthLayout } from "@/components/auth/AuthLayout";
import VendorSignInImage from "../../../assets/common/ProviderLoginImage.png"
import { useDispatch } from "react-redux";
import type { ILoginData } from "@/services/auth/authServices"
import { useLoginMutation } from "@/hooks/auth/userLogin";
import { toast } from "sonner";




export const VendorLoginPage = () => {

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
          toast.error(err.message)
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
    />
   </AuthLayout>
  )
}
