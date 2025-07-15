import { Button } from "../pages/ui/button"
import { Bell, MessageSquare } from "lucide-react"
import { Avatar ,AvatarFallback } from "@radix-ui/react-avatar"
import type React from "react"

export const VendorHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">EVENTORA</h1>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages
          </Button>
          <Avatar className="bg-green-600">
            <AvatarFallback className="bg-green-600 text-white font-semibold">V</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
