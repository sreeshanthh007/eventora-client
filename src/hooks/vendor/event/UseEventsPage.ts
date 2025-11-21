import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/ui/UseToaster";
import { UseGetAllEvents } from "@/hooks/vendor/event/UseGetEvents";
import { useToggleEventMutation } from "./UseToggleEvents";
import { useDebounce } from "@/hooks/services/UseDebounce";
import type { RootState } from "@/store/store";
import type { Event, EventStatus } from "@/types/event";
import { useUpdateEventStatusMutation } from "./UseUpdateEventStatus";

export function useEventsPage() {
  const vendor = useSelector((state: RootState) => state.vendor.vendor);
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<Event[]>([]);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const limit = 6;

  const { data, isLoading, isError, error } = UseGetAllEvents({
    page: currentPage,
    limit,
    search: debouncedSearchTerm,
  });
  const toggleEventMutation = useToggleEventMutation();
  const {mutateAsync:updateEventStatusMutation} = useUpdateEventStatusMutation()

  const totalPages = data?.total

  useEffect(() => {
    if (data?.events) {
      setEvents(data.events);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      showToast(error?.message || "Failed to fetch events", "error");
    }
  }, [isError, error, showToast]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const toggleBlockStatus = async (eventId: string, currentStatus: boolean) => {
    try {
      const response = await toggleEventMutation.mutateAsync({ 
        eventId, 
        isActive: !currentStatus 
      });

      if (response?.success) {
        setEvents(prevEvents =>
          prevEvents.map(event =>
            event._id === eventId 
              ? { ...event, isActive: !currentStatus }
              : event
          )
        );
        
      }
    } catch (error) {
      showToast(
        error?.message || "Failed to update event status", 
        "error"
      );
    }
  };

  const handleStatusChange = async (eventId: string, newStatus: EventStatus) => {

    const response = await updateEventStatusMutation({
        eventId,
        eventStatus:newStatus
    });

    if(response.success){
        setEvents(prevEvents =>
          prevEvents.map(event =>
            event._id === eventId 
              ? { ...event, status: newStatus }
              : event
          )
        );
    }
  };

  const handleEdit = (eventId: string) => {

    navigate(`/vendor/edit-event/${eventId}`);
  };

  const handleAddNewEvent = () => {
    if (vendor?.vendorStatus === "pending" || vendor?.vendorStatus === "rejected") {
      setShowVerificationModal(true);
    } else {
      navigate("/vendor/hostEvent");
    }
  };

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value);
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

  return {
  
    vendor,
    showVerificationModal,
    setShowVerificationModal,
    searchTerm,
    currentPage,
    events,
    totalPages,
    isLoading: isLoading,
    
    toggleBlockStatus,
    handleStatusChange,
    handleEdit,
    handleAddNewEvent,
    handleSearchInputChange,
    handleSearchKeyPress,
    handlePageChange,
  };
}