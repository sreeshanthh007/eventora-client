import { Button } from "@/components/pages/ui/button";
import { Badge } from "@/components/pages/ui/badge";
import { TableCell, TableRow } from "@/components/pages/ui/table";
import { Edit, Eye, EyeOff } from "lucide-react";
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage";
import { EventStatusSelect } from "./EventStatusSelect";
import type { Event, EventStatus } from "@/types/event";
import { formatDateForInput } from "@/utils/helpers/FormatDate";

interface EventTableRowProps {
  event: Event;
  onToggleStatus: (eventId: string, currentStatus: boolean) => void;
  onStatusChange: (eventId: string, status: EventStatus) => void;
  onEdit: (eventId: string) => void;
  isLoading?: boolean;
}

export function EventTableRow({ 
  event, 
  onToggleStatus, 
  onStatusChange, 
  onEdit, 
  isLoading 
}: EventTableRowProps) {
 
  const date = event.eventSchedule.map(item=>item.date)
  const formattedDate = formatDateForInput(date)

  return (
    <TableRow>
      <TableCell>
        <img
          src={event.image ? getCloudinaryImageUrl(event.image) : "/placeholder.svg"}
          alt={event.title}
          className="w-12 h-12 object-cover rounded-md"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </TableCell>
      <TableCell className="font-medium">{event.title}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>${event.pricePerTicket}</TableCell>
      <TableCell>{event.totalTicket}</TableCell>
      <TableCell>
        <Badge variant={event.isActive ? "default" : "destructive"}>
          {event.isActive ? "Active" : "Blocked"}
        </Badge>
      </TableCell>
      <TableCell>
        <EventStatusSelect
          value={event.status}
          onChange={(status) => onStatusChange(event._id, status)}
        />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleStatus(event._id, event.isActive)}
            className={`flex items-center gap-1 ${
              event.isActive ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"
            }`}
            disabled={isLoading}
          >
            {event.isActive ? (
              <>
                <EyeOff className="h-4 w-4" />
                Block
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                Unblock
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(event._id)}
            className="flex items-center gap-1"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}