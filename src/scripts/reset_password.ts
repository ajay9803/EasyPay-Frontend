import * as yup from "yup";
import { resetPasswordSchema } from "../schemas/user_profile";
import { Toast } from "../utils/toast";
import UserService from "../services/user";
import UserUtils from "../utils/user";

/**
 * Class representing the actions for the reset password page.
 *
 * @class
 */
export class ResetPasswordAction {
  static resetPassword: () => Promise<void> = async () => {
    /**
     * Define elements of the reset password page
     */
    const resetPasswordForm = document.getElementById(
      "reset-password-form"
    ) as HTMLFormElement;

    const oldPasswordInput = document.getElementById(
      "old-password"
    ) as HTMLInputElement;
    const newPasswordInput = document.getElementById(
      "new-password"
    ) as HTMLInputElement;

    const oldPasswordError = document.getElementById(
      "old-password-error"
    ) as HTMLParagraphElement;
    const newPasswordError = document.getElementById(
      "new-password-error"
    ) as HTMLParagraphElement;

    /**
     * Handles the submit event for the reset password form.
     */
    resetPasswordForm.addEventListener("submit", async (e: SubmitEvent) => {
      e.preventDefault();

      // Get the form data as object
      const formData = new FormData(resetPasswordForm);
      const data = {
        oldPassword: formData.get("oldPassword") as string,
        newPassword: formData.get("newPassword") as string,
      };

      oldPasswordInput.classList.remove("error-border");
      newPasswordInput.classList.remove("error-border");
      oldPasswordError.innerHTML = "";
      newPasswordError.innerHTML = "";

      try {
        const user = UserUtils.getUserDetails();
        const accessToken = UserUtils.getAccessToken();
        await resetPasswordSchema.validate(data, { abortEarly: false });

        if (user) {
          /**
           * If the user exists, update the password.
           * Show success or error toast.
           */
          await UserService.updatePassword(
            user.id,
            accessToken,
            data.oldPassword,
            data.newPassword
          )
            .then((data: any) => {
              Toast.showToast(data.message);
              history.back();
            })
            .catch((e) => {
              Toast.showToast(e.message);
            });
        }
      } catch (err) {
        /**
         * Show error toast if the form is not valid.
         * Show error messages on input fields.
         */
        if (err instanceof yup.ValidationError) {
          Toast.showToast("Please fill in all the fields.");
          err.inner.forEach((error) => {
            switch (error.path) {
              case "oldPassword":
                oldPasswordInput.classList.add("error-border");
                oldPasswordError.innerHTML = error.message;
                break;
              case "newPassword":
                newPasswordInput.classList.add("error-border");
                newPasswordError.innerHTML = error.message;
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
