import { HOST_NAME } from "../constants/auth";
import { IBalanceTransfer } from "../interfaces/balance";
import { IUser } from "../interfaces/user";

/**
 * Represents a service class for interacting with the user API.
 *
 * @class
 */
class UserService {
  /**
   * Fetches a user by their email address.
   *
   * @param {string} token - The authentication token.
   * @param {string} email - The email address of the user to fetch.
   * @returns {Promise<IUser>} A promise that resolves to the user object.
   */
  static fetchUserByEmail = async (
    token: string,
    email: string
  ): Promise<IUser> => {
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

  /**
   * Loads balance to a bank account.
   *
   * @param {string} token - The authentication token.
   * @param {string} bankAccountId - The ID of the bank account to load balance to.
   * @param {number} amount - The amount to load.
   * @param {string} purpose - The purpose of the load.
   * @param {string} remarks - Additional remarks.
   * @return {Promise<any>} A promise that resolves when the load balance operation is complete.
   */
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
  ): Promise<any> => {
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

  /**
   * Transfers balance between two users.
   *
   * @param {string} token - The user's authentication token.
   * @param {IBalanceTransfer} balanceTransfer - The balance transfer details.
   * @return {Promise<any>} A promise that resolves when the balance transfer is complete.
   */
  static transferBalance: (
    token: string,
    balanceTransfer: IBalanceTransfer
  ) => Promise<any> = async (
    token: string,
    balanceTransfer: IBalanceTransfer
  ): Promise<any> => {
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

  /**
   * Sends an OTP for updating the email address of a user.
   *
   * @param {string} token - The user's authentication token.
   * @param {string} email - The new email address.
   * @return {Promise<any>} A promise that resolves when the OTP is sent successfully,
   *                        or rejects with an error if the request fails.
   */
  static sendUpdateEmailOtp: (token: string, email: string) => Promise<any> =
    async (token: string, email: string): Promise<any> => {
      const url = `${HOST_NAME}/auth/update-email-otp`;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: email,
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

  /**
   * Confirms the OTP for updating the email address of a user.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} token - The user's authentication token.
   * @param {string} email - The new email address.
   * @param {string} otp - The OTP received via email.
   * @return {Promise<any>} A promise that resolves when the OTP is confirmed successfully,
   *                        or rejects with an error if the request fails.
   */
  static confirmUpdateEmailOtp: (
    userId: string,
    token: string,
    email: string,
    otp: string
  ) => Promise<any> = async (
    userId: string,
    token: string,
    email: string,
    otp: string
  ): Promise<any> => {
    const url = `${HOST_NAME}/users/email-address/${userId}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
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

  /**
   * Updates the password of a user.
   *
   * @async
   * @function updatePassword
   * @memberof UserService
   * @param {string} userId - The ID of the user.
   * @param {string} token - The authentication token.
   * @param {string} oldPassword - The user's current password.
   * @param {string} newPassword - The new password to be set.
   * @return {Promise<void>} A promise that resolves when the password is updated
   *                        or rejects with an error if the request fails.
   */
  static updatePassword: (
    userId: string,
    token: string,
    oldPassword: string,
    newPassword: string
  ) => Promise<void> = async (
    userId: string,
    token: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> => {
    const url = `${HOST_NAME}/users/password/${userId}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
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

  /**
   * Sets a new password for a user.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} token - The authentication token.
   * @param {string} newPassword - The new password.
   * @param {string} otp - The one-time password.
   * @return {Promise<void>} A promise that resolves if the password is successfully set,
   *                        or rejects with an error if the request fails.
   */
  static setNewPassword: (
    userId: string,
    token: string,
    newPassword: string,
    otp: string
  ) => Promise<void> = async (
    userId: string,
    token: string,
    newPassword: string,
    otp: string
  ): Promise<void> => {
    const url = `${HOST_NAME}/users/new-password/${userId}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: newPassword,
          otp: otp,
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

  /**
   * Sends a forgot password link to the specified email.
   *
   * @param {string} email - The email address to send the link to.
   * @return {Promise<any>} A promise that resolves to the response data
   *                        or rejects with an error if the request fails.
   */
  static sendForgotPasswordLink: (email: string) => Promise<any> = async (
    email: string
  ) => {
    const url = `${HOST_NAME}/auth/forgot-password-link`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
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

export default UserService;
