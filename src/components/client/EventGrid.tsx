
import { useState } from "react"
import { Grid, List, Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/pages/ui/button"
import { Card, CardContent } from "@/components/pages/ui/card"
import { Badge } from "@/components/pages/ui/badge"

const dummyEvents = [
  {
    id: 1,
    title: "Tech Conference 2024",
    description: "Join industry leaders for the latest in technology trends and innovations.",
    date: "2024-03-15",
    time: "9:00 AM",
    location: "San Francisco Convention Center",
    category: "Technology",
    attendees: 250,
    price: "$299",
    image: "/tech-conference.png",
  },
  {
    id: 3,
    title: "Art Gallery Opening",
    description: "Discover contemporary art from emerging local artists.",
    date: "2024-03-28",
    time: "6:00 PM",
    location: "Downtown Art Gallery",
    category: "Arts & Culture",
    attendees: 75,
    price: "$25",
    image: "/vibrant-art-gallery.png",
  },
]

export function EventsGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{dummyEvents.length}</span> events
          </p>
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            No filters applied
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}`}>
        {dummyEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary">{event.category}</Badge>
                  <span className="text-lg font-semibold text-primary">{event.price}</span>
                </div>

                <h3 className="text-xl font-semibold text-card-foreground line-clamp-2">{event.title}</h3>

                <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {event.date} at {event.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
