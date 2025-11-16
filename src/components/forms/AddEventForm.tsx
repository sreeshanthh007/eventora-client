
import { useFormik } from "formik"
import { Button } from "@/components/pages/ui/button"
import { eventSchema } from "@/utils/validations/addEventValidator"
import { BasicInformationSection } from "./event/BasicInformationSection"
import { EventScheduleSection } from "./event/EventScheduleSection"
import { PricingTicketsSection } from "./event/PricingTicketSection"
import { EventLocationSection } from "./event/EventLocationSection"
import { EventImagesSection } from "./event/EventImagesSection"

export interface IEventFormData {
  title: string;
  description: string;
  eventSchedule: Array<{
    date: string;
    startTime: string;
    endTime: string;
  }>;
  pricePerTicket: number;
  totalTicket: number;
  maxTicketPerUser: number;
  tickets: Array<{
    ticketType: string;
    price: number;
    totalTickets: number;
    maxTicketsPerUser: number;
  }>;
  eventLocation: string;
  location: [number, number] | null;
  Images: File[];
}

export function AddEventForm({ onSubmit }: { onSubmit: (data: IEventFormData) => void }) {
  const formik = useFormik<IEventFormData>({
    initialValues: {
      title: "",
      description: "",
      eventSchedule: [{ date: "", startTime: "", endTime: "" }],
      pricePerTicket: 0,
      totalTicket: 0,
      maxTicketPerUser: 0,
      tickets: [],
      eventLocation: "",
      location: null,
      Images: [],
    },
    validationSchema: eventSchema,
    onSubmit: (values) => {
      onSubmit(values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <BasicInformationSection formik={formik} />
      <EventScheduleSection formik={formik} />
      <PricingTicketsSection formik={formik} />
      <EventLocationSection formik={formik} />
      <EventImagesSection formik={formik} />

      <div className="flex justify-end gap-4">
       <Button
      type="submit"
      disabled={formik.isSubmitting}
      className="bg-primary hover:bg-primary/90"
    >
      {formik.isSubmitting ? "Creating..." : "Create Event"}
    </Button>
      </div>
    </form>
  )
}