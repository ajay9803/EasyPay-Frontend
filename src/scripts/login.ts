import AuthService from "../services/auth";
import { Toast } from "../utils/toast";
import { loginSchema } from "../schemas/login";
import * as yup from "yup";
import { IUser } from "../interfaces/user";
import { isUserAdmin } from "../utils/admin_check";
import Navigator from "../utils/navigate";
import { HOME_PATH, VERIFY_KYC_APPLICATIONS_PATH } from "../constants/routes";

/**
 * Class representing the actions for the login page.
 *
 * @class
 */
export class LoginActions {
  static login: () => void = () => {
    /**
     * Define a boolean variable to check if the form is valid.
     * Define a string variable to store the error message.
     */
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

    /**
     * Removes the error messages from the email and password input elements.
     *
     * @returns {void}
     */
    const removeErrorMessages: () => void = (): void => {
      emailErrorMessageElement.innerHTML = "";
      passwordErrorMessageElement.innerHTML = "";
    };

    const loginButtonContent = document.getElementById(
      "login-button-content"
    ) as HTMLParagraphElement;

    const loadingStatus = document.getElementById(
      "loading-status"
    ) as HTMLDivElement;

    /**
     * Handles the input event for the email input field.
     *
     * @return {void}
     */
    emailInput.oninput = (): void => {
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

    /**
     * Handles the input event for the password input field.
     *
     * @return {void}
     */
    passwordInput.oninput = (): void => {
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

    /**
     *
     * @returns {Promise<boolean>} A promise that resolves to `true` if the form is valid,
     * `false` otherwise.
     * Handles the click event for the login button.
     *
     * @returns {Promise<boolean>} A promise that resolves to a boolean value.
     */
    const validateForm = async (): Promise<boolean> => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      removeErrorMessages();

      try {
        await loginSchema.validate({ email, password }, { abortEarly: false });
        isFormValid = true;
      } catch (err) {
        /**
         * Display the error messages in the input fields
         */
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

      /**
       * Initiate login if the form is valid
       * Shows a loading state
       */
      if (isFormValid) {
        loginButtonContent.innerHTML = "";
        loadingStatus.style.display = "block";

        await AuthService.login(emailInput.value, passwordInput.value)
          .then((jsonData: any) => {
            localStorage.setItem("user", JSON.stringify(jsonData.user));
            localStorage.setItem("access-token", jsonData.accessToken);

            Toast.showToast(jsonData.message);

            const user: IUser = jsonData.user;

            /**
             * Checks if the user is admin
             * Navigate to the appropriate paths
             */

            if (isUserAdmin(user.roleId)) {
              Navigator.navigateTo(`/${VERIFY_KYC_APPLICATIONS_PATH}`);
            } else {
              Navigator.navigateTo(`/${HOME_PATH}`);
            }
          })
          .catch((e: any) => {
            Toast.showToast(e.message);
          })
          .finally(() => {
            loginButtonContent.innerHTML = "login";
            loadingStatus.style.display = "none";
          });
      }

      return isFormValid;
    };

    const loginForm = document.getElementById("login-form") as HTMLFormElement;

    /**
     * Adds a submit event listener to the login form.
     *
     * @param {SubmitEvent} e - The submit event object.
     */
    loginForm.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault();
      validateForm();
    });
  };

  /**
   * Toggles the visibility of the password field.
   *
   * @return {void}
   */
  static togglePasswordView = (): void => {
    const viewPassword = document.getElementById(
      "view-password"
    ) as HTMLElement;
    const hidePassword = document.getElementById(
      "hide-password"
    ) as HTMLElement;

    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;

    if (passwordInput.type === "text") {
      viewPassword.style.display = "none";
      hidePassword.style.display = "block";
    } else {
      viewPassword.style.display = "block";
      hidePassword.style.display = "none";
    }

    viewPassword.onclick = () => {
      passwordInput.type = "text";
      viewPassword.style.display = "none";
      hidePassword.style.display = "block";
    };

    hidePassword.onclick = () => {
      passwordInput.type = "password";
      viewPassword.style.display = "block";
      hidePassword.style.display = "none";
    };
  };
}
