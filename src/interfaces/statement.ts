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
