
import { useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/pages/ui/table"
import { Badge } from "@/components/pages/ui/badge"
import { Button } from "@/components/pages/ui/button"
import { Eye, Download } from "lucide-react"
import { format } from "date-fns"

interface BookedService {
  id: string
  customerName: string
  email: string
  phone: string
  serviceName: string
  bookingDate: Date
  bookingTime: string
  status: "confirmed" | "pending" | "completed" | "cancelled"
  amount: number
  currency: string
  paymentStatus: "paid" | "pending" | "failed"
}

// Mock data - replace with actual API call
const mockBookings: BookedService[] = [
  {
    id: "BK001",
    customerName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    serviceName: "Wedding Photography",
    bookingDate: new Date("2024-12-15"),
    bookingTime: "10:00 AM",
    status: "confirmed",
    amount: 2500,
    currency: "USD",
    paymentStatus: "paid",
  },
  {
    id: "BK002",
    customerName: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    serviceName: "Event Catering",
    bookingDate: new Date("2024-12-20"),
    bookingTime: "02:00 PM",
    status: "pending",
    amount: 1800,
    currency: "USD",
    paymentStatus: "pending",
  },
  {
    id: "BK003",
    customerName: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 345-6789",
    serviceName: "Venue Decoration",
    bookingDate: new Date("2024-12-10"),
    bookingTime: "09:00 AM",
    status: "completed",
    amount: 1200,
    currency: "USD",
    paymentStatus: "paid",
  },
  {
    id: "BK004",
    customerName: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+1 (555) 456-7890",
    serviceName: "DJ Services",
    bookingDate: new Date("2024-12-25"),
    bookingTime: "08:00 PM",
    status: "confirmed",
    amount: 1500,
    currency: "USD",
    paymentStatus: "paid",
  },
  {
    id: "BK005",
    customerName: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1 (555) 567-8901",
    serviceName: "Floral Arrangements",
    bookingDate: new Date("2024-12-18"),
    bookingTime: "11:00 AM",
    status: "cancelled",
    amount: 800,
    currency: "USD",
    paymentStatus: "failed",
  },
]

interface BookedServicesTableProps {
  searchTerm: string
}

export function VendorBookedServicesTable({ searchTerm }: BookedServicesTableProps) {
  const filteredBookings = useMemo(() => {
    return mockBookings.filter((booking) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        booking.customerName.toLowerCase().includes(searchLower) ||
        booking.email.toLowerCase().includes(searchLower) ||
        booking.id.toLowerCase().includes(searchLower) ||
        booking.serviceName.toLowerCase().includes(searchLower)
      )
    })
  }, [searchTerm])

  const getStatusBadge = (status: BookedService["status"]) => {
    const statusConfig = {
      confirmed: { label: "Confirmed", className: "bg-green-100 text-green-800 hover:bg-green-100" },
      pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
      completed: { label: "Completed", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
      cancelled: { label: "Cancelled", className: "bg-red-100 text-red-800 hover:bg-red-100" },
    }
    return statusConfig[status]
  }

  const getPaymentStatusBadge = (status: BookedService["paymentStatus"]) => {
    const statusConfig = {
      paid: { label: "Paid", className: "bg-green-100 text-green-800 hover:bg-green-100" },
      pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
      failed: { label: "Failed", className: "bg-red-100 text-red-800 hover:bg-red-100" },
    }
    return statusConfig[status]
  }

  return (
    <div className="w-full overflow-x-auto">
      {filteredBookings.length === 0 ? (
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
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Payment Status</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => {
              const statusBadge = getStatusBadge(booking.status)
              const paymentBadge = getPaymentStatusBadge(booking.paymentStatus)
              return (
                <TableRow key={booking.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium text-primary">{booking.id}</TableCell>
                  <TableCell>{booking.customerName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{booking.email}</TableCell>
                  <TableCell className="text-sm">{booking.phone}</TableCell>
                  <TableCell>{booking.serviceName}</TableCell>
                  <TableCell className="text-sm">
                    <div className="flex flex-col">
                      <span>{format(booking.bookingDate, "MMM dd, yyyy")}</span>
                      <span className="text-xs text-muted-foreground">{booking.bookingTime}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {booking.currency} {booking.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusBadge.className}>{statusBadge.label}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={paymentBadge.className}>{paymentBadge.label}</Badge>
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
