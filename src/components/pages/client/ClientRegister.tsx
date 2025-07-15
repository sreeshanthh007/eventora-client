import { AuthForm } from '@/components/auth/AuthForm'
import { AuthLayout } from '@/components/auth/AuthLayout'
import clientRegisterImage from "../../../assets/common/ClientSignupImage.png"
import { useRegisterMutation } from '@/hooks/auth/userRegister'
import type { User } from '@/types/User'
import { toast } from 'sonner'

export const ClientRegister = () => {
  const {mutate:registerUser} = useRegisterMutation()

  const handleSignupSubmit = (data:Omit<User,"role">)=>{
    registerUser(
      {...data,role:"client"},
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
