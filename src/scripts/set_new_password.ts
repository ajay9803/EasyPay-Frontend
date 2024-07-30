import * as yup from "yup";
import { setNewPasswordSchema } from "../schemas/user_profile";
import { Toast } from "../utils/toast";
import UserService from "../services/user";
import UserUtils from "../utils/user";

export class SetNewPasswordActions {
  static resetPassword: () => Promise<void> = async () => {
    const locationHash = window.location.hash;

    const hashArray = locationHash.split("/");
    const id = hashArray[hashArray.length - 2];
    const otp = hashArray[hashArray.length - 1];

    console.log("The id and otp are: ", id, otp);

    const resetPasswordForm = document.getElementById(
      "reset-password-form"
    ) as HTMLFormElement;

    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const confirmPasswordInput = document.getElementById(
      "confirm-password"
    ) as HTMLInputElement;

    const passwordError = document.getElementById(
      "password-error"
    ) as HTMLParagraphElement;
    const confirmPasswordError = document.getElementById(
      "confirm-password-error"
    ) as HTMLParagraphElement;

    resetPasswordForm.addEventListener("submit", async (e: SubmitEvent) => {
      e.preventDefault();

      console.log("Form submitted.");

      const formData = new FormData(resetPasswordForm);
      const data = {
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
        otp: formData.get("otp") as string,
      };

      passwordInput.classList.remove("error-border");
      confirmPasswordInput.classList.remove("error-border");
      passwordError.innerHTML = "";
      confirmPasswordError.innerHTML = "";

      console.log(data);
      try {
        const accessToken = UserUtils.getAccessToken();
        await setNewPasswordSchema.validate(data, { abortEarly: false });

        console.log("The id and otp are: ", id, otp);

        await UserService.setNewPassword(id, accessToken, data.password, otp)
          .then((data: any) => {
            Toast.showToast(data.message);
          })
          .catch((e) => {
            Toast.showToast(e.message);
          });
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          console.log("error is here");
          Toast.showToast("Please fill in all the fields.");
          err.inner.forEach((error) => {
            switch (error.path) {
              case "password":
                passwordInput.classList.add("error-border");
                passwordError.innerHTML = error.message;
                break;
              case "confirmPassword":
                confirmPasswordInput.classList.add("error-border");
                confirmPasswordError.innerHTML = error.message;
                break;
              default:
                break;
            }
          });
        }
      }
    });
  };
}
