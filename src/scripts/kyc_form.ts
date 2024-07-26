import { kycSchema } from "../schemas/kyc";
import * as yup from "yup";
import { Toast } from "../utils/toast";
import KycService from "../services/kyc";
import UserUtils from "../utils/user";

class KycFormActions {
  static submitKycForm: () => void = () => {
    const kycForm = document.getElementById("kyc-form") as HTMLFormElement;

    const userImageInput = document.getElementById(
      "user-image"
    ) as HTMLInputElement;
    const userImageError = document.getElementById(
      "user-image-error"
    ) as HTMLParagraphElement;
    const citizenshipNumberInput = document.getElementById(
      "citizenship-number"
    ) as HTMLInputElement;
    const citizenshipNumberError = document.getElementById(
      "citizenship-number-error"
    ) as HTMLParagraphElement;
    const issueDateInput = document.getElementById(
      "issue-date"
    ) as HTMLInputElement;
    const issueDateError = document.getElementById(
      "issue-date-error"
    ) as HTMLParagraphElement;
    const citizenshipImageInput = document.getElementById(
      "citizenship-image"
    ) as HTMLInputElement;
    const citizenshipImageError = document.getElementById(
      "citizenship-image-error"
    ) as HTMLParagraphElement;

    const removeErrorMessages = () => {
      citizenshipImageError.innerHTML = "";
      citizenshipNumberError.innerHTML = "";
      userImageError.innerHTML = "";
      issueDateError.innerHTML = "";
      citizenshipImageError.classList.remove("error-border");
      citizenshipNumberError.classList.remove("error.border");
      userImageError.classList.remove("error-border");
      issueDateError.classList.remove("error-border");
    };

    kycForm.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault();

      removeErrorMessages();

      const formData = new FormData(kycForm);
      const formObject: { [key: string]: FormDataEntryValue } = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      kycSchema
        .validate(formObject, { abortEarly: false })
        .then(async () => {
          console.log("Form is valid", formObject);
          const accessToken = UserUtils.getAccessToken();
          await KycService.applyForKyc(accessToken, formObject );
        })
        .catch((err) => {
          if (err instanceof yup.ValidationError) {
            Toast.showToast("Please fill in all the fields.");
            err.inner.forEach((error: yup.ValidationError) => {
              switch (error.path) {
                case "userImage":
                  userImageInput.classList.add("error-border");
                  userImageError.innerHTML = error.message;
                  break;
                case "citizenshipNumber":
                  citizenshipNumberInput.classList.add("error-border");
                  citizenshipNumberError.innerHTML = error.message;
                  break;
                case "issueDate":
                  issueDateInput.classList.add("error-border");
                  issueDateError.innerHTML = error.message;
                  break;
                case "citizenshipImage":
                  citizenshipImageInput.classList.add("error-border");
                  citizenshipImageError.innerHTML = error.message;
                  break;
                default:
                  break;
              }
            });
          }
        });
    });
  };
}

export default KycFormActions;
