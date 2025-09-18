import { VendorLayout } from "@/components/layouts/VendorLayout";
import { EditEventForm, type IEventFormData } from "../../forms/EditEventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card";
import { ArrowLeft, Edit, Loader2 } from "lucide-react";
import { Button } from "@/components/pages/ui/button";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UseGetEventsById } from "@/hooks/vendor/UseGetEventsById";
import { useToast } from "@/hooks/ui/UseToaster";
import { uploadImageToCloudinarySigned } from "@/services/cloudinary/cloudinary";
import { useEditEventMutation } from "@/hooks/vendor/UseEditEvents";
import { formatDateForInput } from "@/utils/helpers/FormatDate";

export default function EditEventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Fetch event data
  const { data: eventResponse, isLoading, isError, error } = UseGetEventsById(eventId!);
  const {mutateAsync:editEvent} = useEditEventMutation()
  console.log("data in edit event", eventResponse);



const event: IEventFormData | undefined = eventResponse?.events
  ? {
      title: eventResponse.events.title || "",
      description: eventResponse.events.description || "",
      eventSchedule: eventResponse.events.eventSchedule?.map((schedule: any) => ({
        date: formatDateForInput(schedule.date), 
        startTime: schedule.startTime || "",
        endTime: schedule.endTime || "",
      })) || [{ date: "", startTime: "", endTime: "" }],
      pricePerTicket: Number(eventResponse.events.pricePerTicket) || 0,
      totalTicket: Number(eventResponse.events.totalTicket) || 0,
      maxTicketPerUser: Number(eventResponse.events.maxTicketPerUser) || 0,
      tickets: eventResponse.events.tickets?.map((ticket: any) => ({
        ticketType: ticket.ticketType || "",
        pricePerTicket: Number(ticket.pricePerTicket) || 0, 
        totalTickets: Number(ticket.totalTickets) || 0,
        maxTicketsPerUser: Number(ticket.maxTicketsPerUser) || 0,
      })) || [],
      eventLocation: eventResponse.events.eventLocation || "",
      location: eventResponse.events.location?.coordinates || null,
      Images: eventResponse.events.images || [],
      eventType: eventResponse.events.eventType || "normal",
    }
  : undefined;



  useEffect(() => {
    if (isError) {
      console.log("Error fetching event:", error);
      showToast(error?.message || "Failed to fetch event details", "error");
    }
  }, [isError, error, showToast]);



  // Handle form submission
  const handleSubmit = async (data: IEventFormData) => {
    setIsSubmitting(true);
    try {
      console.log("data before submit", data);
      
          let uploadedImageIds: string[] = [];
    if (data.Images?.length) {
      const results = await Promise.all(
        data.Images.map((file) =>
          file instanceof File
            ? uploadImageToCloudinarySigned(file, "event-images")
            : Promise.resolve(file) 
        )
      );
      uploadedImageIds = results.filter(Boolean) as string[];
    }

   const formattedData = {
     ...data,
    location: data.location
    ? { type: "Point" as const, coordinates: data.location } 
    : undefined,
};
    await editEvent({eventId:eventId!,data:formattedData})

    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    navigate("/vendor/events");
  };

  // Loading state
  if (isLoading) {
    return (
      <VendorLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading event details...</span>
          </div>
        </div>
      </VendorLayout>
    );
  }

  // Error or no event found
  if (isError || !event) {
    return (
      <VendorLayout>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {isError
                  ? "There was an error loading the event details."
                  : "The event you're looking for could not be found."}
              </p>
              <Link to="/vendor/events">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Events
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </VendorLayout>
    );
  }

  return (
    <VendorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/vendor/events">
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Edit className="h-6 w-6 text-primary" />
              Edit Event
            </h1>
            <p className="text-muted-foreground">Update your event details and settings</p>
          </div>
        </div>

        {/* Edit Form */}
        <EditEventForm initialData={event} onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isSubmitting} />
      </div>
    </VendorLayout>
  );
}