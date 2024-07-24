import * as yup from "yup";

export const kycSchema = yup.object().shape({
  userImage: yup.mixed().required("User Image is required"),
  citizenshipNumber: yup.string().required("Citizenship Number is required"),
  issueDate: yup
    .date()
    .required("Date of Birth is required.")
    .typeError("Invalid date format (YYYY-MM-DD)."),
  citizenshipImage: yup.mixed().required("Citizenship Image is required"),
});
