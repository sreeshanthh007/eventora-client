import React, { useState, useEffect } from "react"
import { Calendar, Clock, MapPin, Users, Ticket, Plus, Minus, X } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/pages/ui/card"
import { Button } from "@/components/pages/ui/button"
import { Badge } from "@/components/pages/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/pages/ui/avatar"
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"
import { useGetEventDetails } from "@/hooks/client/UseGetEventDetails"
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage"
import { useNavigate, useParams } from "react-router-dom"
import LocationPickerReadOnly from "../map/MapPickerReadOnly"
import { CheckoutForm } from "../forms/StripeCheckoutForm"
import { TicketBookedAnimation } from "../animations/TicketBookedAnimation"

interface EventDetailsProps {
  eventId?: string
}

interface TicketItem {
  id: string
  ticketType?: string
  pricePerTicket: number
  quantity: number
  maxPerUser: number
  available: number
}

interface TicketPurchaseData {
  title: string
  email: string
  name: string
  tickets: TicketItem[]
  totalAmount: number
  currency: string
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
  const { eventId } = useParams<{ eventId: string }>()
  const { data: event, isLoading, isError } = useGetEventDetails(eventId!)

  const vendorId = event?.event.vendor?.vendorId
  const navigate = useNavigate()
  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [purchaseData, setPurchaseData] = useState<TicketPurchaseData>({
    title: "",
    email: "",
    name: "",
    tickets: [],
    totalAmount: 0,
    currency: "INR",
  })

  // Determine if user can buy tickets
  const canBuyTickets = event?.event?.status
    ? ["ongoing", "upcoming"].includes(event.event.status.toLowerCase())
    : false

  useEffect(() => {
    if (event) {
      const hasTicketTypes = event.event.tickets && event.event.tickets.length > 0
      const ticketItems: TicketItem[] = []
      if (hasTicketTypes) {
        ticketItems.push(
          ...event.event.tickets.map((t) => ({
            id: t._id || t.id || "",
            ticketType: t.ticketType,
            pricePerTicket: Number(t.pricePerTicket) || 0,
            quantity: 0,
            maxPerUser: t.maxTicketsPerUser,
            available: Math.max(0, (Number(t.totalTickets) || 0) - (Number(t.bookedTickets) || 0)),
          }))
        )
      } else {
        ticketItems.push({
          id: "",
          pricePerTicket: Number(event.event.pricePerTicket) || 0,
          quantity: 0,
          maxPerUser: event.event.maxTicketPerUser,
          available: event.event.totalTicket,
          ticketType: "General"
        })
      }
      setPurchaseData((prev) => ({
        ...prev,
        tickets: ticketItems,
        totalAmount: 0,
        currency: "INR",
        title: event.event?.title || ""
      }))
    }
  }, [event])

  useEffect(() => {
    console.log("Current purchaseData:", purchaseData)
  }, [purchaseData])

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  if (isError || !event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">Error loading event details</div>
    )
  }

  const ticketPrice =
    event.event.tickets?.length > 0 ? Number(event.event.tickets[0].pricePerTicket) || 0 : Number(event.event.pricePerTicket) || 0
  const maxTicketsPerUser = event.event.maxTicketPerUser

  const totalQuantity = purchaseData.tickets.reduce((sum, t) => sum + t.quantity, 0)

  const handleBuyTickets = () => {
    if (!canBuyTickets) return
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCloseStripeModal = () => {
    setIsStripeModalOpen(false)
  }

  const handlePaymentSuccess = () => {
    setPurchaseData(prev => ({
      ...prev,
      email: "",
      name: "",
      tickets: prev.tickets.map(t => ({ ...t, quantity: 0 })),
      totalAmount: 0
    }))
    handleCloseStripeModal()
    setShowAnimation(true)
  }

  const handleQuantityChange = (index: number, increment: boolean) => {
    setPurchaseData((prev) => {
      const newTickets = [...prev.tickets]
      const currentItem = newTickets[index]
      const currentTotalQuantity = prev.tickets.reduce((sum, t) => sum + t.quantity, 0)

      if (increment) {
        const newQuantityForThis = currentItem.quantity + 1
        if (newQuantityForThis > currentItem.maxPerUser) return prev
        if (newQuantityForThis > currentItem.available) return prev
        const newTotalQuantity = currentTotalQuantity + 1
        if (newTotalQuantity > maxTicketsPerUser) return prev
      }

      let newQuantity = increment ? currentItem.quantity + 1 : currentItem.quantity - 1
      if (newQuantity < 0) newQuantity = 0

      newTickets[index] = { ...currentItem, quantity: newQuantity }
      const newTotalAmount = newTickets.reduce((sum, t) => {
        const price = Number(t.pricePerTicket) || 0
        const qty = Number(t.quantity) || 0
        return sum + (price * qty)
      }, 0)

      return {
        ...prev,
        tickets: newTickets,
        totalAmount: newTotalAmount,
      }
    })
  }

  const handleSubmitPurchase = () => {
    if (!purchaseData.email || !purchaseData.name || totalQuantity === 0) {
      alert("Please fill in all required fields (email, name) and select at least one ticket.")
      return
    }
    if (isNaN(purchaseData.totalAmount) || purchaseData.totalAmount <= 0) {
      alert("Invalid ticket amount. Please select valid quantities.")
      return
    }

    let isValid = true
    purchaseData.tickets.forEach((t) => {
      if (t.quantity > t.maxPerUser || t.quantity > t.available) {
        isValid = false
      }
    })
    if (totalQuantity > maxTicketsPerUser) {
      isValid = false
    }
    if (!isValid) {
      alert("Selected quantities exceed limits. Please adjust.")
      return
    }

    handleCloseModal()
    setIsStripeModalOpen(true)
  }

  const firstSchedule = event.event.eventSchedule[0]
  const ticketAnimationData = {
    title: event.event.title,
    date: firstSchedule ? formatDate(firstSchedule.date) : '',
    time: firstSchedule ? `${firstSchedule.startTime} - ${firstSchedule.endTime} pm` : '',
    venue: event.event.eventLocation || 'Kochi',
    price: ticketPrice,
    image: getCloudinaryImageUrl(event.event.images[0]),
  }

  const handleViewTicket = () => {
    setShowAnimation(false)
    navigate("/booked-events")
  }

  const handleBrowseEvents = () => {
    setShowAnimation(false)
    navigate("/events")
  }

  return (
    <div className="min-h-screen bg-background relative">
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

          {/* Right Column: Host + Tickets */}
          <div className="space-y-6">
            {/* Event Host */}
            <Card>
              <CardHeader>
                <CardTitle>Event Host</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={
                        event.event.vendor?.profilePicture
                          ? getCloudinaryImageUrl(event.event.vendor.profilePicture)
                          : "/placeholder.svg"
                      }
                    />
                    <AvatarFallback>{event.event.vendor?.name?.[0] || "B"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{event.event.vendor?.name || "bro"}</h3>
                    {event.event.vendor?.email && (
                      <p className="text-sm text-muted-foreground">
                        {event.event.vendor.email}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conditional Tickets Card */}
            {canBuyTickets ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-accent" />
                    Get Tickets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-black">₹{ticketPrice}</p>
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
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-accent" />
                    Tickets
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    {event.event.status?.toLowerCase() === "cancelled"
                      ? "This event has been cancelled."
                      : "Ticket sales are closed."}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {isModalOpen && canBuyTickets && (
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

              <div className="space-y-2">
                <Label>Select Tickets</Label>
                <div className="space-y-3">
                  {purchaseData.tickets.map((item, index) => (
                    <div key={item.id || index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <span className="font-medium block">{item.ticketType} - ₹{item.pricePerTicket}</span>
                        <span className="text-sm text-muted-foreground">
                          ({item.available} available, max {item.maxPerUser} per user)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(index, false)}
                          disabled={item.quantity <= 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-medium min-w-[2rem] text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(index, true)}
                          disabled={
                            item.quantity >= item.maxPerUser ||
                            item.quantity >= item.available ||
                            totalQuantity >= maxTicketsPerUser
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total ({totalQuantity} tickets):</span>
                  <span className="text-xl font-bold">₹{purchaseData.totalAmount}</span>
                </div>

                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={handleSubmitPurchase}
                  disabled={!purchaseData.email || !purchaseData.name || totalQuantity === 0 || isNaN(purchaseData.totalAmount) || purchaseData.totalAmount <= 0}
                >
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stripe Checkout Modal */}
      {isStripeModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h2 className="text-xl font-semibold">Complete Payment</h2>
              <Button variant="ghost" size="sm" onClick={handleCloseStripeModal}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CheckoutForm
              vendorId={vendorId}
              eventId={eventId!}
              purchaseData={purchaseData}
              onClose={handlePaymentSuccess}
            />
          </div>
        </div>
      )}

      {/* Success Animation */}
      {showAnimation && (
        <TicketBookedAnimation
          ticketData={ticketAnimationData}
          onViewTicket={handleViewTicket}
          onBrowseEvents={handleBrowseEvents}
        />
      )}
    </div>
  )
}