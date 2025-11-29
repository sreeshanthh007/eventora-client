// BookedservicesByVendorPage.tsx
import { BookedServicesByVendorsTable } from "@/components/admin/BookedServicesByVendors";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "@/components/mainComponents/AdminSidebar";
import { useEffect, useState } from "react";
import { useGetBookedServicesofVendor } from "@/hooks/admin/UseGetBookedServicesofVendors";
import { Input } from "@/components/pages/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/pages/ui/select";
import { Pagination } from "@/components/common/paginations/Pagination";
import { useDebounce } from "@/hooks/services/UseDebounce";
import { BookedServicesByVendorsSkeleton } from "@/components/common/skeletons/BookedServicesByVendors";

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const;

export default function BookedservicesByVendorPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, error } = useGetBookedServicesofVendor({
    page,
    limit,
    search: debouncedSearch,
    filterType: filterType === "all" ? "" : filterType,
  });


  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filterType]);

  const bookings = data?.response?.bookings || [];
  const total = data?.response?.total || 0;
  const totalPages =  total

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col w-full">
        <div className="min-h-screen bg-background">
          <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Booked Services</h1>
              <p className="text-muted-foreground mt-2">
                Manage all vendor bookings and service assignments
              </p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Input
                placeholder="Search by name, email, or phone..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="max-w-sm"
              />
              <Select
                value={filterType}
                onValueChange={(value) => {
                  setFilterType(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

           
            {isLoading && <BookedServicesByVendorsSkeleton limit={limit} />}

            {/* Error */}
            {error && (
              <div className="text-center py-12">
                <p className="text-destructive">Failed to load bookings.</p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && bookings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No bookings found.</p>
              </div>
            )}

            {/* Real Table + Pagination */}
            {!isLoading && !error && bookings.length > 0 && (
              <>
                <BookedServicesByVendorsTable services={bookings} />
                {totalPages  && (
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