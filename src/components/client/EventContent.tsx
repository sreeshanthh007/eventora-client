import { Card, CardContent } from "@/components/pages/ui/card"
import { Badge } from "@/components/pages/ui/badge"

export default function EventsContent() {
  const events = [
    { id: 1, title: "Team Meeting", date: "2024-01-15", time: "10:00 AM", status: "upcoming" },
    { id: 2, title: "Project Review", date: "2024-01-18", time: "2:00 PM", status: "upcoming" },
    { id: 3, title: "Client Presentation", date: "2024-01-12", time: "3:00 PM", status: "completed" },
  ]

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">My Events</h1>
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
              </div>
              <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
                {event.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
