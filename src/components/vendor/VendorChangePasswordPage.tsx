import { VendorChangePasswordForm } from "@/components/forms/vendor/VendorChangePasswordForm"
import { VendorLayout } from "../layouts/VendorLayout"
import { useVendorChangePasswordMutation } from "@/hooks/vendor/auth/UseVendorChangePassword"
import { useToast } from "@/hooks/ui/UseToaster"

interface PasswordFormData {
  currentPassword: string
  newPassword: string
}

export default function VendorChangePasswordPage() {

    const {mutate:changePasssword} = useVendorChangePasswordMutation()
    const {showToast} = useToast()
    
  function handlePasswordChange(data: PasswordFormData) {
   
    if(data.newPassword && data.currentPassword){
        changePasssword({currentPassword:data.currentPassword,newPassword:data.newPassword})
    }else{
        showToast("Please fill in all fields","error")
    }
  }

  return (
    <VendorLayout>
      <div className="flex min-h-[calc(100dvh-12rem)] flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold text-balance text-foreground mb-4 text-center">Change Password</h1>
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Enter your current password and your new password to update your credentials.
          </p>
          <VendorChangePasswordForm onSubmit={handlePasswordChange} />
        </div>
      </div>
    </VendorLayout>
  )
}