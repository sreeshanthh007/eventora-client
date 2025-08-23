
import { ContactInfoCard } from "@/components/client/profile/ContactInfoCard"
import { ProfileHeader } from "@/components/client/profile/ProfileHeader"
import { Breadcrumbs } from "@/components/common/breadCrumbs/BreadCrumbs"
import { Footer } from "@/components/mainComponents/Footer"
import { ProfileSidebar } from "@/components/mainComponents/ProfileSidebar"
import type { RootState } from "@/store/store"
import { useSelector } from "react-redux"




export default function ProfilePage() {
  const client = useSelector((state:RootState)=>state.client.client)
  console.log("client",client)
  return (
   <>
    <div className="min-h-screen bg-gray-50">
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs/>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-6">
              <ProfileHeader client={client} />
              <ContactInfoCard  client={client}/>
            </div>
          </div>
        </div>
      </div>
     <Footer/>
    </div>
   
   
   </>
  )
}
