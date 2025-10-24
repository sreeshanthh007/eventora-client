import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage";
import { Clock, MapPin } from "lucide-react"


interface EventSchedule {
  date: string;
  startTime: string;
  endTime: string;
}

interface Event {
  id?: string;
  image: string;
  title: string;
  eventLocation: string;
  eventSchedule: EventSchedule[];
  totalTicket: number;
  bookedTickets?: number;
}

interface EventHeaderSectionProps {
  event: Event;
}

export function VerifyAttendiesEventHeaderSection({ event }: EventHeaderSectionProps) {
  const schedule = event.eventSchedule[0] || { date: '', startTime: '', endTime: '' }

  return (
    <div className="mb-8">
      <div className="relative h-96 w-full overflow-hidden rounded-lg mb-6">
        <img src={event.image ? getCloudinaryImageUrl(event.image) : ""} alt="" />
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">{event.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span>{event.eventLocation}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <span>
              {new Date(schedule.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{schedule.startTime}</span>
          <span>-</span>
          <span>{schedule.endTime}</span>
        </div>
      </div>
    </div>
  )
}