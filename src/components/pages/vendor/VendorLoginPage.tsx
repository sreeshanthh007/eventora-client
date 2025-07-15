import { AuthForm } from "@/components/auth/AuthForm";
import { AuthLayout } from "@/components/auth/AuthLayout";
import VendorSignInImage from "../../../assets/common/ProviderLoginImage.png"
import { useDispatch } from "react-redux";
import type { ILoginData } from "@/services/auth/authServices"
import { useLoginMutation } from "@/hooks/auth/userLogin";
import { toast } from "sonner";
import { vendorLogin } from "@/store/slices/vendorSlice";




export const VendorLoginPage = () => {

     const dispatch = useDispatch()

  const {mutate:loginUser} = useLoginMutation()

  const handleLoginSubmit = (data:Omit<ILoginData,"role">)=>{
    console.log("data in frond",data)
    loginUser(
      {...data,role:"vendor"},
      {
        onSuccess:(data)=>{
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
