
import * as Yup from "yup"
// .matches(/^\d{10}$/, "Invalid phone number"),
// .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")

const ClientSignupSchema = Yup.object().shape({
    name:Yup.string()
    .required("Name is required")
    .matches(
			/^[a-zA-Z\s]+$/,
			"Full name should only contain letters and spaces"
	)
    .min(2,"Name should be atleast 2 charaters")
    .max(50,"Name must not exceed 50 charaters"),

    email:Yup.string()
    .required("Email is required")
    .email("Invalid Email address"),

    phone:Yup.string()
    .required("Contact Number required")
   .matches(/^\d{10}$/, "Invalid phone number"),

   password:Yup.string()
   .required("Password is required")
     .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
    ),

    confirmPassword:Yup.string()
    .oneOf([Yup.ref("password")],"passwords must match")
});

export default ClientSignupSchema