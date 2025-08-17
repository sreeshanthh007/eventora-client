import type React from "react"
import { SidebarProvider } from "../ui/sidebar"
import { VendorSidebar } from "@/components/vendor/VendorSidebar"
import { VendorHeader } from "@/components/vendor/VendorHeader"
import { VendorFooter } from "@/components/mainComponents/VendorFooter"

interface VendorLayoutProps {
  children: React.ReactNode
}

export function VendorLayout({ children }: VendorLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <VendorSidebar />
        <div className="flex flex-1 flex-col">
          <VendorHeader />
          <main className="flex-1 p-6 bg-background">{children}</main>
          <VendorFooter />
        </div>
      </div>
    </SidebarProvider>
  )
}
