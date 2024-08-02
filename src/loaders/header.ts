import { HeaderActions } from "../scripts/header";

/**
 * Class representing the header component of the application.
 * @class
 */
export class Header {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/components/header.html");
    return response.text();
  };

  /**
   * Initializes the event listeners for the header component.
   *
   * @return {void}
   */
  static initEventListeners: () => void = () => {
    HeaderActions.toggleSwitch();
    HeaderActions.getLoggedInState();
    HeaderActions.logoutUser();
    HeaderActions.userProfile();
    HeaderActions.notificationsButtonListeners();
    HeaderActions.menuListener();
  };
}
