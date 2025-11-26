import { Card } from '@/components/pages/ui/card';
import { Badge } from '@/components/pages/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/pages/ui/avatar';

interface Event {
  id: string;
  eventName: string;
  eventImage: string;
  description: string;
  ticketPrice: number;
  totalTickets: number;
  eventLocation: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  eventSchedule: string;
  eventProviderName: string;
  profilePicture: string;
}

interface EventsByVendorsProps {
  events: Event[];
}

const statusConfig = {
  upcoming: { label: 'Upcoming', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  ongoing: { label: 'Ongoing', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  completed: { label: 'Completed', className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' },
  cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
};

export function EventsByVendors({ events }: EventsByVendorsProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <Card className="overflow-hidden border border-border">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Event</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Provider</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Schedule</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Location</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Price</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Total Tickets</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={event.eventImage}
                          alt={event.eventName}
                          className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
                          onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate max-w-[220px]">
                            {event.eventName}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-2 max-w-[220px]">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={event.profilePicture} alt={event.eventProviderName} />
                          <AvatarFallback>{event.eventProviderName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-foreground truncate max-w-[120px]">
                          {event.eventProviderName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{event.eventSchedule}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{event.eventLocation}</td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-foreground">
                      ₹{event.ticketPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-foreground">
                      {event.totalTickets}
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={statusConfig[event.status].className}>
                        {statusConfig[event.status].label}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-border">
            {events.map((event) => (
              <div key={event.id} className="p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <img
                    src={event.eventImage}
                    alt={event.eventName}
                    className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                    onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground">{event.eventName}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Provider</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={event.profilePicture} />
                        <AvatarFallback>{event.eventProviderName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-foreground truncate">{event.eventProviderName}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Schedule</p>
                    <p className="text-foreground mt-1">{event.eventSchedule}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Location</p>
                    <p className="text-foreground mt-1">{event.eventLocation}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Price</p>
                    <p className="text-foreground font-medium mt-1">₹{event.ticketPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Tickets</p>
                    <p className="text-foreground mt-1">{event.totalTickets}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Status</p>
                    <Badge className={`${statusConfig[event.status].className} text-xs mt-1`}>
                      {statusConfig[event.status].label}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}