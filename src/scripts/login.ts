import AuthService from "../services/auth";
import { Toast } from "../utils/toast";
import { loginSchema } from "../schemas/login";
import * as yup from "yup";
import { Router } from "../router";
import { IUser } from "../interfaces/user";
import { isUserAdmin } from "../utils/admin_check";

export class LoginActions {
  static login: () => void = () => {
    let isFormValid: boolean = false;
    let errorMessage: string = "";

    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;

    const emailErrorMessageElement = document.getElementById(
      "email-error"
    ) as HTMLParagraphElement;
    const passwordErrorMessageElement = document.getElementById(
      "password-error"
    ) as HTMLParagraphElement;

    const removeErrorMessages: () => void = () => {
      emailErrorMessageElement.innerHTML = "";
      passwordErrorMessageElement.innerHTML = "";
    };

    const loginButton = document.getElementById(
      "login-button"
    ) as HTMLButtonElement;

    const loginButtonContent = document.getElementById(
      "login-button-content"
    ) as HTMLParagraphElement;

    emailInput.oninput = () => {
      loginSchema
        .validateAt("email", { email: emailInput.value })
        .then(() => {
          emailInput.classList.remove("error-border");
          emailErrorMessageElement.innerHTML = "";
        })
        .catch((err) => {
          emailInput.classList.add("error-border");
          emailErrorMessageElement.innerHTML = err.message;
        });
    };

    passwordInput.oninput = () => {
      loginSchema
        .validateAt("password", { password: passwordInput.value })
        .then(() => {
          passwordInput.classList.remove("error-border");
          passwordErrorMessageElement.innerHTML = "";
        })
        .catch((err) => {
          passwordInput.classList.add("error-border");
          passwordErrorMessageElement.innerHTML = err.message;
        });
    };

    const validateForm = async (): Promise<boolean> => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      removeErrorMessages();

      try {
        await loginSchema.validate({ email, password }, { abortEarly: false });
        isFormValid = true;
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          err.inner.forEach((error) => {
            if (error.path === "email") {
              emailInput.classList.add("error-border");
              emailErrorMessageElement.innerHTML = error.message;
            } else if (error.path === "password") {
              passwordInput.classList.add("error-border");
              passwordErrorMessageElement.innerHTML = error.message;
            }
          });
        }
        isFormValid = false;
        errorMessage = "Please fill in valid values.";
        Toast.showToast(errorMessage);
      }

      if (isFormValid) {
        loginButtonContent.innerHTML = "Loading";
        await AuthService.login(emailInput.value, passwordInput.value)
          .then((jsonData: any) => {
            localStorage.setItem("user", JSON.stringify(jsonData.user));
            localStorage.setItem("access-token", jsonData.accessToken);
            localStorage.setItem("refresh-token", jsonData.refreshToken);

            Toast.showToast(jsonData.message);

            const user: IUser = jsonData.user;

            if (isUserAdmin(user.roleId)) {
              history.pushState(null, "", "/#/admin/verify-kyc-applications");
            } else {
              history.pushState(null, "", "/#/home");
            }

            Router.handleRouteChange();
          })
          .catch((e: any) => {
            Toast.showToast(e.message);
          })
          .finally(() => {
            loginButtonContent.innerHTML = "login";
          });
      }

      return isFormValid;
    };

    loginButton.onclick = (e: MouseEvent) => {
      e.preventDefault();
      validateForm();
    };
  };
}
