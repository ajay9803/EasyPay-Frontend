/**
 * Interface representing a notification.
 *
 * @interface INotification
 * @property {string} id - The unique identifier of the notification.
 * @property {string} userId - The unique identifier of the user who received the notification.
 * @property {string} message - The message of the notification.
 * @property {string} type - The type of the notification.
 * @property {string} dataId - The unique identifier of the data associated with the notification.
 * @property {string} createdAt - The timestamp when the notification was created.
 */
export interface INotification {
  id: string;
  userId: string;
  message: string;
  type: string;
  dataId: string;
  createdAt: string;
}
