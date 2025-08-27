import { useState, useEffect } from "react";
import { VendorLayout } from "@/components/layouts/VendorLayout";
import { Button } from "@/components/pages/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/pages/ui/table";
import { Badge } from "@/components/pages/ui/badge";
import { Input } from "@/components/pages/ui/input";
import { Edit, Eye, EyeOff, Plus, Search } from "lucide-react";
import type { RootState } from "@/store/store";
import { CheckVerifiedModal } from "@/components/modals/CheckVerifiedModal";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/ui/UseToaster";
import { useNavigate } from "react-router-dom";
import { UseGetAllEvents } from "@/hooks/vendor/UseGetEvents";
import { useToggleEventMutation } from "@/hooks/vendor/UseToggleEvents";
import { useDebounce } from "@/hooks/services/UseDebounce";
import { Pagination } from "@/components/common/paginations/Pagination";
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage";

interface Event {
  _id: string;
  image: string;
  title: string;
  status: string;
  pricePerTicket: number;
  totalTicket: number;
  isActive: boolean;
  startTime: string;
  endTime: string;
  date: string;
}

export default function ListedEventsPage() {
  const vendor = useSelector((state: RootState) => state.vendor.vendor);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  const { data, isLoading, isError, error, refetch } = UseGetAllEvents({
    page: currentPage,
    limit,
    search: debouncedSearchTerm,
  });

  const toggleEventMutation = useToggleEventMutation(); // Initialize the mutation hook

  const events = data?.events || [];

  console.log("events", events);

  const totalPages = data?.total ? Math.ceil(data.total / limit) : 0;

  useEffect(() => {
    if (isError) {
      showToast(error?.message || "Failed to fetch events", "error");
    }
  }, [isError, error, showToast]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const toggleBlockStatus = (eventId: string, currentStatus: boolean) => {
    console.log("evet id",eventId)
    toggleEventMutation.mutate(
      { eventId, isActive: !currentStatus }, 
      {
        onSuccess: () => {
          refetch(); 
        },
      }
    );
  };

  const handleEdit = (eventId: string) => {
    console.log("event id", eventId);
    navigate(`/vendor/edit-event/${eventId}`);
  };

  const handleAddNewEvent = () => {
    if (vendor?.vendorStatus === "pending" || vendor?.vendorStatus === "rejected") {
      setShowVerificationModal(true);
    } else {
      navigate("/vendor/hostEvent");
    }
  };

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Events Management</h1>
            <p className="text-muted-foreground">Manage your events and their details</p>
          </div>
          <Button
            onClick={handleAddNewEvent}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
          >
            <Plus className="h-4 w-4" />
            Add New Event
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="md:col-span-2">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleSearchKeyPress}
                  className="h-12 pl-10 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Events</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading || toggleEventMutation.isLoading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Loading events...</span>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  {searchTerm ? "No events found matching your search." : "No events found."}
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Event Title</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Price/Ticket</TableHead>
                        <TableHead>Total Tickets</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events.map((event) => (
                        <TableRow key={event._id}>
                          <TableCell>
                            <img
                              src={event.image ? getCloudinaryImageUrl(event.image) : "/placeholder"}
                              alt={event.title}
                              className="w-12 h-12 object-cover rounded-md"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg";
                              }}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{event.title}</TableCell>
                          <TableCell>{event.date}</TableCell>
                          <TableCell>${event.pricePerTicket.toFixed(2)}</TableCell>
                          <TableCell>{event.totalTicket}</TableCell>
                          <TableCell>
                            <Badge variant={event.isActive ? "default" : "destructive"}>
                              {event.isActive ? "Active" : "Blocked"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleBlockStatus(event._id, event.isActive)}
                                className={`flex items-center gap-1 ${
                                  event.isActive ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"
                                }`}
                                disabled={toggleEventMutation.isLoading}
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
                                onClick={() => handleEdit(event._id)}
                                className="flex items-center gap-1"
                              >
                                <Edit className="h-4 w-4" />
                                Edit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
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
      </div>

      <CheckVerifiedModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        status={vendor?.vendorStatus}
        rejectReason={vendor?.rejectionReason}
        userName={vendor?.name}
        submissionDate={vendor?.createdAt}
      />
    </VendorLayout>
  );
}