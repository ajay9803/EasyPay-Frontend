import { SendMoneyActions } from "../scripts/send_money";

/**
 * Represents the SendMoneyPage class.
 * This class is responsible for loading and initializing the event listeners
 * for the SendMoneyPage.
 */
export class SendMoneyPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/send_money.html");
    return response.text();
  };

  /**
   * Initializes the event listeners for the SendMoneyPage.
   * This function is responsible for binding the submitSendMoneyForm
   * function from the SendMoneyActions class to the form's submit event.
   */
  static initEventListeners: () => void = () => {
    SendMoneyActions.submitSendMoneyForm();
  };
}
