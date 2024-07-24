import * as yup from "yup";
import { Toast } from "../utils/toast";
import { registerSchema } from "../schemas/register";
import AuthService from "../services/auth";

export class RegisterActions {
  static register: () => void = () => {
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

    signupForm.addEventListener("submit", async (event: SubmitEvent) => {
      event.preventDefault();

      removeErrorMessages();

      const formData = new FormData(signupForm);
      const formObject: { [key: string]: FormDataEntryValue } = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      try {
        await registerSchema.validate(formObject, { abortEarly: false });

        await AuthService.sendSignupOtp({
          userName: formObject.fullName as string,
          email: formObject.email as string,
          dob: formObject.dob as string,
          gender: formObject.gender as string,
          password: formObject.password as string,
        });
      } catch (err) {
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
