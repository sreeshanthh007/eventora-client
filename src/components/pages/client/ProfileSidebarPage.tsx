import { ContactInfoCard } from "@/components/client/profile/ContactInfoCard"
import { ProfileHeader } from "@/components/client/profile/ProfileHeader"
import { Breadcrumbs } from "@/components/common/breadCrumbs/BreadCrumbs"
import { Footer } from "@/components/mainComponents/Footer"
import { ProfileSidebar } from "@/components/mainComponents/ProfileSidebar"
import { useUpdatePersonalInformation } from "@/hooks/client/UseUpdatePersonal-information"


export default function ProfilePage() {
  const { mutate: updatePersonalInformation } = useUpdatePersonalInformation()

  const handleUpdatePersonalInformation = (updateData: Partial<{name: string, phone: string}>) => {
    updatePersonalInformation(updateData);
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProfileSidebar />
            </div>

            <div className="lg:col-span-3">
              <div className="space-y-6">
                <ProfileHeader />
                <ContactInfoCard onUpdateClient={handleUpdatePersonalInformation} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}