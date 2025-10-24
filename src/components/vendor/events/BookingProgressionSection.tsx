// components/event/BookingProgressSection.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Ticket } from "lucide-react"

interface Event {
  totalTicket: number;
}

interface BookingProgressSectionProps {
  event: Event;
  bookedTickets: number;
  bookingPercentage: number;
}

export function BookingProgressSection({ 
  event, 
  bookedTickets, 
  bookingPercentage 
}: BookingProgressSectionProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ticket className="h-5 w-5" />
          Ticket Booking Progress
        </CardTitle>
        <CardDescription>
          {bookedTickets} of {event.totalTicket} tickets booked
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-500 ease-out"
            style={{ width: `${bookingPercentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-foreground">{bookingPercentage.toFixed(1)}% Booked</span>
          <span className="text-sm text-muted-foreground">
            {event.totalTicket - bookedTickets} tickets remaining
          </span>
        </div>
      </CardContent>
    </Card>
  )
}