import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/pages/ui/select";
import { Calendar } from "lucide-react";
import { getAllowedStatuses } from "@/utils/helpers/GetAllowedEventStatus";
import type { EventStatus } from "@/types/event";

interface EventStatusSelectProps {
  value: string;
  onChange: (status: EventStatus) => void;
}

export function EventStatusSelect({ value, onChange }: EventStatusSelectProps) {
 

  const allowedStatuses = getAllowedStatuses(value);

  const statusOptions = [
    {
      value: "upcoming",
      label: "Upcoming",
      color: "bg-blue-500"
    },
    {
      value: "ongoing",
      label: "Ongoing",
      color: "bg-green-500"
    },
    {
      value: "cancelled",
      label: "Cancelled",
      color: "bg-red-500"
    },
    {
      value: "completed",
      label: "Completed",
      color: "bg-gray-500"
    }
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-32">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {statusOptions
          .filter(option => allowedStatuses.includes(option.value))
          .map(option => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${option.color}`}></div>
                {option.label}
              </div>
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}