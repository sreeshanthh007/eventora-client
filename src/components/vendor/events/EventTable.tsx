import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/pages/ui/table";
import { Pagination } from "@/components/common/paginations/Pagination";
import { EventTableRow } from "./EventTableRow";
import type { Event, EventStatus } from "@/types/event";

interface EventsTableProps {
  events: Event[];
  isLoading: boolean;
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  onToggleStatus: (eventId: string, currentStatus: boolean) => void;
  onStatusChange: (eventId: string, status: EventStatus) => void;
  onEdit: (eventId: string) => void;
  onPageChange: (page: number) => void;
}

export function EventsTable({
  events,
  isLoading,
  searchTerm,
  currentPage,
  totalPages,
  onToggleStatus,
  onStatusChange,
  onEdit,
  onPageChange,
}: EventsTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading events...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              {searchTerm ? "No events found matching your search." : "No events found."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Event Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price/Ticket</TableHead>
                <TableHead>Total Tickets</TableHead>
                <TableHead>Active Status</TableHead>
                <TableHead>Event Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <EventTableRow
                  key={event._id}
                  event={event}
                  onToggleStatus={onToggleStatus}
                  onStatusChange={onStatusChange}
                  onEdit={onEdit}
                  isLoading={isLoading}
                />
              ))}
            </TableBody>
          </Table>
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </CardContent>
    </Card>
  );
}
