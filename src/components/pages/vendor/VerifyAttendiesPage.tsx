import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { VerifyAttendiesEventHeaderSection } from "@/components/vendor/events/VerifyAttendiesEventHeader"
import { BookingProgressSection } from "@/components/vendor/events/BookingProgressionSection"
import { VerifyAttendiesTicketDetailsSection } from "@/components/vendor/events/TicketDetailsSection"
import { VendorLayout } from "@/components/layouts/VendorLayout"
import { useGetTicketDetails } from "@/hooks/vendor/UseGetTicketDetails"
import { useDebounce } from "@/hooks/services/UseDebounce";
import { useToast } from "@/hooks/ui/UseToaster";
import { Pagination } from "@/components/common/paginations/Pagination";
import { VerifyTicketModal } from "@/components/modals/VerifyTicketModal"
import QRScanner from "@/components/vendor/QrScanner"
import { Card, CardContent } from "@/components/pages/ui/card";
import { Input } from "@/components/pages/ui/input";
import { Loader2, Search } from "lucide-react";

interface Ticket {
  name: string;
  email: string;
  qrCode: string;
  ticketId: string;
  ticketType: string;
  isCheckedIn: boolean;
}

export default function VerifyAttendiesPage() {
  const location = useLocation()
  const eventData = location.state?.eventData
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerType, setScannerType] = useState<"scan-event" | "verify-ticket">("scan-event");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { showToast } = useToast();
  const limit = 6;
  const bookedTickets = eventData?.bookedTickets || 0;
  const bookingPercentage = eventData?.totalTicket ? (bookedTickets / eventData.totalTicket) * 100 : 0;

  const { data, isLoading, isError, error } = useGetTicketDetails({
    eventId:eventData.eventId,
    page: currentPage,
    limit,
    search: debouncedSearchTerm,
  });

  console.log("ticket detals are",data)
  useEffect(() => {
    if (data?.tickets) {
      setTickets(data.tickets);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      showToast(error?.message || "Failed to fetch tickets", "error");
    }
  }, [isError, error, showToast]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const totalPages = data ? Math.ceil((data.total || 0) / limit) : 0;

  const handleOpenModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
  };

  const handleConfirmCheckIn = () => {
    setScannerType("verify-ticket");
    setIsScannerOpen(true);
    handleCloseModal();
  };

  const handleScannerSuccess = (message: string) => {
    showToast(message, "success");
    setIsScannerOpen(false);
  };

  const handleScannerError = (message: string) => {
    showToast(message, "error");
    setIsScannerOpen(false);
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
    <main className="min-h-screen bg-background">
      <VendorLayout>
        <div className="container mx-auto px-4 py-8 space-y-6">
          <VerifyAttendiesEventHeaderSection event={eventData} />
          <BookingProgressSection 
            event={eventData} 
            bookedTickets={bookedTickets} 
            bookingPercentage={bookingPercentage} 
          />
          
          {/* Search Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="md:col-span-2">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    onKeyPress={handleSearchKeyPress}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin mr-2" />
              <span>Loading tickets...</span>
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                {searchTerm ? "No tickets found matching your search." : "No tickets found."}
              </p>
            </div>
          ) : (
            <>
              <VerifyAttendiesTicketDetailsSection 
                tickets={tickets} 
                onOpenModal={handleOpenModal} 
              />
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}

          <VerifyTicketModal
            isOpen={!!selectedTicket}
            onClose={handleCloseModal}
            selectedTicket={selectedTicket}
            onConfirmCheckIn={handleConfirmCheckIn}
          />

          <QRScanner
            eventId={eventData?.eventId || ""}
            isOpen={isScannerOpen}
            onClose={() => setIsScannerOpen(false)}
            onSuccess={handleScannerSuccess}
            onError={handleScannerError}
            scanningType={scannerType}
          />
        </div>
      </VendorLayout>
    </main>
  )
}