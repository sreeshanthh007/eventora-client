
import React, { useState } from "react"
import { Calendar, Clock, MapPin, Users, Ticket, Plus, Minus, X } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/pages/ui/card"
import { Button } from "@/components/pages/ui/button"
import { Badge } from "@/components/pages/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/pages/ui/avatar"
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/pages/ui/select"
import { useGetEventDetails } from "@/hooks/client/UseGetEventDetails"
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage"
import { useParams } from "react-router-dom"
import LocationPickerReadOnly from "../map/MapPickerReadOnly"
// import { useSelector } from "react-redux"
// import type { RootState } from "@/store/store"

interface EventDetailsProps {
  eventId: string
}

interface TicketPurchaseData {
  email: string
  name: string
  ticketType?: string
  quantity: number
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export const EventDetails: React.FC<EventDetailsProps> = () => {
  // const client = useSelector((state:RootState)=>state.client.client)

  const { eventId } = useParams<{ eventId: string }>()
  const { data: event, isLoading, isError } = useGetEventDetails(eventId!)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [purchaseData, setPurchaseData] = useState<TicketPurchaseData>({
    email: "",
    name: "",
    ticketType: "",
    quantity: 1,
  })

  console.log("this is the event data", event)

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  if (isError || !event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">Error loading event details</div>
    )
  }

  const ticketPrice =
    event.event.tickets?.length > 0 ? event.event.tickets[0].pricePerTicket : event.event.pricePerTicket
  const maxTicketsPerUser = event.event.maxTicketsPerUser || 10
  const hasTicketTypes = event.event.tickets && event.event.tickets.length > 0

  const handleBuyTickets = () => {
    setIsModalOpen(true)
    if (hasTicketTypes) {
      setPurchaseData((prev) => ({ ...prev, ticketType: event.event.tickets[0].ticketType }))
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setPurchaseData({ email: "", name: "", ticketType: "", quantity: 1 })
  }

  const handleQuantityChange = (increment: boolean) => {
    setPurchaseData((prev) => ({
      ...prev,
      quantity: increment ? Math.min(prev.quantity + 1, maxTicketsPerUser) : Math.max(prev.quantity - 1, 1),
    }))
  }

  const handleSubmitPurchase = () => {
    console.log("Purchase data:", purchaseData)
    handleCloseModal()
  }

  const getCurrentTicketPrice = () => {
    if (hasTicketTypes && purchaseData.ticketType) {
      const selectedTicket = event.event.tickets.find((t) => t.ticketType === purchaseData.ticketType)
      return selectedTicket?.pricePerTicket || ticketPrice
    }
    return ticketPrice
  }



  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-64 overflow-hidden">
        <img
          src={event.event.images?.[0] ? getCloudinaryImageUrl(event.event.images[0]) : "/placeholder.svg"}
          alt={event.event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <Badge className="mb-2 bg-accent text-accent-foreground">{event.event.status}</Badge>
          <h1 className="text-3xl font-bold mb-2 text-balance">{event.event.title}</h1>
          <div className="text-base opacity-90 space-y-1">
            {event.event.eventSchedule.map((schedule, index) => (
              <p key={index}>
                {formatDate(schedule.date)} • {schedule.startTime} - {schedule.endTime} pm
              </p>
            ))}
            • {event.event.eventLocation}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.event.eventSchedule.map((schedule, index) => (
                    <React.Fragment key={index}>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Date</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(schedule.date).toLocaleDateString(undefined, {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Time</p>
                          <p className="text-sm text-muted-foreground">
                            {schedule.startTime} - {schedule.endTime}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{event.event.eventLocation || "kochi"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Attendees</p>
                      <p className="text-sm text-muted-foreground">{event.event.attendiesCount}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{event.event.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Event Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.event.images?.slice(1).map((image, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg">
                      <img
                        src={image ? getCloudinaryImageUrl(image) : "/placeholder.svg"}
                        alt={`Event image ${index + 1}`}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  Event Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LocationPickerReadOnly
                  initialLocation={[event.event.location.coordinates[1], event.event.location.coordinates[0]]}
                />
                <p className="text-sm text-muted-foreground mt-2">{event.event.eventLocation || "kochi"}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Host</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={
                        event.event.vendor?.avatar
                          ? getCloudinaryImageUrl(event.event.vendor.avatar)
                          : "/placeholder.svg"
                      }
                    />
                    <AvatarFallback>{event.event.vendor?.name?.[0] || "B"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{event.event.vendor?.name || "bro"}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-accent" />
                  Get Tickets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-black">{ticketPrice} /-</p>
                  <p className="text-sm text-muted-foreground">per person</p>
                </div>
                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={handleBuyTickets}
                >
                  Buy Tickets
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Purchase Tickets</h2>
              <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={purchaseData.email}
                  onChange={(e) => setPurchaseData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={purchaseData.name}
                  onChange={(e) => setPurchaseData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              {hasTicketTypes && (
                <div className="space-y-2">
                  <Label htmlFor="ticketType">Ticket Type</Label>
                  <Select
                    value={purchaseData.ticketType}
                    onValueChange={(value) => setPurchaseData((prev) => ({ ...prev, ticketType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ticket type" />
                    </SelectTrigger>
                    <SelectContent>
                      {event.event.tickets.map((ticket, index) => (
                        <SelectItem key={index} value={ticket.ticketType}>
                          {ticket.ticketType} - ₹{ticket.pricePerTicket}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(false)}
                    disabled={purchaseData.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium min-w-[2rem] text-center">{purchaseData.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(true)}
                    disabled={purchaseData.quantity >= maxTicketsPerUser}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Maximum {maxTicketsPerUser} tickets per user</p>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total:</span>
                  <span className="text-xl font-bold">₹{getCurrentTicketPrice() * purchaseData.quantity}</span>
                </div>

                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={handleSubmitPurchase}
                  disabled={!purchaseData.email || !purchaseData.name || (hasTicketTypes && !purchaseData.ticketType)}
                >
                  Purchase Tickets
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
