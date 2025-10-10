
import { ProfileSidebar } from "@/components/mainComponents/ProfileSidebar"
import { ChangePasswordForm } from "@/components/forms/client/ChangePasswordForm"
import { useChangePasswordMutation } from "@/hooks/client/UseClientChangePassword"
import { useToast } from "@/hooks/ui/UseToaster"


interface passwordFormData{
    currentPassword:string,
    newPassword:string,
}
export default function ChangePasswordPage() {

      const {mutate:changePassword} = useChangePasswordMutation()
      const {showToast} = useToast()
    function handlePasswordChange(data:passwordFormData){

      if(data.currentPassword && data.newPassword){
        changePassword({currentPassword:data.currentPassword,newPassword:data.newPassword})
      }else{
        showToast("Please fill in all fields","error")
      }
    }

  return (
    <main className="min-h-[calc(100dvh-0px)]">
      <section className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <aside className="md:col-span-4 lg:col-span-3">
            <ProfileSidebar />
          </aside>

          <div className="md:col-span-8 lg:col-span-9">
            <div className="max-w-xl">
              <ChangePasswordForm onSubmit={handlePasswordChange} />
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
