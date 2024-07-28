import { HOST_NAME } from "../constants/auth";
import { IBalanceTransfer } from "../interfaces/balance";
import { IUser } from "../interfaces/user";

class UserService {
  static fetchUserByEmail: (token: string, email: string) => Promise<IUser> =
    async (token: string, email: string) => {
      const url = `${HOST_NAME}/users/receiver?email=${email}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const jsonData = await response.json();

        if (response.status === 200) {
          return jsonData.user;
        } else {
          throw new Error(jsonData.message);
        }
      } catch (e: any) {
        throw e;
      }
    };

  static loadBalance: (
    token: string,
    bankAccountId: string,
    amount: number,
    purpose: string,
    remarks: string
  ) => Promise<any> = async (
    token: string,
    bankAccountId: string,
    amount: number,
    purpose: string,
    remarks: string
  ) => {
    const url = `${HOST_NAME}/balance/load`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bankAccountId: +bankAccountId,
          amount: amount,
          purpose: purpose,
          remarks: remarks,
        }),
      });

      const jsonData = await response.json();

      if (response.status === 200) {
        return jsonData;
      } else {
        throw new Error(jsonData.message);
      }
    } catch (e: any) {
      throw e;
    }
  };

  static transferBalance: (
    token: string,
    balanceTransfer: IBalanceTransfer
  ) => Promise<any> = async (
    token: string,
    balanceTransfer: IBalanceTransfer
  ) => {
    const url = `${HOST_NAME}/balance/transfer`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverEmail: balanceTransfer.receiverEmail,
          amount: balanceTransfer.amount,
          purpose: balanceTransfer.purpose,
          remarks: balanceTransfer.remarks,
        }),
      });

      const jsonData = await response.json();

      if (response.status === 200) {
        return jsonData;
      } else {
        throw new Error(jsonData.message);
      }
    } catch (e: any) {
      throw e;
    }
  };
}

export default UserService;
