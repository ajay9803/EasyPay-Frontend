import { RegisterActions } from "../scripts/register";

/**
 * Class representing a register page.
 * @class
 */
export class RegisterPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/register.html");
    return response.text();
  };

  /**
   * Initializes the event listeners for the register page.
   * 
   * @returns {void}
   */
  static initEventListeners: () => void = () => {
    RegisterActions.register();
    RegisterActions.togglePasswordView();
  };
}
