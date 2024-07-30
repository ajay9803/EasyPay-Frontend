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

  static sendUpdateEmailOtp: (token: string, email: string) => Promise<any> =
    async (token: string, email: string) => {
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
  ) => {
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
  ) => {
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
  ) => {
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
