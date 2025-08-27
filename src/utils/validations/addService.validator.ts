import * as Yup from "yup"


  export const ServiceValidationSchema = Yup.object({
    serviceTitle: Yup.string()
      .required("Service title is required")
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must not exceed 100 characters"),
    yearsOfExperience: Yup.number()
      .required("Years of experience is required")
      .min(0, "Years of experience cannot be negative")
      .max(50, "Years of experience cannot exceed 50")
      .integer("Years of experience must be a whole number"),
    serviceDescription: Yup.string()
      .required("Description is required")
      .min(20, "Description must be at least 20 characters")
      .max(1000, "Description must not exceed 1000 characters"),
    servicePrice: Yup.number()
    .required("service price is required")
    .min(0, "Price cannot be negative"),
    additionalHourPrice: Yup.number()
      .min(0, "Additional hour price cannot be negative")
      .typeError("Additional hour price must be a number")
      .nullable(),
  cancellationPolicies: Yup.string()
    .required("Cancellation policy is required")
    .min(20, "Cancellation policy must be at least 20 characters")
    .max(2000, "Cancellation policy must not exceed 2000 characters"),
     termsAndConditions: Yup.string()
    .required("Terms & conditions are required")
    .min(20, "Terms & conditions must be at least 20 characters")
    .max(2000, "Terms & conditions must not exceed 2000 characters"),
    categoryId: Yup.string()
      .required("please select a category")
})