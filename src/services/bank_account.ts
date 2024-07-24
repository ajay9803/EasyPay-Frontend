import { HOST_NAME } from "../constants/auth";

class BankAccountService {
  static fetchUserBankAccounts: (token: string) => Promise<any> = async (
    token: string
  ) => {
    try {
      const response = await fetch(`${HOST_NAME}/user/bank-accounts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const jsonData = await response.json();
      if (response.status !== 200) {
        throw new Error(jsonData.message);
      }
      return jsonData.accounts;
    } catch (e: any) {
      throw e;
    }
  };
}

export default BankAccountService;