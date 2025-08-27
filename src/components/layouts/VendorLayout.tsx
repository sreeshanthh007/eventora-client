import type React from "react"
import { SidebarProvider } from "../pages/ui/sidebar"
import { VendorSidebar } from "@/components/vendor/VendorSidebar"
import { VendorHeader } from "@/components/vendor/VendorHeader"
import { VendorFooter } from "@/components/mainComponents/VendorFooter"
import { useSelector } from "react-redux"
import { useAppDispatch, type RootState } from "@/store/store"
import { ConnectSocket } from "@/lib/socket/ConnectSocket"
import { useEffect } from "react"
import { refreshVendorSessionThunk } from "@/store/slices/vendorSlice"

interface VendorLayoutProps {
  children: React.ReactNode
}

export function VendorLayout({ children }: VendorLayoutProps) {
  const dispatch = useAppDispatch()
  const vendor = useSelector((state:RootState)=>state.vendor.vendor)
useEffect(() => {
    dispatch(refreshVendorSessionThunk())
}, [dispatch])
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <VendorSidebar />
        <div className="flex flex-1 flex-col">
          <VendorHeader />
          {vendor && <ConnectSocket user={vendor}/>}
          <main className="flex-1 p-6 bg-background">{children}</main>
          <VendorFooter />
        </div>
      </div>
    </SidebarProvider>
  )
}
