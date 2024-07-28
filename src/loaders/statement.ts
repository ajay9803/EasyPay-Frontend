import { StatementsActions } from "../scripts/statements";

export class StatementsPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/statements.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {
    StatementsActions.fetchStatements();
  };
}
