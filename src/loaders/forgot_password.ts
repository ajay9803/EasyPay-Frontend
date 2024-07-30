import { ForgotPasswordActions } from "../scripts/forgot_password";

/**
 * Class representing a forgot password page.
 *
 * @class
 */
export class ForgotPasswordPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/forgot_password.html");
    return response.text();
  };


  /**
   * Initializes the event listeners for the forgot password page.
   *
   * @return {void} This function does not return anything.
   */
  static initEventListeners: () => void = () => {
    ForgotPasswordActions.sendForgotPasswordLink();
  };
}
