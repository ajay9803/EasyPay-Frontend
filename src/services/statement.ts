import { HOST_NAME } from "../constants/auth";

/**
 * The StatementService class provides methods for fetching balance transfer statements.
 */
class StatementService {
  /**
   * Fetches balance transfer statements based on given parameters.
   *
   * @param {string} token - The user's access token.
   * @param {number} page - The page number of the results.
   * @param {number} size - The number of results per page.
   * @param {string} cashFlow - The type of cash flow (debit or credit).
   * @param {string} startDate - The start date for the statements.
   * @param {string} endDate - The end date for the statements.
   * @return {Promise<any>} A promise that resolves to the fetched statements.
   */
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
  ): Promise<any> => {
    /**
     * Returns the timestamp representing the end of the day for the given end date.
     *
     * @param {string} endDate - The end date in string format.
     * @return {number} The timestamp representing the end of the day.
     */
    const getEndOfDayTimestamp: (endDate: string) => void = (
      endDate: string
    ) => {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      return endOfDay.getTime();
    };

    // Convert the start and end dates to timestamps
    const startDateTime = new Date(startDate).getTime();
    const endDateTime = getEndOfDayTimestamp(endDate);

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
