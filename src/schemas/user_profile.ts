import * as yup from "yup";

/**
 * Schema for reset password form validation.
 * @typedef {Object} ResetPasswordSchema
 * @property {string} oldPassword - The old password.
 * @property {string} newPassword - The new password.
 */
export const resetPasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required."),
  newPassword: yup
    .string()
    .min(8, "New password must be at least 8 characters.")
    .required("New password is required."),
});

/**
 * Schema for reset password form validation.
 * @typedef {Object} SetNewPasswordSchema
 * @property {string} password - The new password.
 * @property {string} confirmPassword - The confirmation of the new password.
 */
export const setNewPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters.")
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Confirm password is required."),
});
