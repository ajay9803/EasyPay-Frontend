import { IUser } from "../interfaces/user";

/**
 * The UserUtils class provides utility functions for handling user related operations.
 *
 * @class
 */
class UserUtils {
  /**
   * Retrieves the access token from the local storage.
   * Return empty string if the access token is not found.
   *
   * @return {string} The access token stored in the local storage.
   */
  static getAccessToken = (): string => {
    const accessToken = localStorage.getItem("access-token");
    if (accessToken) {
      return accessToken;
    }
    return "";
  };

  /**
   * Retrieves the user details from the local storage.
   * Returns null if the user details are not found.
   *
   * @return {IUser | null} The user details stored in the local storage, or null if not found.
   */
  static getUserDetails = (): IUser | null => {
    let userDataStringified = localStorage.getItem("user");
    let userData: any;

    if (userDataStringified) {
      userData = JSON.parse(userDataStringified);
      return userData;
    }
    return null;
  };

  /**
   * Cover the username with asterisks, except for the first letter of each word.
   *
   * @param {string} username - The username to be covered.
   * @return {string} The username with asterisks, except for the first letter of each word.
   */
  static coverUsername = (username: string): string => {
    const usernameArray = username.split(" ");

    if (usernameArray.length !== 0) {
      // Split the first word of the usernameArray
      const firstWord = usernameArray[0].split("");

      // Hash each letter of first word except the first letter.
      // Replace the letters with asterisks.
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
