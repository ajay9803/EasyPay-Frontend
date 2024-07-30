/**
 * Interface for balance transfer.
 *
 * @interface IBalanceTransfer
 * @property {string} receiverEmail - The email address of the receiver.
 * @property {number} amount - The amount to be transferred.
 * @property {string} purpose - The purpose of the transfer.
 * @property {string} remarks - The remarks for the transfer.
 */
export interface IBalanceTransfer {
  receiverEmail: string;
  amount: number;
  purpose: string;
  remarks: string;
}
