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
      emailErrorMessageElement.innerHTML = '';
      passwordErrorMessageElement.innerHTML = '';
    }

    emailInput.oninput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const value = target.value;
      if (value.length <= 0) {
        emailInput.classList.add("error-border");
        emailErrorMessageElement.innerHTML = "Email is empty.";
        isFormValid = false;
      } else {
        emailInput.classList.remove("error-border");
        emailErrorMessageElement.innerHTML = "";
      }
    };

    passwordInput.oninput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const value = target.value;

      if (value.length === 0) {
        passwordInput.classList.add("error-border");
        passwordErrorMessageElement.innerHTML = "Password is empty";
        isFormValid = false;
      } else if (value.length < 8) {
        passwordErrorMessageElement.innerHTML =
          "Password must be at least 8 characters.";
        passwordInput.classList.add("error-border");
      } else {
        passwordInput.classList.remove("error-border");
        passwordErrorMessageElement.innerHTML = "";
      }
    };

    const login: () => void = () => {
      console.log("Login successful.");
    };

    const validateForm: () => boolean = () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      emailInput.classList.remove("border-red-500");
      passwordInput.classList.remove("border-red-500");

      if (email.length <= 0 && password.length === 0) {
        emailInput.classList.add("error-border");
        passwordInput.classList.add("error-border");
        emailErrorMessageElement.innerHTML = "Email is empty.";
        passwordErrorMessageElement.innerHTML = "Password is empty.";
        isFormValid = false;
        errorMessage = "Please fill in the fields to continue.";
      } else if (email.length <= 0) {
        emailInput.classList.add("error-border");
        emailErrorMessageElement.innerHTML = "Email is empty.";
        isFormValid = false;
        errorMessage = "Please fill in the email address.";
      } else if (password.length <= 0) {
        passwordInput.classList.add("error-border");
        passwordErrorMessageElement.innerHTML = "Password is empty.";
        isFormValid = false;
        errorMessage = "Please fill in the password.";
      } else if (password.length < 8) {
        passwordInput.classList.add("error-border");
        passwordErrorMessageElement.innerHTML = "Password must be at least 8 characters.";
        isFormValid = false;
        errorMessage = "Password must be at least 8 characters long.";
      } else {
        isFormValid = true;
        removeErrorMessages();
      }

      if (!isFormValid) {
        const app = document.getElementById("app") as HTMLDivElement;

        const messageElement = document.createElement("div");
        messageElement.classList.add("toast");
        messageElement.innerHTML = errorMessage;

        app.appendChild(messageElement);

        setTimeout(() => {
          if (messageElement.parentElement) {
            messageElement.parentElement.removeChild(messageElement);
          }
        }, 3000);
      }

      if (isFormValid) {
        login();
      }
      return true;
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
