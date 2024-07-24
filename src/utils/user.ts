import { IUser } from "../interfaces/user";

class UserUtils {
  static getAccessToken: () => string = () => {
    const accessToken = localStorage.getItem("access-token");
    if (accessToken) {
      return accessToken;
    }
    return "";
  };

  static getUserDetails: () => IUser = () => {
    let userDataStringified = localStorage.getItem("user");
    let userData: any;

    if (userDataStringified) {
      userData = JSON.parse(userDataStringified);
      return userData;
    }
    return null;
  };
}

export default UserUtils;
