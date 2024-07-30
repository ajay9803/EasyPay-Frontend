import * as yup from "yup";

/**
 * The schema for the user registration form.
 *
 * @typedef {object} RegisterSchema
 * @property {string} fullName - The full name of the user.
 * @property {string} mobileNumber - The mobile number of the user.
 * @property {string} email - The email address of the user.
 * @property {Date} dob - The date of birth of the user.
 */
export const registerSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required."),
  mobileNumber: yup
    .string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits.")
    .required("Mobile number is required."),
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),
  dob: yup
    .date()
    .required("Date of Birth is required.")
    .typeError("Invalid date format (YYYY-MM-DD)."),
  gender: yup
    .string()
    .oneOf(["Male", "Female", "Other"], "Gender is required.")
    .required("Gender is required."),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters.")
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Confirm Password is required."),
});
