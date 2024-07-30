import * as yup from "yup";

/**
 * The schema for validating the send money form.
 * @type {Object}
 * @property {yup.StringSchema} email - The email address of the recipient.
 * @property {yup.NumberSchema} amount - The amount to be transferred.
 * @property {yup.StringSchema} purpose - The purpose of the transfer.
 * @property {yup.StringSchema} remarks - The remarks for the transfer.
 */
export const sendMoneySchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),
  amount: yup
    .number()
    .min(1, "Amount must be greater than 0.")
    .required("Amount is required."),
  purpose: yup.string().required("Purpose is required."),
  remarks: yup
    .string()
    .required("Remarks is required.")
    .max(50, "Remarks cannot exceed 50 characters."),
});
