import { LOGIN_PATH } from "../constants/routes";
import { userSocket } from "../scripts/main";
import Navigator from "./navigate";

export const handleError = (e: any): any => {
  if (e.message === "Invalid token.") {
    userSocket.disconnect();
    localStorage.clear();
    Navigator.navigateTo(`/${LOGIN_PATH}`);
    return e;
  } else {
    return e;
  }
};
