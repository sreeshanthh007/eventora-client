import * as Yup from "yup"
import { requiredImageSchema } from "./image.validator"

const VendorSignupSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,14}$/, "Phone number is not valid")
    .required("Phone number is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  image: requiredImageSchema, // Add the image field here
})

export default VendorSignupSchema
