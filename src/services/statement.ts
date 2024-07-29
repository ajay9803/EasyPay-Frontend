import { HOST_NAME } from "../constants/auth";

class StatementService {
  static fetchBalanceTransferStatements: (
    token: string,
    page: number,
    size: number,
    cashFLow: string,
    startDate: string,
    endDate: string
  ) => Promise<any> = async (
    token: string,
    page: number,
    size: number,
    cashFLow: string,
    startDate: string,
    endDate: string
  ) => {
    function getEndOfDayTimestamp(endDate: string) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      return endOfDay.getTime();
    }

    const startDateTime = new Date(startDate).getTime();
    const endDateTime = getEndOfDayTimestamp(endDate);

    console.log("The date times are: ", startDateTime, endDateTime);

    const url = `${HOST_NAME}/statements/balance-transfer?page=${page}&size=${size}&cashFlow=${cashFLow}&startDate=${startDateTime}&endDate=${endDateTime}`;

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
