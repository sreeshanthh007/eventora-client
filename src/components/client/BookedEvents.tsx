import type React from "react"
import { useState } from "react"
import { Calendar, Users, CreditCard, Download, QrCode, Search, Loader2, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Badge } from "@/components/pages/ui/badge"
import { Button } from "@/components/pages/ui/button"
import { Separator } from "@/components/pages/ui/separator"
import { Input } from "@/components/pages/ui/input"
import { Pagination } from "../common/paginations/Pagination"
import { getStatusColor } from "@/utils/helpers/GetStatusColor"
import { getTicketTypeColor } from "@/utils/helpers/GetTicketTypeColor"
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage"
import { formatDateForInput } from "@/utils/helpers/FormatDate"
import { TicketDetailsModal } from "../modals/TicketDetailsModal"
import { downloadTicketPDF } from "@/utils/helpers/DownloadTicketasPDF"
import { useToast } from "@/hooks/ui/UseToaster"

interface EventSchedule {
  date: string
  startTime: string
  endTime: string
}

interface BookedEvent {
  ticketId: string
  eventId: string
  email: string
  amount: number
  qrCodeLink: string
  paymentStatus: string
  ticketStatus: string
  ticketType: string
  quantity: number
  title: string
  eventSchedule?: EventSchedule[] 
  Images: string[]
}

interface BookedEventsProps {
  bookedEvents: BookedEvent[]
  isLoading: boolean
  isError: boolean
  searchTerm: string
  setSearchTerm: (value: string) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const formatTime = (timeString: string) => {
  try {
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  } catch {
    return timeString
  }
}

export const BookedEvents: React.FC<BookedEventsProps> = ({
  bookedEvents,
  isLoading,
  isError,
  searchTerm,
  setSearchTerm,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [selectedTicket, setSelectedTicket] = useState<BookedEvent | null>(null)
  const [downloadingTicketId, setDownloadingTicketId] = useState<string | null>(null)



  const { showToast } = useToast()

  const handleViewDetails = (ticket: BookedEvent) => {
    setSelectedTicket(ticket)
  }

  const handleCloseModal = () => {
    setSelectedTicket(null)
  }

  const handleDownloadTicket = async (ticket: BookedEvent) => {
    try {
  
      setDownloadingTicketId(ticket.ticketId)
      showToast('Generating your ticket PDF...', 'loading')
      await downloadTicketPDF(ticket)

      showToast('Ticket downloaded successfully!', 'success')
    } catch (error) {
      showToast('Failed to download ticket. Please try again.', 'error')
    } finally {
      setDownloadingTicketId(null)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Booked Events</h1>
        <p className="text-gray-600">View and manage your event tickets</p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by name, email, or ticket ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>
      </div>

      <div className="space-y-6">
        {isError ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-xl text-red-600 mb-4">Error loading booked events. Please try again later.</p>
            </CardContent>
          </Card>
        ) : isLoading ? (
          <Card className="text-center py-12">
            <CardContent>
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-xl text-gray-600">Loading booked events...</p>
            </CardContent>
          </Card>
        ) : bookedEvents.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Booked</h3>
              <p className="text-gray-600 mb-6">You haven't booked any events yet. Start exploring!</p>
              <Button className="bg-blue-600 hover:bg-blue-700">Browse Events</Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-6">
              {bookedEvents.map((ticket) => (
              <Card
                key={ticket.ticketId}
                className="overflow-hidden hover:shadow-lg transition-shadow"
                style={{ height: "100%" }}              
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 h-full">
           
                  <div className="relative md:col-span-1 bg-gray-100">
                    <div className="absolute inset-0">
                      <img
                        src={
                          ticket.Images
                            ? getCloudinaryImageUrl(ticket.Images[0])
                            : "/community-event.png"
                        }
                        alt="Event image"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                    <div className="md:col-span-2 p-6 flex flex-col">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                        <CardTitle className="text-xl font-bold text-gray-900">
                          {ticket.title}
                        </CardTitle>
                        <div className="flex gap-2 flex-wrap">
                          <Badge className={getStatusColor(ticket.ticketStatus)}>
                            {ticket.ticketStatus}
                          </Badge>
                          {ticket.ticketType && (
                            <Badge className={getTicketTypeColor(ticket.ticketType)}>
                              {ticket.ticketType}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                      <CardContent className="p-0 flex-1">
                    {ticket.eventSchedule && ticket.eventSchedule.length > 0 && (
                      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <h4 className="font-semibold text-gray-900">
                            Event Schedule
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {ticket.eventSchedule.map((event, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-gray-700"
                            >
                              <span className="font-medium text-gray-900">
                                {formatDateForInput(event.date)}
                              </span>
                              <span className="hidden sm:inline text-gray-400">•</span>
                              <span>
                                {formatTime(event.startTime)} -{" "}
                                {formatTime(event.endTime)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          <div className="space-y-3">
                            <div className="flex items-center text-gray-600">
                              <Users className="w-4 h-4 mr-2" />
                              <span>Quantity: {ticket.quantity}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Email:</span>
                              <span className="ml-2 truncate">{ticket.email}</span>
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
                              <span className="ml-2 font-mono text-sm truncate">{ticket.ticketId}</span>
                            </div>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <QrCode className="w-4 h-4 text-gray-600" />
                              <span className="text-sm text-gray-600">QR Code:</span>
                            </div>
                           {ticket.qrCodeLink ? (
                            <img
                              src={ticket.qrCodeLink}
                              alt={`QR Code for ${ticket.ticketId}`}
                              className="w-16 h-16 border border-gray-200 rounded"
                            />
                          ) : (
                            <div className="w-16 h-16 flex items-center justify-center text-xs text-red-600 border border-gray-300 rounded bg-gray-50">
                              QR not available
                            </div>
                          )}
                          </div>
                        <div className="flex gap-2 flex-wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadTicket(ticket)}
                          disabled={
                            downloadingTicketId === ticket.ticketId ||
                            ticket.paymentStatus === "failed"
                          }
                          className={
                            ticket.paymentStatus === "failed"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }
                        >
                          {downloadingTicketId === ticket.ticketId ? (
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4 mr-1" />
                          )}
                          {ticket.paymentStatus === "failed"
                            ? "Payment Failed"
                            : downloadingTicketId === ticket.ticketId
                            ? "Downloading..."
                            : "Download"}
                        </Button>

                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleViewDetails(ticket)}
                        >
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

            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            )}
          </>
        )}
      </div>

      {selectedTicket && (
        <TicketDetailsModal
          isOpen={true}
          onClose={handleCloseModal}
          title={selectedTicket.title}
          schedule={selectedTicket.eventSchedule || []}
          ticketId={selectedTicket.ticketId}
          eventId={selectedTicket.eventId}
          email={selectedTicket.email}
          amount={selectedTicket.amount}
          ticketStatus={selectedTicket.ticketStatus}
          paymentStatus={selectedTicket.paymentStatus}
        />
      )}
    </div>
  )
}