import { motion } from "framer-motion"
import { Calendar, MapPin, Users, ChevronRight } from "lucide-react"

interface Event {
  id: string
  name: string
  date: string
  location: string
  attendees: number
  status: "confirmed" | "pending" | "sold-out"
  ticketsAvailable: number
}

const upcomingEvents: Event[] = []

export function UpcomingEvents() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "sold-out":
        return "bg-rose-50 text-rose-700 border-rose-200"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDaysUntil = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntil
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-blue-100/50 px-6 py-4">
        <h2 className="text-xl font-semibold text-slate-900">Upcoming Events</h2>
        <p className="text-sm text-slate-600 mt-1">Next 5 events scheduled</p>
      </div>

      {/* Events List */}
      <div className="divide-y divide-slate-200">
        {upcomingEvents.length === 0 ? (
          <div className="p-6 text-center text-slate-500">No upcoming events</div>
        ) : (
          upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Event Name & Days Until */}
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-base font-semibold text-slate-900 truncate">{event.name}</h3>
                    <div className="whitespace-nowrap px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                      In {getDaysUntil(event.date)} days
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                    <MapPin className="w-4 h-4 flex-shrink-0 text-slate-400" />
                    <span className="truncate">{event.location}</span>
                  </div>

                  {/* Details Row */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="w-4 h-4 text-slate-400" />
                      {event.attendees.toLocaleString()} attendees
                    </div>
                  </div>
                </div>

                {/* Status & Tickets */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                  {event.status !== "sold-out" && (
                    <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                      {event.ticketsAvailable} tickets
                    </span>
                  )}
                  {event.status === "sold-out" && (
                    <span className="text-xs text-rose-600 bg-rose-50 px-2 py-1 rounded font-medium">Sold Out</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-slate-50 px-6 py-3">
        <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group">
          View all events
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  )
}