// src/pages/admin/ServicesByVendorsPage.tsx
import { ServicesByVendors } from "@/components/admin/ServicesByVendors";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "@/components/mainComponents/AdminSidebar";
import { useGetServicesofVendors } from "@/hooks/admin/UseGetServicesofVendors";
import { useToggleServicesByVendors } from "@/hooks/admin/useToggleServicesByVendors";
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
import { ServicesByVendorsSkeleton } from "@/components/common/skeletons/ServicesByVendorsSkeleton";
import { ConfirmDialog } from "@/components/common/popups/ConfirmationPopup";

const LIMIT = 6;

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "blocked", label: "Blocked" },
] as const;

interface Service {
  id: string;
  serviceTitle: string;
  description: string;
  servicePrice: number;
  status: 'active' | 'blocked';
  vendorName: string;
  profilePicture: string;
}

export default function ServicesByVendorsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [services, setServices] = useState<Service[]>([]);
  const [updatingServices, setUpdatingServices] = useState<Set<string>>(new Set());

  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    serviceId: string | null;
    newStatus: 'active' | 'blocked';
    serviceTitle: string;
  }>({
    open: false,
    serviceId: null,
    newStatus: "blocked",
    serviceTitle: "",
  });

  const debouncedSearch = useDebounce(searchInput, 500);
  const { mutate: toggleService } = useToggleServicesByVendors();

  const { data, isLoading, isError } = useGetServicesofVendors({
    page,
    limit: LIMIT,
    search: debouncedSearch,
    filterBy: filterStatus === "all" ? undefined : filterStatus,
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filterStatus]);

  useEffect(() => {
    if (data?.message?.services) {
      const mappedServices = data.message.services.map((service: any) => {
        const status = service.status?.toLowerCase() === "active" ? "active" : "blocked";
        return {
          id: service._id,
          serviceTitle: service.serviceTitle,
          description: service.serviceDescription || "No description",
          servicePrice: service.servicePrice,
          status,
          vendorName: service.vendorId?.name || "Unknown Vendor",
          profilePicture: service.vendorId?.profilePicture
            ? getCloudinaryImageUrl(service.vendorId.profilePicture)
            : "/placeholder.svg",
        };
      });
      setServices(mappedServices);
    } else {
      setServices([]);
    }
  }, [data]);

  const totalPages = data?.message?.total || 0;

  const handleToggleClick = (serviceId: string, newStatus: 'active' | 'blocked', serviceTitle: string) => {
    setConfirmDialog({
      open: true,
      serviceId,
      newStatus,
      serviceTitle,
    });
  };

  const handleConfirm = () => {
    const { serviceId, newStatus } = confirmDialog;
    if (!serviceId) return;

    setUpdatingServices((prev) => new Set([...prev, serviceId]));

    toggleService(
      { serviceId, status: newStatus },
      {
        onSuccess: () => {
          setServices((prev) =>
            prev.map((s) =>
              s.id === serviceId ? { ...s, status: newStatus } : s
            )
          );
        },
        onSettled: () => {
          setUpdatingServices((prev) => {
            const newSet = new Set(prev);
            newSet.delete(serviceId);
            return newSet;
          });
          setConfirmDialog({
            open: false,
            serviceId: null,
            newStatus: "blocked",
            serviceTitle: "",
          });
        },
      }
    );
  };

  const handleCancel = () => {
    setConfirmDialog({
      open: false,
      serviceId: null,
      newStatus: "blocked",
      serviceTitle: "",
    });
  };

  const isCurrentlyActive = confirmDialog.newStatus === "active";

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col w-full">
        <div className="min-h-screen bg-background">
          <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Vendor Services</h1>
              <p className="text-muted-foreground mt-2">
                Browse and manage services from our vendors
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Input
                placeholder="Search services..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setPage(1);
                }}
                className="max-w-sm"
              />

              <Select value={filterStatus} onValueChange={(value) => { setFilterStatus(value); setPage(1); }}>
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

            {isLoading && <ServicesByVendorsSkeleton limit={LIMIT} />}

            {isError && (
              <div className="text-center py-12">
                <p className="text-destructive">Failed to load services. Please try again.</p>
              </div>
            )}

            {!isLoading && !isError && services.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No services found.</p>
              </div>
            )}

            {!isLoading && !isError && services.length > 0 && (
              <>
                <ServicesByVendors
                  services={services}
                  onToggleClick={handleToggleClick}
                  updatingServices={updatingServices}
                />
                {totalPages > 0 && (
                  <div className="mt-6 flex justify-center">
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmDialog.open}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        title={isCurrentlyActive ? "Unblock Service" : "Block Service"}
        description={
          isCurrentlyActive
            ? `Are you sure you want to unblock the service "${confirmDialog.serviceTitle}"?`
            : `Are you sure you want to block the service "${confirmDialog.serviceTitle}"? This will prevent it from being visible to users.`
        }
        confirmLabel={isCurrentlyActive ? "Unblock" : "Block"}
        confirmColor={isCurrentlyActive ? "green" : "red"}
      />
    </SidebarProvider>
  );
}