import { SidebarTrigger } from "@/components/pages/ui/sidebar"
import { VendorNotificationPopover } from "../common/card/VendorNotificationPopOver"

export function VendorHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
      <SidebarTrigger className="-ml-1" />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl text-primary font-serif">EVENTORA</h1>
        </div>
        <VendorNotificationPopover />
      </div>
    </header>
  )
}