import { SetNewPasswordActions } from "../scripts/set_new_password";

/**
 * Represents the Set New Password page.
 * @class
 */
export class SetNewPasswordPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/set_new_password.html");
    return response.text();
  };

  /**
   * Initializes the event listeners for the Set New Password page.
   * @function
   * @returns {void}
   */
  static initEventListeners: () => void = () => {
    SetNewPasswordActions.resetPassword();
  };
}
