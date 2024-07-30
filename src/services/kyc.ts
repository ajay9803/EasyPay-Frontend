import { HOST_NAME } from "../constants/auth";
import { Toast } from "../utils/toast";

class KycService {
  static applyForKyc: (
    token: string,
    formData: { [key: string]: FormDataEntryValue }
  ) => Promise<void> = async (
    token: string,
    formObject: { [key: string]: FormDataEntryValue }
  ) => {
    try {
      console.log("The token is: ", token);
      console.log("The form-data is: ", formObject);

      const formData = new FormData();

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

  static fetchKycApplication: (token: string) => Promise<any> = async (
    token: string
  ) => {
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

  static fetchKycApplications: (status: string, token: string) => Promise<any> =
    async (status: string, token: string) => {
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

  static verifyKycApplication: (
    token: string,
    userId: string,
    isVerified: boolean
  ) => Promise<any> = async (
    token: string,
    userId: string,
    isVerified: boolean
  ) => {
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
