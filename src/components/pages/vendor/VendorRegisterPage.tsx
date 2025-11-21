import { AuthForm } from "@/components/auth/AuthForm";
import { AuthLayout } from "@/components/auth/AuthLayout";

import vendorSignUpImage from "../../../assets/common/ProviderSignupImage.png"
import { useRegisterMutation } from "@/hooks/auth/userRegister";
import type { IVendor, } from '@/types/User'
import { toast } from "sonner";
import { uploadImageToCloudinarySigned } from "@/services/cloudinary/cloudinary";
import { useToast } from "@/hooks/ui/UseToaster";


export const VendorRegisterPage = () => {
   const {mutate:registerUser} = useRegisterMutation()
  const {showToast} = useToast()
  const handleSignupSubmit = async(data:Omit<IVendor,"role">)=>{
    
   let uploadedImageUrl: string | null = null;
   
   if(data.idProof instanceof File){  
    uploadedImageUrl = await uploadImageToCloudinarySigned(data.idProof as File,"vendor-id-proofs")
    
    if(!uploadedImageUrl){
    toast.error("failed to upload")
    return
   }
   }
    registerUser(
      {...data,role:"vendor",idProof:uploadedImageUrl || ""},
      {
        onSuccess:(data)=>{
          toast.success(data.message) 
        },

        onError:((err)=>{
          
          showToast(err.response?.data?.message,"error")
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
