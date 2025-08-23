import * as yup from "yup";


const FILE_SIZE = 10 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/gif"];

export const eventSchema = yup.object().shape({
  title: yup
    .string()
    .required("Event name is required")
    .min(3, "Event name must be at least 3 characters"),

  date: yup
    .date()
    .required("Event date is required")
    .min(new Date(), "Event date cannot be in the past"),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description should be at least 10 characters"),

  startTime: yup
    .string()
    .required("Start time is required"),

  endTime: yup
    .string()
    .required("End time is required")
    .test("is-after", "End time must be after start time", function (value) {
      const { startTime } = this.parent;
      return startTime && value ? value > startTime : true;
    }),

  pricePerTicket: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),

  totalTicket: yup
    .number()
    .typeError("Total tickets must be a number")
    .required("Total tickets are required")
    .integer("Must be an integer")
    .min(1, "At least 1 ticket required"),

  ticketLimit: yup
    .number()
    .typeError("Ticket limit must be a number")
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .min(1, "Limit must be at least 1")
    .max(yup.ref("totalTicket"), "Limit cannot exceed total tickets"),

  eventLocation: yup
  .string()
  .min(5,"min 5 charaters required")
  .required("event location is required"),

  images: yup
    .array()
    .of(
      yup.mixed().test("fileSize", "File too large", (file) =>
        !file || file.size <= FILE_SIZE
      ).test("fileType", "Unsupported file type", (file) =>
        !file || SUPPORTED_FORMATS.includes(file.type)
      )
    ),
});
