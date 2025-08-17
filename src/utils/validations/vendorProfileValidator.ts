import * as Yup from "yup"

export const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[\+]?[0-9\s\-\(\)]{10,}$/, "Invalid phone number format")
    .required("Phone number is required"),
  place: Yup.string()
    .min(2, "Place must be at least 2 characters")
    .max(100, "Place must be less than 100 characters")
    .required("Place is required"),
  about: Yup.string()
    .max(500, "About section must be less than 500 characters")
    .required(),
    image:Yup.string()
    .optional()
})