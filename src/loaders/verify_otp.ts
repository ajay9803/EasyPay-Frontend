import { VerifyOtpActions } from "../scripts/verify_otp";

/**
 * Class representing a verify OTP page.
 *
 * @class
 */
export class VerifyOtpPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/verify_otp.html");
    return response.text();
  };

  /**
   * Initializes the event listeners for the verify OTP page.
   *
   * @returns {void}
   */
  static initEventListeners: () => void = () => {
    VerifyOtpActions.verifyOtp();
  };
}
