import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/pages/ui/table"
import { Badge } from "@/components/pages/ui/badge"
import { Button } from "@/components/pages/ui/button"

export interface BookedService {
  bookingId: string
  name: string
  email: string
  phone: string
  serviceId: {
    serviceTItle: string
  }
  bookingSlot: {
    startDate: string
    slotStartTime: string
    slotEndTime: string
  }
  bookingTime: string
  status: "ongoing" | "pending" | "completed" | "cancelled"
  amount: number
  currency: string
  paymentStatus: "successfull" | "pending" | "failed"
}

interface BookedServicesTableProps {
  bookings: BookedService[]
  onStartBookedServiceSubmit:(bookingId:string)=>void
  onStopBookedServiceSubmit:(bookingId:string)=>void
}

export function VendorBookedServicesTable({ bookings , onStartBookedServiceSubmit , onStopBookedServiceSubmit}: BookedServicesTableProps) {

  const handleStartBookedService = (bookingId:string)=>{

    if(bookingId){
 
      onStartBookedServiceSubmit(bookingId)
    }

 }

 const handleStopBookedService = (bookingId:string)=>{

    if(bookingId){
      onStopBookedServiceSubmit(bookingId)
    }
 }
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
              const date = new Date(booking.bookingSlot.startDate)
              const startTime = new Date(booking.bookingSlot.slotStartTime)
              const endTime = new Date(booking.bookingSlot.slotEndTime)
              const formattedDate = date.toLocaleDateString()
              const formattedStartTime = startTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
           
              })

              const formattedEndTime = endTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
           
              })
              const now = new Date()
              const nowUTC = new Date(
              Date.UTC(
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate(),
                now.getUTCHours(),
                now.getUTCMinutes(),
                now.getUTCSeconds()
              )
            )
              const serviceStartTimeUTC = new Date(booking.bookingSlot.slotStartTime) 
              const serviceEndTimeUTC = new Date(booking.bookingSlot.slotEndTime) 
              const isReadyToStart = nowUTC >= serviceStartTimeUTC
              const hasServiceEnded = nowUTC >= serviceEndTimeUTC
              const canStart = booking.status === "pending" && isReadyToStart
              const canStop = booking.status === "ongoing" && hasServiceEnded
              
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
                  <TableCell className="font-semibold">{booking.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        booking.status === "ongoing"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : booking.status === "completed"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {booking.status === "ongoing"
                        ? "ongoing"
                        : booking.status === "pending"
                          ? "Pending"
                          : booking.status === "completed"
                            ? "Completed"
                            : "Cancelled"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        booking.paymentStatus === "successfull"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : booking.paymentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {booking.paymentStatus === "successfull"
                        ? "Paid"
                        : booking.paymentStatus === "pending"
                          ? "Pending"
                          : "Failed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={!canStart}
                        onClick={()=>handleStartBookedService(booking.bookingId)}
                        className={`text-xs hover:bg-transparent px-2 h-8 ${
                          canStart
                            ? "text-green-600 hover:text-green-800"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        title="Start Service"
                      >
                        Start Service
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={!canStop}
                        onClick={()=>handleStopBookedService(booking.bookingId)}
                        className={`text-xs hover:bg-transparent px-2 h-8 ${
                          canStop
                            ? "text-red-600 hover:text-red-800"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        title="Stop Service"
                      >
                        Stop Service
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