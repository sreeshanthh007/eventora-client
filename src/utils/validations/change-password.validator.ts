import * as Yup from "yup"

export const PasswordSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
        .required("Password is required")
        .min(8, "Must be at least 8 characters")
        .matches(/[A-Z]/, "Must include an uppercase letter")
        .matches(/[a-z]/, "Must include a lowercase letter")
        .matches(/\d/, "Must include a number")
        .matches(/[^A-Za-z0-9]/, "Must include a special character")
})