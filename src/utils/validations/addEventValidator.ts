import * as yup from "yup";


const FILE_SIZE = 10 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/gif"];



export const eventSchema = yup.object().shape({
  title: yup
    .string()
    .required("Event name is required")
    .min(3, "Event name must be at least 3 characters"),

  eventSchedule: yup
    .array()
    .of(
      yup.object().shape({
        date: yup
          .date()
          .required("Date is required")
          .min(new Date(), "Date cannot be in the past"),
        startTime: yup.string().required("Start time is required"),
        endTime: yup
          .string()
          .required("End time is required")
          .test("is-after", "End time must be after start time", function (value) {
            const { startTime } = this.parent;
            return startTime && value ? value > startTime : true;
          }),
      })
    )
    .min(1, "At least one schedule entry is required")
    .required("Schedule is required"),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description should be at least 10 characters"),

  
  pricePerTicket: yup.number().when("tickets", {
    is: (tickets: any[]) => !tickets || tickets.length === 0,
    then: (schema) => schema.required("Price is required").positive("Price must be positive"),
    otherwise: (schema) => schema.notRequired(),
  }),

  totalTicket: yup.number().when("tickets", {
    is: (tickets: any[]) => !tickets || tickets.length === 0,
    then: (schema) => schema.required("Total tickets are required").min(1, "At least 1 ticket required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  maxTicketPerUser: yup.number().when("tickets", {
    is: (tickets: any[]) => !tickets || tickets.length === 0,
    then: (schema) =>
      schema
        .required("Ticket limit required")
        .min(1, "Limit must be at least 1")
        .max(yup.ref("totalTicket"), "Limit cannot exceed total tickets"),
    otherwise: (schema) => schema.notRequired(),
  }),

  
  tickets: yup.array().of(
    yup.object().shape({
      ticketType: yup.string().required("Ticket type is required"),
      pricePerTicket: yup.number().positive("Price must be positive").required("Price is required"),
      totalTickets: yup.number().min(1, "At least 1 ticket required").required("Total tickets are required"),
      maxTicketsPerUser: yup
        .number()
        .min(1, "Limit must be at least 1")
        .required("Ticket limit is required")
        .test("not-exceed", "Limit cannot exceed total tickets", function (value) {
          return value <= this.parent.totalTickets;
        }),
    })
  ),

  eventLocation: yup
    .string()
    .min(5, "min 5 characters required")
    .required("event location is required"),

 Images: yup
  .array()
  .of(
    yup
      .mixed()
      .test("fileSize", "File too large", (file) => {
        if (!file) return true; // empty allowed
        if (file instanceof File) {
          return file.size <= FILE_SIZE;
        }
        return true; // existing image strings pass
      })
      .test("fileType", "Unsupported file type", (file) => {
        if (!file) return true;
        if (file instanceof File) {
          return SUPPORTED_FORMATS.includes(file.type);
        }
        return true;
      })
  )
  .required("Event images are required"),
});

