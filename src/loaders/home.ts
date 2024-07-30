import { HomeActions } from "../scripts/home";

/**
 * Class representing a home page.
 * @class
 */
export class HomePage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/home.html");
    return response.text();
  };

  /**
   * Initializes the event listeners for the home page.
   * This function is called when the DOMContentLoaded event is fired.
   * @function
   * @memberof HomePage
   * @returns {void}
   */
  static initEventListeners: () => void = () => {
    HomeActions.getUpdatedUserDetails();
    HomeActions.refreshIconEventlisteners();
    HomeActions.updateHomeView();
    HomeActions.toggleViewAmount();
    HomeActions.getQuickTransactions();
    HomeActions.getRecentTransactions();
  };
}
