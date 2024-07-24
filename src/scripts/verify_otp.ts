import { INewUser } from "../interfaces/user";
import AuthService from "../services/auth";

export class VerifyOtpActions {
  static verifyOtp: () => void = () => {
    const verifyOtpInput = document.getElementById("otp") as HTMLInputElement;

    const resendOtpText = document.getElementById(
      "resend-otp-text"
    ) as HTMLDivElement;

    const newUserDataStringified = localStorage.getItem("new-user-data");
    let newUser: INewUser;

    if (newUserDataStringified) {
      newUser = JSON.parse(newUserDataStringified);
    }

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
