
import { Button } from "@/components/pages/ui/button";
import { Plus } from "lucide-react";

interface EventsHeaderProps {
  onAddNewEvent: () => void;
}

export function EventsHeader({ onAddNewEvent }: EventsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl  tracking-tight">Events Management</h1>
        <p className="text-muted-foreground">Manage your events and their details</p>
      </div>
      <Button
        onClick={onAddNewEvent}
        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
      >
        <Plus className="h-4 w-4" />
        Add New Event
      </Button>
    </div>
  );
}
