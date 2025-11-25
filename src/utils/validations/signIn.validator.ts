import * as Yup from "yup"

export const signInschema = Yup.object().shape({
    email:Yup.string()
    .email("Invalid Email Address")
    .required("Email is required"),
    password:Yup.string()
    .min(8,"Password must be atleast 8 charaters")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
    )
    .required("Password is Required")
});