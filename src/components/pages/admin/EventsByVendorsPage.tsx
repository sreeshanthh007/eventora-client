
import { EventsByVendors } from "@/components/admin/EventsByVendors";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "@/components/mainComponents/AdminSidebar";
import { useGetVendorsEvents } from "@/hooks/admin/UseGetVendorEvents";
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

const LIMIT = 6;


const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "upcoming", label: "Upcoming" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const;

export default function EventsByVendorsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const debouncedSearch = useDebounce(searchInput, 500);


  const { data, isLoading, isError } = useGetVendorsEvents({
    page,
    limit: LIMIT,
    search: debouncedSearch,
    filterBy: filterStatus === "all" ? "" : filterStatus,
  });


  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filterStatus]);

const events =
    data?.response?.eventDetails?.map((event: any) => ({
      id: event._id || event.title,
      eventName: event.title,
      eventImage: event.image
        ? getCloudinaryImageUrl(event.image)
        : "/placeholder.svg",
      description: event.description,
      ticketPrice: event.pricePerTicket,
      totalTickets: event.totalTickets,
      eventLocation: event.eventLocation,
      status: event.status as
        | "upcoming"
        | "ongoing"
        | "completed"
        | "cancelled",
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
    })) || [];

  const totalPages = data?.response?.total || 0;

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col w-full">
        <div className="min-h-screen bg-background">
          <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">
                Vendor Events
              </h1>
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

            {/* Error */}
            {isError && (
              <div className="text-center py-12">
                <p className="text-destructive">
                  Failed to load events. Please try again.
                </p>
              </div>
            )}

            {/* Empty */}
            {!isLoading && !isError && events.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No events found.</p>
              </div>
            )}

    
            {!isLoading && !isError && events.length > 0 && (
              <>
                <EventsByVendors events={events} />
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
    </SidebarProvider>
  );
}