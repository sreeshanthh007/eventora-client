

import { Calendar, Home, Settings, User, LogOut } from "lucide-react"
import { useDispatch } from "react-redux"
import { UseLogout } from "@/hooks/auth/Uselogout"
import { VendorLogout } from "@/services/auth/authServices"
import { vendorLogout } from "@/store/slices/vendorSlice"
import { useToast } from "@/hooks/ui/UseToaster"
import { toast } from "sonner"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/pages/ui/sidebar"
import { Button } from "@/components/pages/ui/button"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar,
  },
  {
    title: "Services",
    url: "/services",
    icon: Settings,
  },
]

export function VendorSidebar() {
  const dispatch = useDispatch()
  const { showToast } = useToast()
  const { mutate: logoutReq } = UseLogout(VendorLogout)

  const handleLogout = () =>
    logoutReq(undefined, {
      onSuccess: (data) => {
        showToast(data.message, "success")
        dispatch(vendorLogout())
      },
      onError: (err: any) => {
        toast.error(err.response?.data.message)
      },
    })

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 bg-transparent"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">Vendor</p>
            <p>© 2024 All rights reserved</p>
            <p className="mt-2">Making events memorable</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
