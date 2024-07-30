import UserService from "../services/user";
import { Toast } from "../utils/toast";

export class ForgotPasswordActions {
  static sendForgotPasswordLink = async () => {
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
          await UserService.sendForgotPasswordLink(email).then((data) => {
            Toast.showToast(data.message);
          }).catch((e) => {
            Toast.showToast(e.message);
          })
        }
      }
    );
  };
}
