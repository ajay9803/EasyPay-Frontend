import { HOST_NAME } from "../constants/auth";
import { INotification } from "../interfaces/notification";

/**
 * Class representing the Notification Service.
 * @class
 */
class NotificationService {
  /**
   * Fetches the notifications from the server for the given user.
   *
   * @param {string} token - The authentication token.
   * @param {number} page - The page number of the notifications to fetch.
   * @param {number} size - The number of notifications to fetch per page.
   * @return {Promise<{notifications: INotification[]; totalCount: number}>}
   *     A promise that resolves to an object containing the fetched notifications
   *     and the total count of notifications.
   */
  static fetchNotifications: (
    token: string,
    page: number,
    size: number
  ) => Promise<{
    notifications: INotification[];
    totalCount: number;
  }> = async (
    token: string,
    page: number,
    size: number
  ): Promise<{ notifications: INotification[]; totalCount: number }> => {
    const url = `${HOST_NAME}/user/notifications?page=${page}&size=${size}`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const jsonData = await response.json();

      if (response.status === 200) {
        return jsonData;
      } else {
        throw new Error(jsonData.message);
      }
    } catch (e) {
      throw e;
    }
  };
}

export default NotificationService;
