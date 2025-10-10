import { Calendar, Home, Settings, User, LogOut, UserCheck, ChartAreaIcon, Lock } from "lucide-react"
import {useSelector } from "react-redux"
import { UseLogout } from "@/hooks/auth/Uselogout"
import { VendorLogout } from "@/services/auth/authServices"
import { refreshVendorSessionThunk, vendorLogout } from "@/store/slices/vendorSlice"
import { useToast } from "@/hooks/ui/UseToaster"
import { toast } from "sonner"
import { CheckVerifiedModal } from "../modals/CheckVerifiedModal"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/pages/ui/sidebar"
import { Button } from "@/components/pages/ui/button"
import { Link } from "react-router-dom"
import { useAppDispatch, type RootState } from "@/store/store"
import { useState } from "react"
import { useResendVerificationMutation } from "@/hooks/vendor/UseResendVerification"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Profile",
    url: "/vendor/profile",
    icon: User,
  },
  {
    title: "Check status",
    icon: UserCheck, 
  },
  {
    title: "Events",
    url: "/vendor/events",
    icon: Calendar,
  },
  {
    title: "Services",
    url: "/vendor/services",
    icon: Settings,
  },

  {
    title: "Change Password",
    url: "/vendor/change-password",
    icon: Lock,
  },

  {
    title:"Analytics",
    url:'/vendor/dashboard',
    icon:ChartAreaIcon
  }
]

export function VendorSidebar() {
  const dispatch =useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const { showToast } = useToast()
  const vendor = useSelector((state:RootState)=>state.vendor.vendor) 
  const { mutate: logoutReq } = UseLogout(VendorLogout)
  const {mutate:resendVerification} = useResendVerificationMutation()
  
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

  const checkIsVerified = () => {
    setIsOpen(true)
  }

  const handleReverify = ()=>{
    if(!vendor?._id) return
     resendVerification(
      vendor._id
    );
    dispatch(refreshVendorSessionThunk())
  }
  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {item.url ? (
                        <Link to={item.url} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      ) : (
                        <button
                          onClick={item.title === "Check status" ? checkIsVerified : undefined}
                          className="flex items-center gap-2 w-full text-left"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </button>
                      )}
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

      <CheckVerifiedModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userName={vendor?.name || "Vendor"}
        submissionDate={vendor?.submissionDate}
        status={vendor?.vendorStatus}
        rejectReason={vendor?.rejectionReason}
        onReVerify={handleReverify}
      />
    </>
  )
}
