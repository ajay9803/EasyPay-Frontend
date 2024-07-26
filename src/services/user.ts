import { HOST_NAME } from "../constants/auth";

class UserService {
  static loadBalance: (
    token: string,
    bankAccountId: string,
    amount: number
  ) => Promise<void> = async (
    token: string,
    bankAccountId: string,
    amount: number
  ) => {
    const url = `${HOST_NAME}/users/load-balance`;
    console.log("The details are: ", token, bankAccountId, amount);

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
