import * as yup from "yup";
import { setNewPasswordSchema } from "../schemas/user_profile";
import { Toast } from "../utils/toast";
import UserService from "../services/user";
import UserUtils from "../utils/user";
import Navigator from "../utils/navigate";
import { LOGIN_PATH } from "../constants/routes";

/**
 * Class representing the actions for the set new password page.
 * @class
 */
export class SetNewPasswordActions {
  /**
   * Reset password function to handle the reset password form submission.
   *
   * @return {Promise<void>} Promise that resolves when the form is submitted successfully.
   */
  static resetPassword: () => Promise<void> = async (): Promise<void> => {
    const locationHash = window.location.hash;

    /**
     * Split the location Hash.
     * Fetch id and otp from the locationHas.
     */
    const hashArray = locationHash.split("/");
    const id = hashArray[hashArray.length - 2];
    const otp = hashArray[hashArray.length - 1];

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

    /**
     * Handles the submit event for the reset password form.
     */
    resetPasswordForm.addEventListener("submit", async (e: SubmitEvent) => {
      e.preventDefault();

      // Get the form data as object
      const formData = new FormData(resetPasswordForm);
      const data = {
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
        otp: formData.get("otp") as string,
      };

      /**
       * Clear error borders and remove error messages
       */
      passwordInput.classList.remove("error-border");
      confirmPasswordInput.classList.remove("error-border");
      passwordError.innerHTML = "";
      confirmPasswordError.innerHTML = "";

      try {
        const accessToken = UserUtils.getAccessToken();
        await setNewPasswordSchema.validate(data, { abortEarly: false });

        /**
         * Set new password
         */
        await UserService.setNewPassword(id, accessToken, data.password, otp)
          .then((data: any) => {
            Toast.showToast(data.message);
            Navigator.navigateTo(`/${LOGIN_PATH}`);
          })
          .catch((e) => {
            Toast.showToast(e.message);
          });
      } catch (err) {
        /**
         * Show error messages if the form is invalid.
         * Display error borders on the input fields.
         */
        if (err instanceof yup.ValidationError) {
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
