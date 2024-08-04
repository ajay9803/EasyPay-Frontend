import { ResetPasswordAction } from "../scripts/reset_password";

/**
 * Represents the Reset Password page.
 * @class
 */
export class ResetPasswordPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/reset_password.html");
    return response.text();
  };

  /**
   * Initializes the event listeners for the Reset Password page.
   * @function
   * @returns {void}
   */
  static initEventListeners: () => void = () => {
    ResetPasswordAction.resetPassword();
    ResetPasswordAction.togglePasswordView();
  };
}
