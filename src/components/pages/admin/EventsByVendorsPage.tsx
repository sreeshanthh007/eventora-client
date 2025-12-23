import { EventsByVendors } from "@/components/admin/EventsByVendors";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "@/components/mainComponents/AdminSidebar";
import { useGetVendorsEvents } from "@/hooks/admin/UseGetVendorEvents";
import { useToggleEventsByVendors } from "@/hooks/admin/UseToggleEventsByVendors";
import { useState, useEffect } from "react";
import { Input } from "@/components/pages/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/pages/ui/select";
import { Pagination } from "@/components/common/paginations/Pagination";
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage";
import { useDebounce } from "@/hooks/services/UseDebounce";
import { EventsByVendorsSkeleton } from "@/components/common/skeletons/EventsByVendorsSkeleton";
import { ConfirmDialog } from "@/components/common/popups/ConfirmationPopup";

const LIMIT = 6;

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "upcoming", label: "Upcoming" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const;

interface Event {
  id: string;
  eventName: string;
  eventImage: string;
  description: string;
  ticketPrice: number;
  totalTickets: number;
  eventLocation: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isActive: boolean;
  eventSchedule: string;
  eventProviderName: string;
  profilePicture: string;
}

export default function EventsByVendorsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [updatingEvents, setUpdatingEvents] = useState<Set<string>>(new Set());

  // Dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    eventId: string | null;
    newIsActive: boolean;
    eventName: string;
  }>({
    open: false,
    eventId: null,
    newIsActive: false,
    eventName: "",
  });

  const debouncedSearch = useDebounce(searchInput, 500);

  const { mutate: toggleEvent } = useToggleEventsByVendors();

  const { data, isLoading, isError } = useGetVendorsEvents({
    page,
    limit: LIMIT,
    search: debouncedSearch,
    filterBy: filterStatus === "all" ? "" : filterStatus,
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filterStatus]);

  useEffect(() => {
    if (data?.response?.eventDetails) {
      const mappedEvents = data.response.eventDetails.map((event: any) => ({
        id: event.id,
        eventName: event.title,
        eventImage: event.image
          ? getCloudinaryImageUrl(event.image)
          : "/placeholder.svg",
        description: event.description,
        ticketPrice: event.pricePerTicket,
        totalTickets: event.totalTickets,
        eventLocation: event.eventLocation,
        status: event.status as "upcoming" | "ongoing" | "completed" | "cancelled",
        isActive: event.isActive,
        eventSchedule: event.eventSchedule
          .map((s: any) => {
            const date = new Date(s.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            return `${date} ${s.startTime} - ${s.endTime}`;
          })
          .join(", "),
        eventProviderName: event.hostId?.name || "Unknown Vendor",
        profilePicture: event.hostId?.profilePicture
          ? getCloudinaryImageUrl(event.hostId.profilePicture)
          : "/placeholder.svg",
      }));
      setEvents(mappedEvents);
    }
  }, [data]);

  const totalPages = data?.response?.total || 0;

  // Open confirmation dialog
  const handleToggleClick = (eventId: string, newIsActive: boolean, eventName: string) => {
    setConfirmDialog({
      open: true,
      eventId,
      newIsActive,
      eventName,
    });
  };

  // Confirm action
  const handleConfirm = () => {
    const { eventId, newIsActive } = confirmDialog;
    if (!eventId) return;

    setUpdatingEvents((prev) => new Set([...prev, eventId]));

    toggleEvent(
      { eventId, isActive: newIsActive },
      {
        onSuccess: () => {
          setEvents((prev) =>
            prev.map((e) => (e.id === eventId ? { ...e, isActive: newIsActive } : e))
          );
          setUpdatingEvents((prev) => {
            const newSet = new Set(prev);
            newSet.delete(eventId);
            return newSet;
          });
        },
        onError: () => {
          setUpdatingEvents((prev) => {
            const newSet = new Set(prev);
            newSet.delete(eventId);
            return newSet;
          });
        },
        onSettled: () => {
          setConfirmDialog({ open: false, eventId: null, newIsActive: false, eventName: "" });
        },
      }
    );
  };

  // Cancel dialog
  const handleCancel = () => {
    setConfirmDialog({ open: false, eventId: null, newIsActive: false, eventName: "" });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col w-full">
        <div className="min-h-screen bg-background">
          <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Vendor Events</h1>
              <p className="text-muted-foreground mt-2">
                Browse and manage events from our vendors
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Input
                placeholder="Search events..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setPage(1);
                }}
                className="max-w-sm"
              />

              <Select
                value={filterStatus}
                onValueChange={(value) => {
                  setFilterStatus(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isLoading && <EventsByVendorsSkeleton limit={LIMIT} />}

            {isError && (
              <div className="text-center py-12">
                <p className="text-destructive">
                  Failed to load events. Please try again.
                </p>
              </div>
            )}

            {!isLoading && !isError && events.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No events found.</p>
              </div>
            )}

            {!isLoading && !isError && events.length > 0 && (
              <>
                <EventsByVendors
                  events={events}
                  onToggleClick={handleToggleClick}
                  updatingEvents={updatingEvents}
                />
                {totalPages && (
                  <div className="mt-6 flex justify-center">
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={setPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        title={confirmDialog.newIsActive ? "Unblock Event" : "Block Event"}
        description={
          confirmDialog.newIsActive
            ? `Are you sure you want to unblock the event "${confirmDialog.eventName}"?`
            : `Are you sure you want to block the event "${confirmDialog.eventName}"? This will prevent it from being visible to users.`
        }
        confirmLabel={confirmDialog.newIsActive ? "Unblock" : "Block"}
        confirmColor={confirmDialog.newIsActive ? "green" : "red"}
      />
    </SidebarProvider>
  );
}