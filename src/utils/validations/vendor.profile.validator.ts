

import * as  Yup from "yup"



export const vendorProfileSchema = Yup.object().shape({
    name:Yup.string()
    .required("Name is required")
    .max(20,"maximumm 20 charaters are allowed")
    .min(4,"minimum 5 charaters are required"),
    phone:Yup.string()
    .required("phone Number is required")
     .matches(/^\d{10}$/, "Invalid phone number"),
     place:Yup.string()
     .required("please enter your place")
     .max(20,"maximum 20 charaters are allowed")
     .min(3,"minimum 3 charaters are required"),
     about:Yup.string()
     .required("please provide a brief details about you")
})