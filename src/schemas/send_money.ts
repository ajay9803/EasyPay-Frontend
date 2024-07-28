import * as yup from "yup";

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
  remarks: yup.string().required("Remarks is required.").max(50, "Remarks cannot exceed 50 characters."),
});
