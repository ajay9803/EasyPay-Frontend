import { LoadBalancePageActions } from "../scripts/load_balance";

/**
 * Class representing a LoadBalancePage.
 * @class
 */
export class LoadBalancePage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/load_balance.html");
    return response.text();
  };

  /**
   * Initializes the event listeners for the LoadBalancePage.
   *
   * @return {void} This function does not return anything.
   */
  static initEventListeners: () => void = () => {
    LoadBalancePageActions.loadLinkedAccounts();
  };
}
