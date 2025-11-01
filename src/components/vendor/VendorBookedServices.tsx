import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/pages/ui/table"
import { Badge } from "@/components/pages/ui/badge"
import { Button } from "@/components/pages/ui/button"
import { Eye, Download } from "lucide-react"

export interface BookedService {
  bookingId: string
  name: string
  email: string
  phone: string
  serviceId:{
    serviceTItle:string
  }
  bookingSlot: {
    startDateTIme:Date,
    endDateTime:Date
  }
  bookingTime: string
  status: "confirmed" | "pending" | "completed" | "cancelled"
  amount: number
  currency: string
  paymentStatus: "successfull" | "pending" | "failed"
}

interface BookedServicesTableProps {
  bookings: BookedService[]
}

export function VendorBookedServicesTable({ bookings }: BookedServicesTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground text-lg">No bookings found</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search criteria</p>
        </div>
     ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Booking ID</TableHead>
              <TableHead className="font-semibold">Customer Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Phone</TableHead>
              <TableHead className="font-semibold">Service</TableHead>
              <TableHead className="font-semibold">Booking Date & Time</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Service Status</TableHead>
              <TableHead className="font-semibold">Payment Status</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => {
              const startDate = new Date(booking.bookingSlot.startDateTIme);
              const endDate = new Date(booking.bookingSlot.endDateTime);
              const formattedDate = startDate.toLocaleDateString();
              const formattedStartTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              const formattedEndTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return (
                <TableRow key={booking.bookingId} className="hover:bg-muted/50">
                  <TableCell className="font-medium text-primary">{booking.bookingId}</TableCell>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell className="font-medium text-muted-foreground">{booking.email}</TableCell>
                  <TableCell className="text-sm">{booking.phone}</TableCell>
                  <TableCell>{booking.serviceId.serviceTItle}</TableCell>
                  <TableCell className="text-sm">
                    <div className="flex flex-col">
                      <span>{formattedDate}</span>
                      <span className="text-xs text-muted-foreground">
                        {formattedStartTime} - {formattedEndTime}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                   {booking.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        booking.status === "confirmed" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                        booking.status === "pending" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                        booking.status === "completed" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                        "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {
                       booking.status === "pending" ? "Pending" :
                       booking.status === "completed" ? "Completed" :
                       "Cancelled"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        booking.paymentStatus === "successfull" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                        booking.paymentStatus === "pending" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                        "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {booking.paymentStatus === "successfull" ? "Paid" :
                       booking.paymentStatus === "pending" ? "Pending" :
                       "Failed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download invoice</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </div>
  )
}