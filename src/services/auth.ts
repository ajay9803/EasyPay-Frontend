import { HOST_NAME } from "../constants/auth";
import { INewUser, IUser } from "../interfaces/user";
import { Router } from "../router";
import { Toast } from "../utils/toast";

class AuthService {
  static login = async (email: string, password: string): Promise<any> => {
    try {
      const response = await fetch(`${HOST_NAME}/auth/login`, {
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

  static register = async (user: INewUser, otp: string): Promise<void> => {
    try {
      const response = await fetch(`${HOST_NAME}/users`, {
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
        history.pushState(null, "", "/#/login");
        Router.handleRouteChange();
        localStorage.removeItem("new-user-data");
      }
    } catch (e: any) {
      Toast.showToast(e.message);
    }
  };

  static sendSignupOtp = async (user: INewUser): Promise<void> => {
    try {
      const response = await fetch(`${HOST_NAME}/auth/sign-up-otp`, {
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

  static resendSignupOtp = async (email: string): Promise<void> => {
    try {
      const response = await fetch(`${HOST_NAME}/auth/sign-up-otp`, {
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

  static fetchUser: (token: string) => Promise<IUser> = async (
    token: string
  ) => {
    console.log("Fetch user is running.");
    try {
      const response = await fetch(`${HOST_NAME}/users`, {
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
