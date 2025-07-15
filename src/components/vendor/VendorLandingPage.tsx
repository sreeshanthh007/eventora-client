
import { VendorHeader } from './VendorHeader'
import {VendorContentSection} from "./VendorContentSection"
import {VendorSidebar} from "./VendorSidebar"
import {VendorFooter} from "../mainComponents/VendorFooter"
export const VendorLandingPage = () => {
  return (
   <div className="min-h-screen bg-gray-100">
      <VendorHeader />
      <div className="flex max-w-7xl mx-auto p-4 gap-6">
        <VendorSidebar />
        <VendorContentSection />
      </div>
      <VendorFooter />
    </div>
  )
}
