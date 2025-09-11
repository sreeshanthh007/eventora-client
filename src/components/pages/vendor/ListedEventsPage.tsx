import { VendorLayout } from "@/components/layouts/VendorLayout";
import { CheckVerifiedModal } from "@/components/modals/CheckVerifiedModal";
import { EventsHeader } from "@/components/vendor/events/EventsHeader";
import { EventsSearchBar } from "@/components/vendor/events/EventSearchBar";
import { EventsTable } from "@/components/vendor/events/EventTable";
import { useEventsPage } from "@/hooks/vendor/UseEventsPage";

export default function ListedEventsPage() {
  const {
    vendor,
    showVerificationModal,
    setShowVerificationModal,
    searchTerm,
    currentPage,
    events,
    totalPages,
    isLoading,
    toggleBlockStatus,
    handleStatusChange,
    handleEdit,
    handleAddNewEvent,
    handleSearchInputChange,
    handleSearchKeyPress,
    handlePageChange,
  } = useEventsPage();

  return (
    <VendorLayout>
      <div className="space-y-6">
        <EventsHeader onAddNewEvent={handleAddNewEvent} />
        
        <EventsSearchBar 
          searchTerm={searchTerm}
          onSearchChange={handleSearchInputChange}
          onSearchKeyPress={handleSearchKeyPress}
        />
        
        <EventsTable
          events={events}
          isLoading={isLoading}
          searchTerm={searchTerm}
          currentPage={currentPage}
          totalPages={totalPages}
          onToggleStatus={toggleBlockStatus}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onPageChange={handlePageChange}
        />
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