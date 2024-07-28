import { HOST_NAME } from "../constants/auth";

class StatementService {
  static fetchBalanceTransferStatements: (
    token: string,
    page: number
  ) => Promise<any> = async (token: string, page: number) => {
    const url = `${HOST_NAME}/statements/balance-transfer?page=${page}&size=5`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const jsonData = await response.json();

      if (response.status === 200) {
        return jsonData;
      } else {
        throw new Error(jsonData.message);
      }
    } catch (e) {
      throw e;
    }
  };
}

export default StatementService;
