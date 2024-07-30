/**
 * Interface for a new user.
 *
 * @interface INewUser
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} dob - The date of birth of the user.
 * @property {string} gender - The gender of the user.
 * @property {string} password - The password of the user.
 */
export interface INewUser {
  username: string;
  email: string;
  dob: string;
  gender: string;
  password: string;
}

/**
 * Interface for a user.
 *
 * @interface IUser
 * @property {string} id - The unique identifier for the user.
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} balance - The current balance of the user.
 * @property {string} createdAt - The date and time when the user was created.
 * @property {string|null} updatedAt - The date and time when the user was last updated, or null if never updated.
 * @property {string} dob - The date of birth of the user.
 * @property {string} gender - The gender of the user.
 * @property {boolean} isVerified - Indicates if the user's email has been verified.
 * @property {string} roleId - The unique identifier for the user's role.
 */
export interface IUser {
  id: string;
  username: string;
  email: string;
  balance: string;
  createdAt: string;
  updatedAt: string | null;
  dob: string;
  gender: string;
  isVerified: boolean;
  roleId: string;
  permissions: string[];
}
