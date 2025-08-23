
import type React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/pages/ui/card";
import { Edit } from "lucide-react";
import { Textarea } from "@/components/pages/ui/textarea";
import { Label } from "@/components/pages/ui/label";
import { Avatar, AvatarFallback } from "@/components/pages/ui/avatar";
import { Button } from "@/components/pages/ui/button";
import { Input } from "@/components/pages/ui/input";
import { useSelector } from "react-redux";
import { type RootState } from "@/store/store";
import { Link } from "react-router-dom";

export const VendorContentSection: React.FC = () => {
  const vendor = useSelector((state: RootState) => state.vendor.vendor);

  return (
    <div className="flex-1">
      <Card className="rounded-xl shadow-lg border border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-900">MY PROFILE</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 p-6 bg-gray-100 rounded-lg border border-gray-200">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <Avatar className="w-16 h-16 bg-green-600">
                <AvatarFallback className="bg-green-600 text-white text-xl font-semibold">
                  {vendor?.name?.[0]?.toUpperCase() || "V"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {vendor?.name || "Vendor Name"}
                </h3>
                <p className="text-gray-600">
                  {vendor?.email || "vendor@email.com"}
                </p>
                <p className="text-sm text-gray-500">
                  Status: {vendor?.vendorStatus}
                </p>
              </div>
            </div>
                  <Link to="editProfile">
          <Button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </Link>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">Name</Label>
              <Input
                id="name"
                defaultValue={vendor?.name}
                placeholder="Vendor Name"
                className="bg-white border border-gray-300 focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="place" className="text-gray-700 font-medium">Place</Label>
              <Input
                id="place"
                defaultValue={vendor?.place}
                placeholder="Place"
                className="bg-white border border-gray-300 focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
              />
            </div>

         

            <div className="space-y-2">
              <Label htmlFor="contact" className="text-gray-700 font-medium">Contact Number</Label>
              <Input
                id="contact"
                defaultValue={vendor?.phone}
                placeholder="(0123) 45678"
                className="bg-white border border-gray-300 focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue={vendor?.email}
                placeholder="vendorsample@example.com"
                className="bg-white border border-gray-300 focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="about" className="text-gray-700 font-medium">About Me</Label>
              <Textarea
                id="about"
                defaultValue={vendor?.about}
                placeholder="Write about yourself..."
                className="bg-white min-h-[100px] border border-gray-300 focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};