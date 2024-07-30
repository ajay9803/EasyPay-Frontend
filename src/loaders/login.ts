import { LoginActions } from "../scripts/login";

/**
 * Class representing a login page.
 *
 * @class
 */
export class LoginPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/login.html");
    return response.text();
  }

  /**
   * Initializes event listeners for the login page.
   *
   * @returns {void}
   */
  static initEventListeners: () => void = () => {
    LoginActions.login();
  };
}
