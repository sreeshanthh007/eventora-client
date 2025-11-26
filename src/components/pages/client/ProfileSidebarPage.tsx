
import { ContactInfoCard } from "@/components/client/profile/ContactInfoCard"
import { ProfileHeader } from "@/components/client/profile/ProfileHeader"
import { Breadcrumbs } from "@/components/common/breadCrumbs/BreadCrumbs"
import { Footer } from "@/components/mainComponents/Footer"
import { ProfileSidebar } from "@/components/mainComponents/ProfileSidebar"
import { useUpdatePersonalInformation } from "@/hooks/client/UseUpdatePersonal-information"

export default function ProfilePage() {
  const { mutate: updatePersonalInformation } = useUpdatePersonalInformation()

  const handleUpdatePersonalInformation = (updateData: Partial<{ name: string; phone: string }>) => {
    updatePersonalInformation(updateData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb with top border - consistent with other pages */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs role="client" />
        </div>
      </div>

      {/* Main Content + Sidebar */}
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
            <div className="space-y-6">
              <ProfileHeader />
              <ContactInfoCard onUpdateClient={handleUpdatePersonalInformation} />
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}