import { AuthForm } from '@/components/auth/AuthForm'
import { AuthLayout } from '@/components/auth/AuthLayout'
import clientRegisterImage from "../../../assets/common/ClientSignupImage.png"
import { useRegisterMutation } from '@/hooks/auth/userRegister'
import type { User } from '@/types/User'
import { useToast } from '@/hooks/ui/UseToaster'

export const ClientRegister = () => {
  const {mutate:registerUser} = useRegisterMutation()
  const {showToast} = useToast()
  const handleSignupSubmit = (data:Omit<User,"role">)=>{
    registerUser(
      {...data,role:"client"},
      {
        onSuccess:(data)=>{
          showToast(data.message,"success")
        },

        onError:((err)=>{
         showToast(err.response?.data?.message,"error")
        })

      }
    )
  }
  return (
   <>
   
   <AuthLayout
   imageSrc={clientRegisterImage}
   heading='Sign up to the Exclusive'
   subHeading='Enter  your details below'
   >
    <AuthForm
    type='register'
    buttonLabel='Register'
    redirectTo='/login'
    redirectText='Already have an Account'
    redirectLinkText='Login now'
    onSubmit={handleSignupSubmit}
    role='client'
    />
   </AuthLayout>
   </>
  )
}
