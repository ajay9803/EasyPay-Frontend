import * as yup from "yup";

/**
 * The schema for the login form.
 *
 * @typedef {object} LoginSchema
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 */
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character."
    )
    .required("Password is required."),
});
