import { HOST_NAME } from "../constants/auth";
import { IBankAccount } from "../interfaces/bank_account";

/**
 * Class representing the bank account service.
 * @class
 */
class BankAccountService {
  /**
   * Fetches the bank accounts associated with the user.
   * @param {string} token - The authentication token.
   * @returns {Promise<IBankAccount[]>} A promise that resolves to an array of bank accounts.
   */
  static fetchUserBankAccounts: (token: string) => Promise<IBankAccount[]> =
    async (token: string): Promise<IBankAccount[]> => {
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
