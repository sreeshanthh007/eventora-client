
import { ProfileSidebar } from "@/components/mainComponents/ProfileSidebar"
import { ChangePasswordForm } from "@/components/forms/client/ChangePasswordForm"
import { Breadcrumbs } from "@/components/common/breadCrumbs/BreadCrumbs"
import { Footer } from "@/components/mainComponents/Footer"
import { useChangePasswordMutation } from "@/hooks/client/UseClientChangePassword"
import { useToast } from "@/hooks/ui/UseToaster"

interface PasswordFormData {
  currentPassword: string
  newPassword: string
}

export default function ChangePasswordPage() {
  const { mutate: changePassword } = useChangePasswordMutation()
  const { showToast } = useToast()

  const handlePasswordChange = (data: PasswordFormData) => {
    if (data.currentPassword && data.newPassword) {
      changePassword(
        { currentPassword: data.currentPassword, newPassword: data.newPassword },
        {
          onSuccess: () => showToast("Password changed successfully!", "success"),
          onError: (err: any) => showToast(err?.response?.data?.message || "Failed to change password", "error"),
        }
      )
    } else {
      showToast("Please fill in all fields", "error")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb with border */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs role="client" />
        </div>
      </div>

      {/* Main Layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-6">
              <ProfileSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 order-1 lg:order-2">
            <div className="space-y-8">
              {/* Page Title */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Change Password</h1>
                <p className="text-gray-600 mt-2">Keep your account secure with a strong password</p>
              </div>

              {/* Form Card */}
              <div className="max-w-xl">
                <ChangePasswordForm onSubmit={handlePasswordChange} />
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}