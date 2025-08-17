

import * as Yup from "yup"
import { emailSchema } from "./email.validator"

export const profileValidateSchema = Yup.object().shape({
    email:emailSchema,
    name:Yup.string()
    .required("Name is required")
    .max(20,"maximum 20 charaters are allowed")
    .min(5,"minimum 5 charaters required"),
    phone:Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Invalid phone number"),
})