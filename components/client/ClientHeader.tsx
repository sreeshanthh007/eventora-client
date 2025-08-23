

// import { Sheet, SheetTrigger, SheetTitle, SheetContent, SheetHeader } from "@/components/ui/sheet"
// import React, { useState } from "react"
// import { Users, Bell, Menu, Ticket, Heart, User, CreditCard, Settings, HelpCircle, LogOut, Instagram, Linkedin, Facebook } from 'lucide-react'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Separator } from "@/components/ui/separator"
// import { Button } from "@/components/ui/button"

// // Mock client data - replace with your Redux state
// const mockClient = {
//   name: "John Doe",
//   email: "john@example.com"
// }

// export const ClientHeader: React.FC = () => {
//   // Replace with your Redux selector
//   const client = mockClient // useSelector((state: RootState) => state.client.client)
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   const sidebarMenuItems = [
//     { icon: User, label: "My Profile", href: "#" },
//     { icon: Ticket, label: "My Events", href: "#" },
//     { icon: Heart, label: "Favorites", href: "#" },
//     { icon: Bell, label: "Notifications", href: "#" },
//     { icon: CreditCard, label: "Payment Methods", href: "#" },
//     { icon: Users, label: "Become a Provider", href: "#" },
//     { icon: Settings, label: "Settings", href: "#" },
//     { icon: HelpCircle, label: "Help & Support", href: "#" },
//   ]

//   const handleLogin = () => {
//     // Replace with your navigation logic
//     console.log("Navigate to login")
//   }

//   const handleLogout = () => {
//     // Replace with your logout logic
//     console.log("Logout user")
//   }

//   return (
//     <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white shadow-lg sticky top-0 z-50 border-b border-purple-500/20 backdrop-blur-md">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">
//           {/* Social Links - Hidden on mobile */}
//           <div className="hidden md:flex items-center space-x-3">
//             <Instagram className="w-5 h-5 text-purple-300 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110" />
//             <Facebook className="w-5 h-5 text-purple-300 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110" />
//             <Linkedin className="w-5 h-5 text-purple-300 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110" />
//           </div>

//           {/* Logo */}
//           <div className="flex-1 md:flex-none text-center md:text-left">
//             <div className="text-2xl md:text-3xl font-bold tracking-wider cursor-pointer group">
//               <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
//                 EVENTORA
//               </span>
//               <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-yellow-400 to-purple-500 transition-all duration-500 mx-auto md:mx-0"></div>
//             </div>
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex items-center space-x-2">
//             {/* Notifications - Only show when logged in */}
//             {client && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="hidden sm:flex text-purple-300 hover:text-white hover:bg-purple-800/50 transition-all duration-300 rounded-full relative"
//               >
//                 <Bell className="w-5 h-5" />
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
//               </Button>
//             )}

//             {/* Login Button or Hamburger Menu */}
//             {client ? (
//               // Show hamburger menu when logged in
//               <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
//                 <SheetTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="text-purple-300 hover:text-white hover:bg-purple-800/50 transition-all duration-300 rounded-full"
//                   >
//                     <Menu className="w-6 h-6" />
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent
//                   side="right"
//                   className="w-80 bg-gradient-to-b from-purple-900 to-indigo-900 text-white border-l border-purple-500/30"
//                 >
//                   <SheetHeader className="border-b border-purple-500/30 pb-4">
//                     <SheetTitle className="text-white text-left font-bold text-lg">Menu</SheetTitle>
//                   </SheetHeader>

//                   {/* User Profile Section */}
//                   <div className="py-6 border-b border-purple-500/30">
//                     <div className="flex items-center space-x-3">
//                       <Avatar className="h-12 w-12 border-2 border-purple-400 ring-2 ring-purple-300/50">
//                         <AvatarImage src="/placeholder.svg?height=48&width=48&text=User" />
//                         <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
//                           {client?.name ? client.name[0] : "U"}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <h3 className="font-semibold text-white">
//                           {client?.name || "Guest User"}
//                         </h3>
//                         {client?.email && (
//                           <p className="text-sm text-purple-300">{client.email}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Menu Items */}
//                   <nav className="py-4">
//                     <ul className="space-y-1">
//                       {sidebarMenuItems.map((item, index) => (
//                         <li key={index}>
//                           <a
//                             href={item.href}
//                             className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-purple-800/50 transition-all duration-300 group"
//                             onClick={() => setSidebarOpen(false)}
//                           >
//                             <item.icon className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors group-hover:scale-110" />
//                             <span className="font-medium">{item.label}</span>
//                           </a>
//                         </li>
//                       ))}
//                     </ul>
//                   </nav>

//                   <Separator className="bg-purple-500/30" />

//                   {/* Logout Button */}
//                   <div className="py-4">
//                     <button
//                       className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-red-900/50 transition-all duration-300 w-full text-left text-red-400 group"
//                       onClick={handleLogout}
//                     >
//                       <LogOut className="w-5 h-5 group-hover:text-red-300 group-hover:scale-110 transition-all" />
//                       <span className="font-medium group-hover:text-red-300">Sign Out</span>
//                     </button>
//                   </div>
//                 </SheetContent>
//               </Sheet>
//             ) : (
//               // Show login button when not logged in
//               <Button
//                 onClick={handleLogin}
//                 className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
//               >
//                 <User className="w-4 h-4 mr-2" />
//                 Login
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }
