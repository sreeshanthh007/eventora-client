import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import type React from "react"
import { useDispatch } from "react-redux"
import { UseLogout } from "@/hooks/auth/Uselogout"
import { VendorLogout } from "@/services/auth/authServices"
import { vendorLogout } from "@/store/slices/vendorSlice"
import { useToast } from "@/hooks/ui/UseToaster"
import { toast } from "sonner"


export const VendorSidebar: React.FC = () => {
  const dispatch = useDispatch()
  const {showToast} = useToast()

  // const vendor = useState((state:RootState)=>state.vendor.vendor)
  // const navigate = useNavigate()

  const sidebarItems = [
    { name: "Dashboard", active: false },
    { name: "My Profile", active: true },
    { name: "Check Status", active: false },
    { name: "Services", active: false },
    { name: "Work Samples", active: false },
    { name: "Bookings", active: false },
    { name: "Events", active: false },
    { name: "Wallet", active: false },
    { name: "Logout", active: false },
  ]


    const {mutate:logoutReq} = UseLogout(VendorLogout)


  const handleLogout = ()=>{
    logoutReq(undefined,
      {
        onSuccess:(data)=>{
          toast.success(data.message)
            dispatch(vendorLogout());
        },
        onError:(err:any)=>{
          toast.error(err.response?.data.message)
        }
      }
    )
  }

  return (
    <div className="w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="w-20 h-20 bg-green-600 mb-3">
          <AvatarFallback className="bg-green-600 text-white text-2xl font-semibold">V</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-gray-900">Vendor Name</h3>
      </div>
      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <button
            key={item.name}
            onClick={item.name === "Logout" ? handleLogout : undefined}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
              item.active ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  )
}
