    
import {Sheet , SheetTrigger , SheetTitle , SheetContent,SheetHeader} from "@/components/pages/ui/sheet"
import React, { useState } from "react"

import { Users , Bell , Menu ,
    Ticket,
    Heart,
    User,
    CreditCard,
    Settings,
    HelpCircle,
    LogOut

} from "lucide-react"

import type { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { clientLogout } from "@/store/slices/clientSlice";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/pages/ui/avatar"
import { Separator } from "@/components/pages/ui/separator"
import { Button } from "../pages/ui/button"    
import { Instagram , Linkedin , Facebook } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";

  
 export const ClientHeader : React.FC = () => {
  const client = useSelector((state:RootState)=>state.client.client)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
    const sidebarMenuItems = [
    { icon: User, label: "My Profile", href: "#" },
    { icon: Ticket, label: "My Events", href: "#" },
    { icon: Heart, label: "Favorites", href: "#" },
    { icon: Bell, label: "Notifications", href: "#" },
    { icon: CreditCard, label: "Payment Methods", href: "#" },
    { icon: Users, label: "Become a Provider", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
    { icon: HelpCircle, label: "Help & Support", href: "#" },
  ]


    const [sidebarOpen, setSidebarOpen] = useState(false)
     return (
    <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white shadow-2xl sticky top-0 z-50 border-b border-purple-500/30 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
    
          <div className="flex items-center space-x-4">
            <Instagram className="w-5 h-5 text-purple-300 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" />
            <Facebook className="w-5 h-5 text-purple-300 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" />
            <Linkedin className="w-5 h-5 text-purple-300 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" />
          </div>

       
          <div className="text-2xl md:text-3xl font-bold tracking-wider cursor-pointer group">
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
              EVENTORA
            </span>
            <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-yellow-400 to-purple-500 transition-all duration-500 mx-auto"></div>
          </div>

        
          <div className="flex items-center space-x-3"> 
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-purple-300 hover:text-white hover:bg-purple-800/50 transition-all duration-300 rounded-full relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            </Button>

           
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-purple-300 hover:text-white hover:bg-purple-800/50 transition-all duration-300 p-2 rounded-full"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-gradient-to-b from-purple-900 to-indigo-900 text-white border-l border-purple-500/30"
              >
                <SheetHeader className="border-b border-purple-500/30 pb-4">
                  <SheetTitle className="text-white text-left font-bold text-lg">Menu</SheetTitle>
                </SheetHeader>

              
                <div className="py-6 border-b border-purple-500/30">
                 <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12 border-2 border-purple-400 ring-2 ring-purple-300/50">
                      <AvatarImage src={"" || "/placeholder.svg?height=48&width=48&text=User"} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                        {client?.name ? client.name[0] : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white">
                        {client?.name || "Guest User"}
                      </h3>
                      {client?.email && (
                        <p className="text-sm text-purple-300">{client.email}</p>
                      )}
                    </div>
                  </div>
                </div>

          
                <nav className="py-4">
                  <ul className="space-y-1">
                    {sidebarMenuItems.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.href}
                          className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-purple-800/50 transition-all duration-300 group"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <item.icon className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors group-hover:scale-110" />
                          <span className="font-medium">{item.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <Separator className="bg-purple-500/30" />

        
               <div className="py-4">
                        {client ? (
                          <button
                            className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-red-900/50 transition-all duration-300 w-full text-left text-red-400 group"
                            onClick={() => {
                              dispatch(clientLogout());
                              navigate("/login");
                            }}
                          >
                            <LogOut className="w-5 h-5 group-hover:text-red-300 group-hover:scale-110 transition-all" />
                            <span className="font-medium group-hover:text-red-300">Sign Out</span>
                          </button>
                        ) : (
                          <button
                            className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-blue-900/50 transition-all duration-300 w-full text-left text-blue-400 group"
                            onClick={() => navigate("/login")}
                          >
                            <User className="w-5 h-5 group-hover:text-blue-300 group-hover:scale-110 transition-all" />
                            <span className="font-medium group-hover:text-blue-300">Login</span>
                          </button>
                        )}
                      </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
    }
    
   