import { UserProfileActions } from "../scripts/user_profile";

/**
 * Class representing a UserProfilePage.
 * @class
 */
export class UserProfilePage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/user_profile.html");
    return response.text();
  };

  /**
   * Initializes the event listeners for the UserProfilePage.
   *
   * @return {void} This function does not return anything.
   */
  static initEventListeners: () => void = () => {
    UserProfileActions.fetchUserProfile();
    UserProfileActions.fetchUserKycDetails();
    UserProfileActions.updateEmailAddress();
    UserProfileActions.listenForButtonEvents();
  };
}
