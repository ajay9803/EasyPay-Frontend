import { VerifyOtpActions } from "../scripts/verify_otp";

export class VerifyOtpPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/verify_otp.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {
    VerifyOtpActions.verifyOtp();
  };
}
