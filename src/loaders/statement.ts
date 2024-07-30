import { StatementsActions } from "../scripts/statements";

/**
 * Class representing a StatementsPage.
 * @class
 */
export class StatementsPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/statements.html");
    return response.text();
  };

  /**
   * Initializes the event listeners for the StatementsPage.
   *
   * @return {void} This function does not return anything.
   */
  static initEventListeners: () => void = () => {
    StatementsActions.fetchStatements();
    StatementsActions.downloadPdfEventListener();
  };
}
