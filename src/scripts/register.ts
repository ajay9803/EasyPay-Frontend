import * as yup from "yup";
import { Toast } from "../utils/toast";
import { registerSchema } from "../schemas/register";
import AuthService from "../services/auth";

/**
 * Class representing the actions for the register page.
 * @class
 */
export class RegisterActions {
  /**
   * Registers a new user.
   *
   * @return {void} No return value.
   */
  static register: () => void = (): void => {
    /**
     * Define elements of the form
     */
    const signupForm = document.getElementById(
      "signup-form"
    ) as HTMLFormElement;
    const userNameInput = document.getElementById(
      "full-name"
    ) as HTMLInputElement;
    const userNameError = document.getElementById(
      "username-error"
    ) as HTMLParagraphElement;
    const mobileNumberInput = document.getElementById(
      "mobile-number"
    ) as HTMLInputElement;
    const mobileNumberError = document.getElementById(
      "mobile-error"
    ) as HTMLParagraphElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const emailError = document.getElementById(
      "email-error"
    ) as HTMLParagraphElement;
    const dobInput = document.getElementById("dob") as HTMLInputElement;
    const dobError = document.getElementById(
      "dob-error"
    ) as HTMLParagraphElement;
    const genderError = document.getElementById(
      "gender-error"
    ) as HTMLParagraphElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const passwordError = document.getElementById(
      "password-error"
    ) as HTMLParagraphElement;
    const confirmPasswordInput = document.getElementById(
      "confirm-password"
    ) as HTMLInputElement;
    const confirmPasswordError = document.getElementById(
      "confirm-password-error"
    ) as HTMLParagraphElement;

    /**
     * Clears the error messages and removes the "error-border" class from the input fields.
     *
     * This function sets the innerHTML of the error elements to an empty string and removes the "error-border" class from the input fields.
     *
     * @return {void} This function does not return anything.
     */
    const removeErrorMessages = () => {
      userNameError.innerHTML = "";
      mobileNumberError.innerHTML = "";
      emailError.innerHTML = "";
      dobError.innerHTML = "";
      genderError.innerHTML = "";
      passwordError.innerHTML = "";
      confirmPasswordError.innerHTML = "";

      userNameInput.classList.remove("error-border");
      mobileNumberInput.classList.remove("error-border");
      emailInput.classList.remove("error-border");
      dobInput.classList.remove("error-border");
      passwordInput.classList.remove("error-border");
      confirmPasswordInput.classList.remove("error-border");
    };

    /**
     * Handles the submit event for the signup form.
     */
    signupForm.addEventListener("submit", async (event: SubmitEvent) => {
      event.preventDefault();

      removeErrorMessages();

      /**
       * Convert form data to an object
       */
      const formData = new FormData(signupForm);
      const formObject: { [key: string]: FormDataEntryValue } = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      try {
        // Validate the form object with registerSchema
        await registerSchema.validate(formObject, { abortEarly: false });

        // Send OTP
        await AuthService.sendSignupOtp({
          username: formObject.fullName as string,
          email: formObject.email as string,
          dob: formObject.dob as string,
          gender: formObject.gender as string,
          password: formObject.password as string,
        });
      } catch (err) {
        /**
         * Display error messages in the form if validation fails
         */
        if (err instanceof yup.ValidationError) {
          Toast.showToast("Please fill in all the fields.");
          err.inner.forEach((error) => {
            switch (error.path) {
              case "fullName":
                userNameInput.classList.add("error-border");
                userNameError.innerHTML = error.message;
                break;
              case "mobileNumber":
                mobileNumberInput.classList.add("error-border");
                mobileNumberError.innerHTML = error.message;
                break;
              case "email":
                emailInput.classList.add("error-border");
                emailError.innerHTML = error.message;
                break;
              case "dob":
                dobInput.classList.add("error-border");
                dobError.innerHTML = error.message;
                break;
              case "gender":
                genderError.innerHTML = error.message;
                break;
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
