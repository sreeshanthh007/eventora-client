import * as  Yup from "yup"

 export const emailSchema = Yup.object().shape({
    email:Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address")
})

