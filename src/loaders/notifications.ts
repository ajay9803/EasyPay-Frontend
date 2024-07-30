import { NotificationsPageActions } from "../scripts/notifications";

/**
 * Class representing a Notifications page.
 * @class
 */
export class NotifcationsPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/notifications.html");
    return response.text();
  };

  /**
   * Initializes the event listeners for the notifications page.
   *
   * @return {void} No return value.
   */
  static initEventListeners: () => void = () => {
    NotificationsPageActions.fetchNotifications();
  };
}
