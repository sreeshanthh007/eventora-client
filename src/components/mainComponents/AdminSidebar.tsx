
import type * as React from "react"
import { BarChart3, Building2, Home, Package, Settings, ShoppingCart, Users, Wallet , LogOut } from "lucide-react"

import { Sidebar , SidebarContent , SidebarGroup, SidebarFooter, SidebarHeader , SidebarMenu ,
    SidebarMenuItem ,SidebarMenuButton , SidebarGroupLabel, SidebarGroupContent,SidebarRail
  }
 from "../pages/ui/sidebar"
import { Avatar , AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { DropdownMenu,  DropdownMenuContent , DropdownMenuTrigger , DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { adminLogout } from "@/store/slices/adminSlice"
import type { RootState } from "@/store/store"
import { UseLogout } from "@/hooks/auth/Uselogout"
import { AdminLogout } from "@/services/auth/authServices"
import { toast } from "sonner"


// Menu items
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Clients",
      url: "/admin/clients",
      icon: Users,
    },
    {
      title: "Vendors",
      url: "/admin/vendors",
      icon: Building2,
    },
    {
      title: "Products",
      url: "#",
      icon: Package,
    },
    {
      title: "Orders",
      url: "#",
      icon: ShoppingCart,
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart3,
    },
    {
      title: "Payments",
      url: "#",
      icon: Wallet,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },  
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const dispatch = useDispatch()
    const admin = useSelector((state:RootState)=>state.admin.admin)
    const {mutate:logoutReq} = UseLogout(AdminLogout)
   
    const handleLogout = ()=>{
      logoutReq(undefined,
        {
          onSuccess:(data)=>{
            toast.success(data.message)
            dispatch(adminLogout())
          },
          onError:(err:any)=>{
            toast.error(err.response?.data.message)
          }
        }
      )
    }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#" className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BarChart3 className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Admin Panel</span>
                  <span className="text-xs text-muted-foreground">v2.1.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback className="rounded-lg">AD</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                 
                  {admin?.email && 
                    <span className="truncate text-xs text-muted-foreground">{admin.email}</span>
                  }
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span onClick={handleLogout}>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
