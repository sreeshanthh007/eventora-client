import { AuthForm } from "@/components/auth/AuthForm";
import { AuthLayout } from "@/components/auth/AuthLayout";

import vendorSignUpImage from "../../../assets/common/ProviderSignupImage.png"
import { useRegisterMutation } from "@/hooks/auth/userRegister";
import type { User } from '@/types/User'
import { toast } from "sonner";

export const VendorRegisterPage = () => {
   const {mutate:registerUser} = useRegisterMutation()

  const handleSignupSubmit = (data:Omit<User,"role">)=>{
    registerUser(
      {...data,role:"vendor"},
      {
        onSuccess:(data)=>{
          toast.success(data.message)
        },

        onError:((err)=>{
          console.log(err)

        })

      }
    )
  }
  return (
    <AuthLayout 
    imageSrc={vendorSignUpImage}
    heading="Create An Account as an Provider"
    subHeading="Enter your details below"
    >
        <AuthForm
        buttonLabel="Register"
        redirectText="Already have an Account ?"
        redirectLinkText="login now"
        redirectTo="/vendor/login"
        type="register"
        onSubmit={handleSignupSubmit}
        role="vendor"
        />
    </AuthLayout>
  )
}
