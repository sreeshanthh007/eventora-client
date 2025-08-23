
import { VendorLayout } from "../layouts/VendorLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Badge } from "@/components/pages/ui/badge"
import { Button } from "@/components/pages/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/pages/ui/avatar"
import { User, Mail, Phone, MapPin, Calendar, Building, Star, Edit, Camera, Shield, Clock } from "lucide-react"

export default function VendorProfilePage() {

  const vendorData = {
    name: "John Smith",
    email: "john.smith@eventora.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "January 2024",
    company: "Elite Events Co.",
    specialization: "Wedding Planning",
    // rating: 4.8,
    totalEvents: 127,
    status: "verified",
    avatar: "/placeholder.svg?height=120&width=120",
    bio: "Passionate event planner with over 8 years of experience creating unforgettable moments. Specializing in luxury weddings and corporate events with attention to every detail.",
    services: ["Wedding Planning", "Corporate Events", "Birthday Parties", "Anniversary Celebrations"],
    achievements: ["Top Rated Vendor 2024", "Customer Choice Award", "Excellence in Service"],
  }

  return (
    <VendorLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={vendorData.avatar || "/placeholder.svg"} alt={vendorData.name} />
                    <AvatarFallback className="text-2xl">
                      {vendorData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={vendorData.status === "verified" ? "default" : "secondary"}>
                    <Shield className="h-3 w-3 mr-1" />
                    {vendorData.status === "verified" ? "Verified" : "Pending"}
                  </Badge>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">{vendorData.name}</h1>
                    <p className="text-lg text-muted-foreground">{vendorData.specialization}</p>
                  </div>
                  <Button className="w-fit">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <p className="text-muted-foreground leading-relaxed">{vendorData.bio}</p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    {/* <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{vendorData.rating}</span> */}
                    {/* <span className="text-muted-foreground">rating</span> */}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{vendorData.totalEvents}</span>
                    <span className="text-muted-foreground">events completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span className="text-muted-foreground">Member since {vendorData.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{vendorData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{vendorData.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{vendorData.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{vendorData.company}</span>
              </div>
            </CardContent>
          </Card>

          {/* Services Offered */}
          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
              <CardDescription>Event types you specialize in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {vendorData.services.map((service, index) => (
                  <Badge key={index} variant="outline">
                    {service}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Achievements & Recognition</CardTitle>
            <CardDescription>Awards and recognitions earned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {vendorData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">{achievement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}

        {/* Account Status */}
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
            <CardDescription>Current verification and account standing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">Verified Vendor</p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Your account has been verified by our team
                  </p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  )
}
