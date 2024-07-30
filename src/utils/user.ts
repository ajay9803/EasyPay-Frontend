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

  static coverUsername: (username: string) => string = (username: string) => {
    const usernameArray = username.split(" ");

    if (usernameArray.length !== 0) {
      const firstWord = usernameArray[0].split("");

      const hashedFirstWordArray = firstWord.map((letter, index) => {
        if (index === 0) {
          return letter;
        } else {
          return "*";
        }
      });

      const hashedFirstWord = hashedFirstWordArray.join("");
      console.log(hashedFirstWord);
      const restOfUsername = usernameArray.slice(1).join(" ");

      if (firstWord.length > 0) {
        return `${hashedFirstWord} ${restOfUsername}`;
      }
    }

    return username;
  };
}

export default UserUtils;
