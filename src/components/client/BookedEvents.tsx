import { Calendar, Users, CreditCard, Download, Share2, QrCode, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/pages/ui/card"
import { Badge } from "../../components/pages/ui/badge"
import { Button } from "../../components/pages/ui/button"
import { Separator } from "../../components/pages/ui/separator"
import { Input } from "../../components/pages/ui/input"

interface BookedEvent {
  ticketId: string
  name: string
  email: string
  amount: number
  qrCodeLink: string
  paymentStatus: string
  ticketStatus: string
  ticketType: string
  quantity: number
}

interface BookedEventsProps {
  bookedEvents: BookedEvent[]
  isLoading: boolean
  isError: boolean
  searchTerm: string
  setSearchTerm: (value: string) => void
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "unused":
    case "active":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200"
    case "completed":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getTicketTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "vip":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "premium":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "standard":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export const BookedEvents: React.FC<BookedEventsProps> = ({ bookedEvents, isLoading, isError, searchTerm, setSearchTerm }) => {
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Loading booked events...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-xl text-red-600">Error loading booked events. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Booked Events</h1>
        <p className="text-gray-600">View and manage your event tickets</p>
      </div>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by name, email, or ticket ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      {bookedEvents.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Booked</h3>
            <p className="text-gray-600 mb-6">You haven't booked any events yet. Start exploring!</p>
            <Button className="bg-blue-600 hover:bg-blue-700">Browse Events</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {bookedEvents.map((ticket) => (
            <Card key={ticket.ticketId} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                {/* Placeholder for Event Image */}
                <div className="md:w-1/3">
                  <img
                    src="/placeholder.svg"
                    alt="Event image"
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                {/* Ticket Details */}
                <div className="md:w-2/3 p-6">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl font-bold text-gray-900">{ticket.name}</CardTitle>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(ticket.ticketStatus)}>{ticket.ticketStatus}</Badge>
                        {ticket.ticketType && (
                          <Badge className={getTicketTypeColor(ticket.ticketType)}>{ticket.ticketType}</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {/* Ticket Info */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          <span>Quantity: {ticket.quantity}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="font-medium">Email:</span>
                          <span className="ml-2">{ticket.email}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <CreditCard className="w-4 h-4 mr-2" />
                          <span>Amount: ₹{ticket.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="font-medium">Payment Status:</span>
                          <Badge className={`ml-2 ${getStatusColor(ticket.paymentStatus)}`}>
                            {ticket.paymentStatus}
                          </Badge>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="font-medium">Ticket ID:</span>
                          <span className="ml-2 font-mono text-sm">{ticket.ticketId}</span>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    {/* QR Code and Actions */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <QrCode className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-600">QR Code:</span>
                        </div>
                        <img
                          src={ticket.qrCodeLink || "/placeholder.svg"}
                          alt={`QR Code for ${ticket.ticketId}`}
                          className="w-16 h-16 border border-gray-200 rounded"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
