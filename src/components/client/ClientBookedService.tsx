import { Card, CardContent } from "@/components/pages/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/pages/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/pages/ui/avatar"
import { Badge } from "@/components/pages/ui/badge"
import { Button } from "@/components/pages/ui/button"
import { Pagination } from "@/components/pages/ui/pagination" 
import { Mail, Phone } from "lucide-react"
import { Loader2 } from "lucide-react"
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage"

interface Booking {
  bookingId: string
  name: string
  email: string
 
  bookingSlot: {
    startDateTIme: string
    endDateTime: string
  }
  vendorId: {
    name: string
    email: string
    profilePicture: string
     phone: string
  }
  serviceId: {
    serviceTitle: string
  }
  status: string
  amount: number
  paymentStatus: string
}

interface Props {
  bookings: Booking[]
  totalPages: number
  isLoading: boolean
  currentPage: number
  onPageChange: (page: number) => void
  searchTerm: string
}



const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "upcoming":
      return "bg-blue-100 text-blue-800"
    case "in progress":
      return "bg-yellow-100 text-yellow-800"
    case "pending":
      return "bg-orange-100 text-orange-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getPaymentStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
    case "successfull":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-orange-100 text-orange-800"
    case "failed":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const handleCancel = (bookingId: string) => {
  // TODO: Implement cancel mutation or API call here
  console.log("Cancel service:", bookingId)
  // Example: await cancelBooking(bookingId)
}

export function ClientBookedServices({ bookings, totalPages, isLoading, currentPage, onPageChange, searchTerm }: Props) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading booked services...</span>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              {searchTerm ? "No booked services found matching your search." : "No booked services yet."}
            </p>
            {searchTerm && (
              <p className="text-muted-foreground text-sm mt-1">Try adjusting your search terms.</p>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="font-semibold">Vendor</TableHead>
                      <TableHead className="font-semibold">Contact</TableHead>
                      <TableHead className="font-semibold">Service</TableHead>
                      <TableHead className="font-semibold">Booking Slot</TableHead>
                      <TableHead className="font-semibold">Booking ID</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="font-semibold">Payment</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => {
                      const displayStatus = booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
                      const displayPaymentStatus = booking.paymentStatus === "successfull" ? "Paid" : booking.paymentStatus
                      const vendorProfilePicture = booking.vendorId.profilePicture
                        ?  getCloudinaryImageUrl( booking.vendorId.profilePicture) // Adjust to full URL if needed, e.g., `${process.env.NEXT_PUBLIC_BASE_URL}/${booking.vendorId.profilePicture}`
                        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(booking.vendorId.name)}`
                      const startDateTime = new Date(booking.bookingSlot.startDateTIme).toLocaleString()
                      const endDateTime = new Date(booking.bookingSlot.endDateTime).toLocaleString()
                      const service = {
                        id: booking.bookingId,
                        vendorName: booking.vendorId.name,
                        vendorEmail: booking.vendorId.email,
                        vendorPhone: booking.vendorId.phone, 
                        vendorProfilePicture,
                        serviceTitle: booking.serviceId.serviceTitle,
                        bookingId: booking.bookingId,
                        serviceStatus: displayStatus,
                        rawStatus: booking.status.toLowerCase(),
                        amount: `${booking.amount.toLocaleString()}.00`,
                        paymentStatus: displayPaymentStatus,
                      }

                      return (
                        <TableRow key={service.id} className="hover:bg-gray-50">
                          {/* Vendor Info */}
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={service.vendorProfilePicture} alt={service.vendorName} />
                                <AvatarFallback>{service.vendorName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-gray-900">{service.vendorName}</p>
                              </div>
                            </div>
                          </TableCell>

                          {/* Contact Info - Only email, as phone not available for vendor */}
                         <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="h-4 w-4" />
                              <a href={`mailto:${service.vendorEmail}`} className="hover:text-blue-600">
                                {service.vendorEmail}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="h-4 w-4" />
                              <a href={`tel:${service.vendorPhone}`} className="hover:text-blue-600">
                                {service.vendorPhone}
                              </a>
                            </div>
                          </div>
                        </TableCell>

                          {/* Service Title */}
                          <TableCell>
                            <p className="text-gray-900 font-medium">{service.serviceTitle}</p>
                          </TableCell>

                          {/* Booking Slot */}
                          <TableCell>
                            <div className="text-sm text-gray-600">
                              {startDateTime} - {endDateTime}
                            </div>
                          </TableCell>

                          {/* Booking ID */}
                          <TableCell>
                            <p className="text-gray-600 font-mono text-sm">{service.bookingId}</p>
                          </TableCell>

                          {/* Service Status */}
                          <TableCell>
                            <Badge className={`${getStatusColor(service.serviceStatus)} border-0`}>
                              {service.serviceStatus}
                            </Badge>
                          </TableCell>

                          {/* Amount */}
                          <TableCell>
                            <p className="font-semibold text-gray-900">{service.amount}</p>
                          </TableCell>

                          {/* Payment Status */}
                          <TableCell>
                            <Badge className={`${getPaymentStatusColor(service.paymentStatus)} border-0`}>
                              {service.paymentStatus}
                            </Badge>
                          </TableCell>

                          {/* Actions */}
                          <TableCell>
                            {service.rawStatus !== "completed" && service.rawStatus!=="cancelled" &&  service.rawStatus!=="ongoing" && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleCancel(service.bookingId)}
                              >
                                Cancel Service
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-end mt-4 px-4 pb-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}