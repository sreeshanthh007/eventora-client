

import { Grid, List, Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/pages/ui/button"
import { Card, CardContent } from "@/components/pages/ui/card"
import { Badge } from "@/components/pages/ui/badge"
import { useState } from "react"
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage"
import { Pagination } from "../common/paginations/Pagination"
import { Link } from "react-router-dom"

interface Event {
  _id: string
  title: string
  description: string
  eventLocation: string
  eventSchedule: { date: string; startTime: string; endTime: string }[]
  pricePerTicket: number
  attendiesCount: number
  images: string
  status: string
}

interface EventsGridProps {
  events: Event[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function EventsGrid({ events, currentPage, totalPages, onPageChange }: EventsGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid") // View mode state preserved

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  const formatPrice = (price: number) => {
    return `₹${price}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{events.length}</span> events
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")} // setViewMode preserved
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")} // setViewMode preserved
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}`}>
        {events.map((event) => (
          <Card key={event._id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img
                src={event.images ? getCloudinaryImageUrl(event.images) : ""}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary">{event.status}</Badge>
                  <span className="text-lg font-semibold text-primary">{formatPrice(event.pricePerTicket)}</span>
                </div>

                <h3 className="text-xl font-semibold text-card-foreground line-clamp-2">{event.title}</h3>

                <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {event.eventSchedule[0]
                        ? `${formatDate(event.eventSchedule[0].date)} at ${event.eventSchedule[0].startTime}`
                        : "TBD"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{event.eventLocation}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{event.attendiesCount} attending</span>
                  </div>
                </div>

                <Link to={`/event-details/${event._id}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages} />
      <div className="flex justify-center mt-6"></div>
    </div>
  )
}