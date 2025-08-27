import { useState, useEffect } from "react";
import { VendorLayout } from "@/components/layouts/VendorLayout";
import { Button } from "@/components/pages/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card";
import { Badge } from "@/components/pages/ui/badge";
import { Input } from "@/components/pages/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/pages/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/pages/ui/dropdown-menu";
import { Edit, MoreHorizontal, Plus, Search, Shield, ShieldOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UseGeAllService } from "@/hooks/vendor/UseGetServices";
import { useDebounce } from "@/hooks/services/UseDebounce";
import { useToast } from "@/hooks/ui/UseToaster";
import { Pagination } from "@/components/common/paginations/Pagination";
import { useToggleServiceMutation } from "@/hooks/vendor/UseToggleServices";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/pages/ui/dialog";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { CheckVerifiedModal } from "@/components/modals/CheckVerifiedModal";

interface Service {
  _id: string;
  serviceTitle: string;
  serviceDescription: string;
  servicePrice: number;
  status: "active" | "blocked";
}

export default function ListedServicePage() {
  const vendor = useSelector((state:RootState)=>state.vendor.vendor);
  const [verifiedModal,setVerifiedModal] = useState(false)
  const [services, setServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    service: Service | null;
    action: "block" | "unblock";
  }>({
    isOpen: false,
    service: null,
    action: "block",
  });
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const limit = 6;

  // Use the custom hook for fetching services
  const { data, isLoading, isError, error } = UseGeAllService({
    page: currentPage,
    limit,
    search: debouncedSearchTerm,
  });


  const { mutateAsync: toggleService, isPending: isToggling } = useToggleServiceMutation();


  useEffect(() => {
    if (data?.services) {
      setServices(data.services);
    }
  }, [data]);


  useEffect(() => {
    if (isError) {
      showToast(error?.message || "Failed to fetch services", "error");
    }
  }, [isError, error, showToast]);

 
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const totalPages = data?.total ? Math.ceil(data.total / limit) : 1;

  const handleStatusToggle = (service: Service) => {
    const action = service.status === "active" ? "block" : "unblock";
    setConfirmDialog({
      isOpen: true,
      service,
      action,
    });
  };

  const handleConfirmAction = async () => {
    const { service, action } = confirmDialog;
    if (!service) return;

   
    const previousServices = services;
    setServices((prev) =>
      prev.map((s) =>
        s._id === service._id ? { ...s, status: action === "block" ? "blocked" : "active" } : s,
      ),
    );

    try {
      await toggleService({
        serviceId: service._id,
        status: action === "block" ? "blocked" : "active",
      });
    
     showToast("updated successfully","success")
    } catch (err) {

      setServices(previousServices);
      showToast("Failed to toggle service status", "error");
    } finally {
      setConfirmDialog({ isOpen: false, service: null, action: "block" });
    }
  };

  const handleCancelAction = () => {
    setConfirmDialog({ isOpen: false, service: null, action: "block" });
  };

  const getServiceDetails = (serviceId: string) => {
    navigate(`/vendor/edit-service/${serviceId}`);
  };


  const handleIsVerified = ()=>{
    if(vendor?.vendorStatus=="pending" || vendor?.vendorStatus=="rejected"){
      setVerifiedModal(true)
    }else{
      navigate("/vendor/addService")
    }
  }
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <VendorLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl text-foreground">Service Management</h1>
            <p className="text-muted-foreground">Manage your event services and pricing</p>
          </div>
    
            <Button className="flex items-center gap-2" onClick={handleIsVerified}>
              <Plus className="h-4 w-4"/>
              Add New Service
            </Button>
        </div>

        {/* Search Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="md:col-span-2">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleSearchKeyPress}
                  className="pl-10"
                  disabled={isToggling}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Services</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading services...</span>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  {searchTerm ? "No services found matching your search." : "No services found."}
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services.map((service) => (
                        <TableRow key={service._id}>
                          <TableCell className="font-medium">
                            <p className="font-semibold">{service.serviceTitle}</p>
                          </TableCell>
                          <TableCell>
                            <p className="max-w-xs truncate" title={service.serviceDescription}>
                              {service.serviceDescription}
                            </p>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-primary">${service.servicePrice}</span>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={service.status === "active" ? "default" : "destructive"}
                              className="capitalize"
                            >
                              {service.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => getServiceDetails(service._id)}
                                className="flex items-center gap-1"
                                disabled={isToggling}
                              >
                                <Edit className="h-3 w-3" />
                                Edit
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" disabled={isToggling}>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => handleStatusToggle(service)}
                                    className="flex items-center gap-2"
                                  >
                                    {service.status === "active" ? (
                                      <>
                                        <ShieldOff className="h-4 w-4" />
                                        Block Service
                                      </>
                                    ) : (
                                      <>
                                        <Shield className="h-4 w-4" />
                                        Unblock Service
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Show pagination if there are multiple pages */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <Dialog open={confirmDialog.isOpen} onOpenChange={(open) => !open && handleCancelAction()}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {confirmDialog.action === "block" ? "Block Service" : "Unblock Service"}
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to {confirmDialog.action} the service "
                {confirmDialog.service?.serviceTitle}"? This action will{" "}
                {confirmDialog.action === "block"
                  ? "prevent it from being available"
                  : "make it available again"}
                .
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={handleCancelAction} disabled={isToggling}>
                Cancel
              </Button>
              <Button
                variant={confirmDialog.action === "block" ? "destructive" : "default"}
                onClick={handleConfirmAction}
                disabled={isToggling}
              >
                {isToggling ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {confirmDialog.action === "block" ? "Blocking..." : "Unblocking..."}
                  </div>
                ) : (
                  confirmDialog.action === "block" ? "Block" : "Unblock"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <CheckVerifiedModal
      isOpen={verifiedModal}
      onClose={()=>setVerifiedModal(!true)}
      rejectReason={vendor?.rejectionReason}
      status={vendor?.vendorStatus}
      userName={vendor?.name}
      />
    </VendorLayout>
  );
}