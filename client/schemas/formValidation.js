import { object, ref, string } from "yup";

// Password regex variable
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const registerSchema = object({
  username: string()
    .required("Username is required")
    .min(3, "Minimum 3 characters required"),
  email: string().required("Email is required").email("Invalid email"),
  password: string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Must include one uppercase, one number, one special character, and be at least 8 characters."
    ),
  confirmPassword: string()
    .required("Confirm Password is required")
    .oneOf([ref("password"), null], "Passwords must match"),
});
