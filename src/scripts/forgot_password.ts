import UserService from "../services/user";
import { Toast } from "../utils/toast";

export class ForgotPasswordActions {
  /**
   * Sends a forgot password link to the user's email address
   *
   * @returns {Promise<void>} A promise that resolves when the forgot password
   * link is sent successfully, or rejects with an error message if there was
   * an error.
   */
  static sendForgotPasswordLink = async (): Promise<void> => {
    const forgotPasswordForm = document.getElementById(
      "forgot-password-form"
    ) as HTMLFormElement;

    forgotPasswordForm.addEventListener(
      "submit",
      async (event: SubmitEvent) => {
        event.preventDefault();

        const emailInput = document.getElementById(
          "email-address"
        ) as HTMLInputElement;
        const email = emailInput.value;

        if (email) {
          await UserService.sendForgotPasswordLink(email)
            .then((data) => {
              Toast.showToast(data.message);
            })
            .catch((e) => {
              Toast.showToast(e.message);
            });
        }
      }
    );
  };
}
