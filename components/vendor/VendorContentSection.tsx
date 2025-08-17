import type React from "react"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../pages/ui/card"
import { Edit } from "lucide-react"
import { Textarea } from "../pages/ui/textarea"
import { Label } from "@radix-ui/react-label"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { Button } from "../pages/ui/button"
import { Input } from "../pages/ui/input"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

export const VendorContentSection: React.FC = () => {
  const vendor = useSelector((state: RootState) => state.vendor.vendor)
  return (
    <div className="flex-1">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">MY PROFILE</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 bg-green-600">
                <AvatarFallback className="bg-green-600 text-white text-xl font-semibold">
                  {vendor?.name?.[0]?.toUpperCase() || "V"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {vendor?.name || "Vendor Name"}
                </h3>
                <p className="text-gray-600">{vendor?.email || "vendor@email.com"}</p>
              </div>
            </div>
            <Button className="bg-black hover:bg-gray-800">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                defaultValue={vendor?.name}
                placeholder="Vendor Name"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="place">Place</Label>
              <Input
                id="place"
                defaultValue={vendor?.place}
                placeholder="Place"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                defaultValue={vendor?.category}
                placeholder="Category"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                defaultValue={vendor?.phone}
                placeholder="(0123) 45678"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue={vendor?.email}
                placeholder="vendorsample@example.com"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="about">About Me</Label>
              <Textarea
                id="about"
                defaultValue={vendor?.about}
                placeholder="Write about yourself..."
                className="bg-gray-50 min-h-[100px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
