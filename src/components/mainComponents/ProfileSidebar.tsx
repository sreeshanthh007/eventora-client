import { User, Ticket, CreditCard, LogOut, MessageCircle, Handshake, Lock } from "lucide-react"
import { Card } from "@/components/pages/ui/card"
import { Link, useLocation } from "react-router-dom" 
import { UseLogout } from "@/hooks/auth/Uselogout"
import { logOutClient } from "@/services/auth/authServices"
import { clientLogout } from "@/store/slices/clientSlice"
import { useToast } from "@/hooks/ui/UseToaster"
import { useAppDispatch } from "@/store/store"

const menuItems = [
  {
    icon: User,
    label: "My Profile",
    to: "/profile", 
    active: true,
    description: "Personal information",
  },
  {
    icon: Ticket,
    label: "My Events",
    to: "/booked-events", 
    active: false,
    description: "Upcoming and past events",
  },
  {
    icon: MessageCircle,
    label: "Chats",
    to: "/chat", 
    active: false,
    description: "Chat with Vendors",
  },
  {
    icon: Handshake,
    label: "Services",
    to: "/booked-services", 
    active: false,
    description: "View your booked services",
  },
  {
    icon: CreditCard,
    label: "Wallet",
    to: "/wallet", 
    active: false,
    description: "Wallet details and history",
  },
  {
    icon: Lock,
    label: "Change Password",
    to: "/change-password", 
    active: false,
    description: "change your password",
  },
  {
    icon: LogOut,
    label: "Log out",
    active: false,
    description: "click to log out"
  }
]

export function ProfileSidebar() {
const dispatch = useAppDispatch()
  const { mutate: logoutReq } = UseLogout(logOutClient)
  const { showToast } = useToast()
  const location = useLocation() 

  const handleLogout = () => {
    logoutReq(undefined, {
      onSuccess: (data) => {
        dispatch(clientLogout())
        showToast(data.message || "Logged out successfully", "success")
      },
      onError: (err: any) => {
        showToast(err.response?.data?.message || "Logout failed", "error")
      }
    })
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Account
        </h3>
        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = item.to ? location.pathname === item.to : false

            // Logout item (no 'to')
            if (item.label === "Log out") {
              return (
                <button
                  key={index}
                  onClick={handleLogout}
                  className={`
                    flex items-start gap-3 p-3 rounded-lg transition-all duration-200 group w-full text-left
                    hover:bg-gray-50 text-gray-700 hover:text-gray-900
                  `}
                >
                  <item.icon className="h-5 w-5 mt-0.5 text-gray-500 group-hover:text-gray-700" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900">{item.label}</p>
                    <p className="text-xs mt-0.5 text-gray-500">{item.description}</p>
                  </div>
                </button>
              )
            }

            // Regular navigation items
            return (
              <Link
                key={index}
                to={item.to!}
                className={`
                  flex items-start gap-3 p-3 rounded-lg transition-all duration-200 group block
                  ${isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                  }
                `}
              >
                <item.icon
                  className={`
                    h-5 w-5 mt-0.5 transition-colors
                    ${isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"}
                  `}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium text-sm ${isActive ? "text-blue-900" : "text-gray-900"}`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${isActive ? "text-blue-600" : "text-gray-500"}`}
                  >
                    {item.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </nav>
      </Card>

      {/* Support */}
      {/* <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-center">
          <HelpCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900 mb-1">Need Help?</h4>
          <p className="text-sm text-gray-600 mb-3">Get support from our team</p>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Contact Support
          </Button>
        </div>
      </Card> */}
    </div>
  )
}