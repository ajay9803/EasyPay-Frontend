import AuthService from "../services/auth";
import { Toast } from "../utils/toast";
import { loginSchema } from "../schemas/login";
import * as yup from "yup";

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
        await AuthService.login(emailInput.value, passwordInput.value);
      }

      return isFormValid;
    };

    const loginButton = document.getElementById(
      "login-button"
    ) as HTMLButtonElement;

    loginButton.onclick = (e: MouseEvent) => {
      e.preventDefault();
      validateForm();
    };
  };
}
