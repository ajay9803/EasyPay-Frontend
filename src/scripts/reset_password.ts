import * as yup from "yup";
import { resetPasswordSchema } from "../schemas/user_profile";
import { Toast } from "../utils/toast";
import UserService from "../services/user";
import UserUtils from "../utils/user";

export class ResetPasswordAction {
  static resetPassword: () => Promise<void> = async () => {
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

    resetPasswordForm.addEventListener("submit", async (e: SubmitEvent) => {
      e.preventDefault();

      const formData = new FormData(resetPasswordForm);
      const data = {
        oldPassword: formData.get("oldPassword") as string,
        newPassword: formData.get("newPassword") as string,
      };

      oldPasswordInput.classList.remove("error-border");
      newPasswordInput.classList.remove("error-border");
      oldPasswordError.innerHTML = "";
      newPasswordError.innerHTML = "";

      console.log(data);
      try {
        const user = UserUtils.getUserDetails();
        const accessToken = UserUtils.getAccessToken();
        await resetPasswordSchema.validate(data, { abortEarly: false });

        await UserService.updatePassword(
          user.id,
          accessToken,
          data.oldPassword,
          data.newPassword
        )
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
