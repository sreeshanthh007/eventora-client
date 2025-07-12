    
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/pages/ui/avatar"
import { Separator } from "@/components/pages/ui/separator"
import { Button } from "../pages/ui/button"    
import { Instagram , Linkedin , Facebook } from "lucide-react"
    
 export const ClientHeader : React.FC = ({client}) => {

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
        <header className="bg-white text-black shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              <Instagram className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer transition-colors duration-200" />
              <Facebook className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer transition-colors duration-200" />
              <Linkedin className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer transition-colors duration-200" />
            </div>

            {/* Logo */}
            <div className="text-2xl md:text-3xl font-bold tracking-wider text-black hover:text-gray-700 transition-colors cursor-pointer">
              EVENTORA
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Become Provider Button - Hidden on small screens */}
              <Button
                variant="outline"
                className="hidden md:flex items-center space-x-2 border-black text-black hover:bg-black hover:text-white transition-all duration-200 font-medium px-4 py-2 bg-transparent"
              >
                <Users className="w-4 h-4" />
                <span>BECOME A PROVIDER</span>
              </Button>

              {/* Notifications - Hidden on small screens */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex text-gray-600 hover:text-black hover:bg-gray-100 transition-colors duration-200"
              >
                <Bell className="w-5 h-5" />
              </Button>

              {/* Hamburger Menu */}
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-black hover:bg-gray-100 transition-colors duration-200 p-2"
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-white text-black border-l border-gray-200">
                  <SheetHeader className="border-b border-gray-200 pb-4">
                    <SheetTitle className="text-black text-left font-bold text-lg">Menu</SheetTitle>
                  </SheetHeader>

                  {/* Profile Section */}
                  <div className="py-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12 border-2 border-gray-200">
                        <AvatarImage src="/placeholder.svg?height=48&width=48&text=User" />
                        <AvatarFallback className="bg-gray-100 text-black font-semibold">JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-black">John Doe</h3>
                        <p className="text-sm text-gray-600">john.doe@email.com</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <nav className="py-4">
                    <ul className="space-y-1">
                      {sidebarMenuItems.map((item, index) => (
                        <li key={index}>
                          <a
                            href={item.href}
                            className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
                            onClick={() => setSidebarOpen(false)}
                          >
                            <item.icon className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
                            <span className="font-medium">{item.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <Separator className="bg-gray-200" />

                  {/* Logout */}
                  <div className="py-4">
                    <button className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-red-50 transition-colors duration-200 w-full text-left text-red-600 group">
                      <LogOut className="w-5 h-5 group-hover:text-red-700" />
                      <span className="font-medium group-hover:text-red-700">Sign Out</span>
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      )
    }
    
   