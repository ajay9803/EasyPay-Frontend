/**
 * Interface for bank account objects.
 *
 * @interface IBankAccount
 * @property {string} amount - The amount of money in the account.
 * @property {string} bankId - The ID of the mock bank associated with the account.
 * @property {string} createdAt - The date when the account was created.
 * @property {string | null} createdBy - The ID of the user who created the account, or null if not applicable.
 * @property {string} estDate - The year of establishment of the bank.
 * @property {string} id - The ID of the account.
 * @property {string} imageUrl - The URL of the mock bank.
 * @property {string} location - The location of the bank the account is associated with.
 * @property {string} name - The name of the mock bank.
 * @property {string | null} updatedAt - The date the account was last updated, or null if not applicable.
 * @property {string | null} updatedBy - The ID of the user who last updated the account, or null if not applicable.
 */
export interface IBankAccount {
  amount: string;
  bankId: string;
  createdAt: string;
  createdBy: string | null;
  estDate: string;
  id: string;
  imageUrl: string;
  location: string;
  name: string;
  updatedAt: string | null;
  updatedBy: string | null;
  userId: string;
}
