/**
 * Interface for a balance transfer statement.
 *
 * @interface IBalanceTransferStatement
 * @property {string} id - The ID of the statement.
 * @property {string} senderUserId - The ID of the sender user.
 * @property {string} receiverUserId - The ID of the receiver user.
 * @property {string} amount - The amount transferred.
 * @property {string} remarks - The remarks for the transfer.
 * @property {string} purpose - The purpose of the transfer.
 * @property {string} senderUsername - The username of the sender.
 * @property {string} receiverUsername - The username of the receiver.
 * @property {string} createdAt - The timestamp when the statement was created.
 * @property {string | null} createdBy - The ID of the user who created the statement.
 */
export interface IBalanceTransferStatement {
  id: string;
  senderUserId: string;
  receiverUserId: string;
  amount: string;
  remarks: string;
  purpose: string;
  senderUsername: string;
  receiverUsername: string;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
  cashFlow: string;
  receiverTotalBalance: number;
  senderTotalBalance: number;
}

/**
 * Interface for a load fund statement.
 *
 * @interface ILoadFundStatement
 * @property {string} bankAccountId - The ID of the bank account.
 * @property {string} createdAt - The timestamp when the statement was created.
 * @property {string | null} createdBy - The ID of the user who created the statement.
 * @property {string} id - The ID of the statement.
 * @property {string} imageUrl - The URL of the bank account image.
 * @property {string} location - The location of the bank account.
 * @property {string} name - The name of the bank account.
 * @property {string} purpose - The purpose of the load fund.
 * @property {string} remarks - The remarks for the load fund.
 * @property {string} senderUsername - The username of the sender.
 * @property {string} amount - The amount loaded.
 */
export interface ILoadFundStatement {
  amount: string;
  bankAccountId: string;
  createdAt: string;
  createdBy: string | null;
  id: string;
  imageUrl: string;
  location: string;
  name: string;
  purpose: string;
  remarks: string;
  type: string;
  updatedAt: string | null;
  updatedBy: string | null;
  userId: string;
}
