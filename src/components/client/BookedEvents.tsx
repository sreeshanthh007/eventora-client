// src/components/client/BookedEvents.tsx
import type React from "react"
import { useState } from "react"
import { Calendar, Users, CreditCard, Download, QrCode, Loader2, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Badge } from "@/components/pages/ui/badge"
import { Button } from "@/components/pages/ui/button"
import { Separator } from "@/components/pages/ui/separator"
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
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [selectedTicket, setSelectedTicket] = useState<BookedEvent | null>(null)
  const [downloadingTicketId, setDownloadingTicketId] = useState<string | null>(null)
  const { showToast } = useToast()

  const handleViewDetails = (ticket: BookedEvent) => setSelectedTicket(ticket)
  const handleCloseModal = () => setSelectedTicket(null)

  const handleDownloadTicket = async (ticket: BookedEvent) => {
    try {
      setDownloadingTicketId(ticket.ticketId)
      showToast("Generating your ticket PDF...", "loading")
      await downloadTicketPDF(ticket)
      showToast("Ticket downloaded successfully!", "success")
    } catch (error) {
      showToast("Failed to download ticket. Please try again.", "error")
    } finally {
      setDownloadingTicketId(null)
    }
  }

  // Loading / Error / Empty States
  if (isError) {
    return (
      <Card className="text-center py-16">
        <CardContent>
          <p className="text-xl text-red-600">Error loading booked events. Please try again later.</p>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="text-center py-16">
        <CardContent>
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading your events...</p>
        </CardContent>
      </Card>
    )
  }

  if (bookedEvents.length === 0) {
    return (
      <Card className="text-center py-16">
        <CardContent>
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Events Booked</h3>
          <p className="text-gray-600 mb-6">You haven't booked any events yet. Start exploring!</p>
          <Button className="bg-blue-600 hover:bg-blue-700">Browse Events</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Event Cards Grid */}
      <div className="grid gap-6">
        {bookedEvents.map((ticket) => (
          <Card
            key={ticket.ticketId}
            className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Event Image */}
              <div className="relative bg-gray-100">
                <img
                  src={
                    ticket.Images && ticket.Images[0]
                      ? getCloudinaryImageUrl(ticket.Images[0])
                      : "/community-event.png"
                  }
                  alt={ticket.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>

              {/* Event Details */}
              <div className="md:col-span-2 p-6 flex flex-col justify-between">
                <div>
                  <CardHeader className="p-0 mb-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                      <CardTitle className="text-2xl font-bold text-gray-900">
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

                  <CardContent className="p-0 space-y-6">
                    {/* Schedule */}
                    {ticket.eventSchedule && ticket.eventSchedule.length > 0 && (
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold">Event Schedule</h4>
                        </div>
                        <div className="space-y-2">
                          {ticket.eventSchedule.map((s, i) => (
                            <div key={i} className="text-sm text-gray-700">
                              <span className="font-medium">{formatDateForInput(s.date)}</span>
                              <span className="text-gray-500 mx-2">•</span>
                              <span>
                                {formatTime(s.startTime)} - {formatTime(s.endTime)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>Quantity: {ticket.quantity}</span>
                        </div>
                        <div className="truncate">
                          <span className="font-medium text-gray-700">Email:</span> {ticket.email}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <CreditCard className="w-4 h-4" />
                          <span>₹{ticket.amount.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Payment:</span>
                          <Badge className={`ml-2 ${getStatusColor(ticket.paymentStatus)}`}>
                            {ticket.paymentStatus}
                          </Badge>
                        </div>
                        <div className="font-mono text-xs text-gray-500 truncate">
                          ID: {ticket.ticketId}
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    {/* QR + Actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <QrCode className="w-5 h-5" />
                          <span>QR Code:</span>
                        </div>
                        {ticket.qrCodeLink ? (
                          <img
                            src={ticket.qrCodeLink}
                            alt="QR Code"
                            className="w-16 h-16 border rounded"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 border-2 border-dashed rounded flex items-center justify-center text-xs text-red-600">
                            Not ready
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadTicket(ticket)}
                          disabled={
                            downloadingTicketId === ticket.ticketId ||
                            ticket.paymentStatus === "failed"
                          }
                        >
                          {downloadingTicketId === ticket.ticketId ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Downloading...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </>
                          )}
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
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}

      {/* Modal */}
      {selectedTicket && (
        <TicketDetailsModal
          isOpen={!!selectedTicket}
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