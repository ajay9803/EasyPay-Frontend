import { SendMoneyActions } from "../scripts/send_money";

export class SendMoneyPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/send_money.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {
    SendMoneyActions.submitSendMoneyForm();
  };
}
