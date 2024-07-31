import { INewUser } from "../interfaces/user";
import AuthService from "../services/auth";

/**
 * Class representing the actions for the verify OTP page.
 *
 * @class
 */
export class VerifyOtpActions {
  /**
   * Verifies the OTP entered by the user and updates the new user details
   * in the database and local storage.
   *
   * @return {void} Does not return anything.
   */
  static verifyOtp: () => void = (): void => {
    const verifyOtpInput = document.getElementById("otp") as HTMLInputElement;

    const resendOtpText = document.getElementById(
      "resend-otp-text"
    ) as HTMLDivElement;

    /**
     * Fetch the user data stored into local storage from register page.
     */
    const newUserDataStringified = localStorage.getItem("new-user-data");
    let newUser: INewUser;

    if (newUserDataStringified) {
      newUser = JSON.parse(newUserDataStringified);
    }

    /**
     * Handles the click event for the resendOtpText element.
     * Calls the AuthService's resendSignupOtp method with the new user's email.
     *
     * @return {Promise<void>} A promise that resolves when the OTP is resent.
     */
    resendOtpText.onclick = async () => {
      await AuthService.resendSignupOtp(newUser.email);
    };

    const otpForm = document.getElementById("otp-form") as HTMLFormElement;

    otpForm.addEventListener("submit", async (e: SubmitEvent) => {
      e.preventDefault();
      await AuthService.register(newUser, verifyOtpInput.value);
    });
  };
}
