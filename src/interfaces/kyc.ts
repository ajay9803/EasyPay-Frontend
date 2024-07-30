/**
 * Represents a KYC application.
 * @interface IKycApplication
 * @property {string} citizenshipIssueDate - The date of issue of the citizen's card.
 * @property {string} citizenshipNumber - The number of the citizen's card.
 * @property {string} citizenshipPhotoUrl - The URL of the citizen's card photo.
 * @property {string} createdAt - The date when the application was created.
 * @property {string|null} createdBy - The user ID of the creator.
 * @property {string} id - The unique ID of the application.
 * @property {string} status - The status of the application.
 * @property {string|null} updatedAt - The date when the application was updated.
 * @property {string|null} updatedBy - The user ID of the updater.
 * @property {string} userId - The user ID of the user updating the data.
 * @property {string} userPhotoUrl - The URL of the user photo.
 */
export interface IKycApplication {
  citizenshipIssueDate: string;
  citizenshipNumber: string;
  citizenshipPhotoUrl: string;
  createdAt: string;
  createdBy: string | null;
  id: string;
  status: string;
  updatedAt: string | null;
  updatedBy: string | null;
  userId: string;
  userPhotoUrl: string;
}
