import { HOST_NAME } from "../constants/auth";
import { INewUser, IUser } from "../interfaces/user";
import { Router } from "../router";
import { Toast } from "../utils/toast";

/**
 * Service class for interacting with the authentication API.
 */
class AuthService {
  /**
   * Authenticates the user with the provided email and password.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @return {Promise<any>} A promise that resolves to the response data upon successful authentication,
   * or rejects with an error message.
   */
  static login: (email: string, password: string) => Promise<any> = async (
    email: string,
    password: string
  ): Promise<any> => {
    const url = `${HOST_NAME}/auth/login`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const jsonData = await response.json();
      console.log(jsonData);

      if (response.status !== 200) {
        throw new Error(jsonData.message);
      } else {
        return jsonData;
      }
    } catch (e: any) {
      throw e;
    }
  };

  /**
   * Registers a new user with the provided user details and OTP.
   *
   * @param {INewUser} user - The details of the new user.
   * @param {string} otp - The OTP received via email.
   * @return {Promise<void>} A promise that resolves when registration is successful,
   * or rejects with an error message.
   */
  static register: (user: INewUser, otp: string) => Promise<void> = async (
    user: INewUser,
    otp: string
  ): Promise<void> => {
    const url = `${HOST_NAME}/users`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
          dob: user.dob,
          gender: user.gender,
          otp: otp,
        }),
      });

      const jsonData = await response.json();

      if (response.status !== 201) {
        throw new Error(jsonData.message);
      } else {
        Toast.showToast(jsonData.message);

        // Redirect to login page
        history.pushState(null, "", "/#/login");
        Router.handleRouteChange();

        // Remove new user data from local storage
        localStorage.removeItem("new-user-data");
      }
    } catch (e: any) {
      Toast.showToast(e.message);
    }
  };

  /**
   * Sends a signup OTP to the user's email address.
   *
   * @param {INewUser} user - The user object containing user details.
   * @return {Promise<void>} A promise that resolves when the OTP is sent successfully,
   * or rejects with an error message.
   */
  static sendSignupOtp: (user: INewUser) => Promise<void> = async (
    user: INewUser
  ): Promise<void> => {
    const url = `${HOST_NAME}/auth/sign-up-otp`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
        }),
      });

      const jsonData = await response.json();

      if (response.status !== 200) {
        throw new Error(jsonData.message);
      } else {
        Toast.showToast(jsonData.message);
        localStorage.setItem("new-user-data", JSON.stringify(user));
        history.pushState(null, "", "/#/verify-otp");
        Router.handleRouteChange();
      }
    } catch (e: any) {
      Toast.showToast(e.message);
    }
  };

  /**
   * Sends a resend signup OTP to the user's email address.
   *
   * @param {string} email - The email address of the user.
   * @return {Promise<void>} A promise that resolves when the OTP is sent successfully,
   * or rejects with an error message.
   */
  static resendSignupOtp: (email: string) => Promise<void> = async (
    email: string
  ): Promise<void> => {
    const url = `${HOST_NAME}/auth/sign-up-otp`;
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

      if (response.status !== 200) {
        throw new Error(jsonData.message);
      } else {
        Toast.showToast(jsonData.message);
      }
    } catch (e: any) {
      Toast.showToast(e.message);
    }
  };

  /**
   * Fetches user details from the API.
   *
   * @param {string} token - The authentication token.
   * @return {Promise<IUser>} A promise that resolves with the user details,
   * or rejects with an error message.
   */
  static fetchUser: (token: string) => Promise<IUser> = async (
    token: string
  ) => {
    const url = `${HOST_NAME}/users`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const jsonData = await response.json();

      if (response.status !== 200) {
        throw new Error(jsonData.message);
      } else {
        return jsonData.user;
      }
    } catch (e: any) {
      Toast.showToast(e.message);
    }
  };
}

export default AuthService;
