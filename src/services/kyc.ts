import { HOST_NAME } from "../constants/auth";
import { Toast } from "../utils/toast";

/**
 * The KycService class provides methods for interacting with the KYC API.
 */
class KycService {
  /**
   * Applies for KYC.
   *
   * @async
   * @function applyForKyc
   * @memberof KycService
   * @param {string} token - The authentication token.
   * @param {Object.<string, FormDataEntryValue>} formObject - The form data
   * containing the applicant's details.
   * @return {Promise<void>} A promise that resolves when the KYC application
   * is successfully submitted.
   */
  static applyForKyc: (
    token: string,
    formData: { [key: string]: FormDataEntryValue }
  ) => Promise<void> = async (
    token: string,
    formObject: { [key: string]: FormDataEntryValue }
  ): Promise<void> => {
    try {
      // Construct the form data
      const formData = new FormData();

      // Add the form data to the form
      formData.append("citizenshipNumber", formObject.citizenshipNumber);
      formData.append("citizenshipIssueDate", formObject.issueDate);
      formData.append("userPhoto", formObject.userImage);
      formData.append("citizenshipPhoto", formObject.citizenshipImage);
      formData.append("status", "Pending");

      const response = await fetch(`${HOST_NAME}/kyc/apply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const jsonData = await response.json();

      if (response.status === 200) {
        Toast.showToast(jsonData.message);
      } else {
        throw new Error(jsonData.message);
      }
    } catch (e: any) {
      Toast.showToast(e.message);
    }
  };

  /**
   * Fetches the KYC application associated with the given access token.
   *
   * @param {string} token - The access token of the user.
   * @return {Promise<any>} A promise that resolves to the KYC application data.
   */
  static fetchKycApplication: (token: string) => Promise<any> = async (
    token: string
  ): Promise<any> => {
    const url = `${HOST_NAME}/kyc/application`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const jsonData = await response.json();

      if (response.status === 200) {
        return jsonData.application;
      } else {
        throw new Error(jsonData.message);
      }
    } catch (e) {
      throw e;
    }
  };

  /**
   * Fetches all the kyc applications.
   *
   * @param {string} token - The access token of the user.
   * @return {Promise<any>} A promise that resolves to the KYC application data.
   */
  static fetchKycApplications: (status: string, token: string) => Promise<any> =
    async (status: string, token: string): Promise<any> => {
      const url = `${HOST_NAME}/kyc/applications?page=1&size=5&status=${status}`;
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

  /**
   * Verify the KYC application.
   *
   * @param {string} token - The access token of the user.
   * @param {string} userId - The user ID of the user.
   * @param {boolean} isVerified - The verification status of the KYC application.
   * @return {Promise<any>} A promise that resolves to the verification result.
   */
  static verifyKycApplication: (
    token: string,
    userId: string,
    isVerified: boolean
  ) => Promise<any> = async (
    token: string,
    userId: string,
    isVerified: boolean
  ): Promise<any> => {
    const url = `${HOST_NAME}/kyc/verify`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isVerified: isVerified,
          userId: userId,
        }),
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

export default KycService;
