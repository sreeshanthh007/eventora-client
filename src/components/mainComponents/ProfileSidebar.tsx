
import { User, Ticket, Heart, Bell, CreditCard, HelpCircle, Calendar, LogOut } from "lucide-react"
import { Card } from "@/components/pages/ui/card"
import { Button } from "@/components/pages/ui/button"
import { UseLogout } from "@/hooks/auth/Uselogout"
import { logOutClient } from "@/services/auth/authServices"
import { clientLogout } from "@/store/slices/clientSlice"
import { useToast } from "@/hooks/ui/UseToaster"
import { useAppDispatch } from "@/store/store"

const menuItems = [
  {
    icon: User,
    label: "My Profile",
    href: "/profile",
    active: true,
    description: "Personal information",
  },
  {
    icon: Ticket,
    label: "My Events",
    href: "/events",
    active: false,
    description: "Upcoming and past events",
  },
  {
    icon: Calendar,
    label: "Calendar",
    href: "/calendar",
    active: false,
    description: "Event schedule",
  },
  {
    icon: Heart,
    label: "Favorites",
    href: "/favorites",
    active: false,
    description: "Saved events and venues",
  },
  {
    icon: Bell,
    label: "Notifications",
    href: "/notifications",
    active: false,
    description: "Alerts and updates",
  },
  {
    icon: CreditCard,
    label: "Payment Methods",
    href: "/payments",
    active: false,
    description: "Cards and billing",
  },

  {
    icon:LogOut,
    label:"Log out",
    active:false,
    description:"click to log out"
  }
]


export function ProfileSidebar() {


   const dispatch = useAppDispatch()
  const { mutate: logoutReq } = UseLogout(logOutClient)
  const {showToast} =  useToast()
  const handleLogout = () => {
    logoutReq(undefined, {
      onSuccess: (data) => {
        dispatch(clientLogout())
        showToast(data.message,"success")
      },
      onError: (err: any) => {
       showToast(err.response?.data?.message,"error")
      }
    })
  }
  return (
    <div className="space-y-4">
      {/* Main Navigation */}
      <Card className="p-4">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Account
        </h3>
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`
                flex items-start gap-3 p-3 rounded-lg transition-all duration-200 group
                ${
                  item.active
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                }
              `}
            >
              <item.icon
                className={`
                h-5 w-5 mt-0.5 transition-colors
                ${item.active ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"}
              `}
              />
              <div className="flex-1 min-w-0">
                <p
                  className={`
                  font-medium text-sm
                  ${item.active ? "text-blue-900" : "text-gray-900"}
                `}
                >
                  {item.label === "Log out" ? (
                  <button onClick={handleLogout}>{item.label}</button>
                ) : (
              item.label
                 )}

                </p>
                <p
                  className={`
                  text-xs mt-0.5
                  ${item.active ? "text-blue-600" : "text-gray-500"}
                `}
                >
                  {item.description}
                </p>
              </div>
            </a>
          ))}
        </nav>
      </Card>

  

      {/* Support */}
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-center">
          <HelpCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900 mb-1">Need Help?</h4>
          <p className="text-sm text-gray-600 mb-3">Get support from our team</p>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Contact Support
          </Button>
        </div>
      </Card>
    </div>
  )
}
