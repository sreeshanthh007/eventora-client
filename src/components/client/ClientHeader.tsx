import {Sheet , SheetTrigger  , SheetContent,SheetHeader} from "../pages/ui/sheet"
import React, { useState } from "react"
import { Users, Bell, Menu, Ticket, Heart, User, CreditCard, Settings, HelpCircle, LogOut } from 'lucide-react'
import type { RootState } from "@/store/store"
import { Link, useNavigate } from "react-router-dom"
import { clientLogout } from "@/store/slices/clientSlice"
import { Avatar, AvatarFallback, AvatarImage } from "../pages/ui/avatar"
import { Separator } from "../pages/ui/separator"
import { Button } from "../pages/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { UseLogout } from "@/hooks/auth/Uselogout"
import { logOutClient } from "@/services/auth/authServices"
import { toast } from "sonner"
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage"

export const ClientHeader: React.FC = () => {
  const client = useSelector((state: RootState) => state.client.client);
  console.log("client from header",client)
  const navigate = useNavigate()
  
  const sidebarMenuItems = [
    { icon: User, label: "My Profile", href: "/profile" },
    { icon: Ticket, label: "My Events", href: "#" },
    { icon: Heart, label: "Favorites", href: "#" },
    { icon: Bell, label: "Notifications", href: "#" },
    { icon: CreditCard, label: "Payment Methods", href: "#" },
    { icon: Users, label: "Become a Provider", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
    { icon: HelpCircle, label: "Help & Support", href: "#" },
  ]
  
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const dispatch = useDispatch()
  const { mutate: logoutReq } = UseLogout(logOutClient)
  
  const handleLogout = () => {
    logoutReq(undefined, {
      onSuccess: (data) => {
        dispatch(clientLogout())
        toast.success(data.message)
      },
      onError: (err: any) => {
        toast.error(err.response?.data.message)
      }
    })
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="text-2xl md:text-3xl  text-gray-900 cursor-pointer">
            EVENTORA
          </div>
          
          {/* Navigation Menu - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Home
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Events
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Services
            </Link>
          </nav>
          
         
          <div className="flex items-center space-x-3">
            {!client ? (
              <Button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                Login
              </Button>
            ) : (
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-80 bg-white border-l border-gray-200"
                >
                  <SheetHeader className="border-b border-gray-200 pb-4">
                    {/* <SheetTitle className="text-gray-900 text-left font-semibold text-lg">Menu</SheetTitle> */}
                  </SheetHeader>
                  
                  {/* User Profile */}
                  <div className="py-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12 border border-gray-200">
                        <AvatarImage src={client.profileImage ? getCloudinaryImageUrl(client.profileImage) : "/placeholder"} />
                        <AvatarFallback className="bg-gray-100 text-gray-700 font-semibold">
                          {client?.name ? client.name[0] : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {client?.name}
                        </h3>
                        {client?.email && (
                          <p className="text-sm text-gray-600">{client.email}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation Menu */}
                  <nav className="py-4">
                    <ul className="space-y-1">
                      {sidebarMenuItems.map((item, index) => (
                        <li key={index}>
                          <a
                            href={item.href}
                            className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                            onClick={() => setSidebarOpen(false)}
                          >
                            <item.icon className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                            <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  
                  <Separator className="bg-gray-200" />
                  
                  <div className="py-4">
                    <button
                      className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-red-50 transition-colors duration-200 w-full text-left text-red-600 group"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-5 h-5 group-hover:text-red-700" />
                      <span className="font-medium group-hover:text-red-700">Sign Out</span>
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
