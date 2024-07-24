import { LoadBalancePageActions } from "../scripts/load_balance";

export class LoadBalancePage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/load_balance.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {
    LoadBalancePageActions.loadLinkedAccounts();
  };
}
