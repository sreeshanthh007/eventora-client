
import { useState } from "react"
import { VendorLayout } from "@/components/layouts/VendorLayout"
import { Button } from "@/components/pages/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/pages/ui/table"
import { Badge } from "@/components/pages/ui/badge"
import { Edit, Eye, EyeOff } from "lucide-react"
import type { RootState } from "@/store/store"
import { CheckVerifiedModal } from "@/components/modals/CheckVerifiedModal"
import { useSelector } from "react-redux"
import { useToast } from "@/hooks/ui/UseToaster"
import { Navigate, useNavigate } from "react-router-dom"

interface Event {
  id: string
  name: string
  startDate: string
  endDate: string
  ticketAmount: number
  isBlocked: boolean
}

export default function ListedEventsPage() {
  const vendor = useSelector((state:RootState)=>state.vendor.vendor)
  const navigate = useNavigate()

  const [showVerificationModal,setShowVerificationModal] = useState(false)
  const {showToast} = useToast()
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      name: "Summer Music Festival",
      startDate: "2024-07-15",
      endDate: "2024-07-17",
      ticketAmount: 150,
      isBlocked: false,
    },
    {
      id: "2",
      name: "Corporate Conference 2024",
      startDate: "2024-08-20",
      endDate: "2024-08-22",
      ticketAmount: 75,
      isBlocked: true,
    },
    {
      id: "3",
      name: "Wedding Photography Session",
      startDate: "2024-09-10",
      endDate: "2024-09-10",
      ticketAmount: 200,
      isBlocked: false,
    },
    {
      id: "4",
      name: "Tech Innovation Summit",
      startDate: "2024-10-05",
      endDate: "2024-10-07",
      ticketAmount: 120,
      isBlocked: false,
    },
  ])

  const toggleBlockStatus = (eventId: string) => {
    setEvents(events.map((event) => (event.id === eventId ? { ...event, isBlocked: !event.isBlocked } : event)))
  }

  const handleEdit = (eventId: string) => {
    // Placeholder for edit functionality
    console.log("Edit event:", eventId)
  }


const handleAddNewEvent = ()=>{

  if(vendor?.vendorStatus=="pending" || vendor?.vendorStatus=="rejected"){
    setShowVerificationModal(true)
  }else{

    navigate("/vendor/hostEvent")
  }
  
}

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <VendorLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Events Management</h1>
          <Button onClick={handleAddNewEvent}>Add New Event</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Ticket Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell>{formatDate(event.startDate)}</TableCell>
                    <TableCell>{formatDate(event.endDate)}</TableCell>
                    <TableCell>${event.ticketAmount}</TableCell>
                    <TableCell>
                      <Badge variant={event.isBlocked ? "destructive" : "default"}>
                        {event.isBlocked ? "Blocked" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleBlockStatus(event.id)}
                          className={
                            event.isBlocked ? "text-green-600 hover:text-green-700" : "text-red-600 hover:text-red-700"
                          }
                        >
                          {event.isBlocked ? (
                            <>
                              <Eye className="h-4 w-4 mr-1" />
                              Unblock
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-4 w-4 mr-1" />
                              Block
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(event.id)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <CheckVerifiedModal
      isOpen={showVerificationModal}
      onClose={()=>setShowVerificationModal(false)}
      status={vendor?.vendorStatus}
      rejectReason={vendor?.rejectionReason}
      userName={vendor?.name}
      submissionDate={vendor.createdAt}
    />
    </VendorLayout>
  )
}
