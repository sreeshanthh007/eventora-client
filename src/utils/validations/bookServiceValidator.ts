
import * as Yup from "yup"

export const  BookServiceSchema = Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      date: Yup.date()
        .min(new Date(new Date().setHours(0, 0, 0, 0)), "Date must be today or later")
        .required("Service date is required"),
      message: Yup.string(),
    })