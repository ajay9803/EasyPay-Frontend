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
