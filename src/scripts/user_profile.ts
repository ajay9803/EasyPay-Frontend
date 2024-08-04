import { LOAD_BALANCE_PATH, RESET_PASSWORD_PATH } from "../constants/routes";
import { IKycApplication } from "../interfaces/kyc";
import { IUser } from "../interfaces/user";
import AuthService from "../services/auth";
import KycService from "../services/kyc";
import UserService from "../services/user";
import DateUtils from "../utils/date";
import Navigator from "../utils/navigate";
import { Toast } from "../utils/toast";
import UserUtils from "../utils/user";

/**
 * Class representing the actions for the user profile page.
 * @class
 */
export class UserProfileActions {
  static fetchUserProfile: () => Promise<void> = async () => {
    const user = UserUtils.getUserDetails();

    const username = document.getElementById(
      "user-profile-username"
    ) as HTMLHeadingElement;
    username.textContent = user!.username;

    const joinedAt = document.getElementById(
      "user-profile-joined-at"
    ) as HTMLParagraphElement;
    joinedAt.textContent = DateUtils.formatDate(user!.createdAt);

    const profileBalance = document.getElementById(
      "user-profile-balance"
    ) as HTMLParagraphElement;
    profileBalance.textContent = `Rs. ${user!.balance}`;

    const currentEmail = document.getElementById(
      "current-email"
    ) as HTMLParagraphElement;
    currentEmail.textContent = user!.email;

    const easyPayPoints = document.getElementById(
      "easy-pay-points"
    ) as HTMLParagraphElement;
    easyPayPoints.textContent = user!.easyPayPoints;
  };

  /**
   * Fetches the KYC details of the user and updates the UI accordingly.
   *
   * @return {Promise<void>} - A promise that resolves when the KYC details are fetched and updated.
   */
  static fetchUserKycDetails: () => Promise<void> = async (): Promise<void> => {
    const kycDetails = document.getElementById("kyc-details") as HTMLDivElement;
    const user = UserUtils.getUserDetails();

    if (!user!.isVerified) {
      kycDetails.style.display = "none";
    }
    if (user!.isVerified) {
      const accessToken = UserUtils.getAccessToken();

      await KycService.fetchKycApplication(accessToken)
        .then((application: IKycApplication) => {
          const kycImages = document.getElementById(
            "kyc-images"
          ) as HTMLDivElement;
          kycImages.innerHTML = "";
          if (application.status !== "Verified") {
            Toast.showToast("Your KYC application is not verified yet.");
            return;
          }

          kycDetails.style.display = "flex";

          const kycDob = document.getElementById(
            "kyc-dob"
          ) as HTMLParagraphElement;
          kycDob.textContent = DateUtils.formatToYYYYMMDD(user!.dob);

          const kycGender = document.getElementById(
            "kyc-gender"
          ) as HTMLParagraphElement;
          kycGender.textContent = user!.gender;

          const kycCn = document.getElementById(
            "kyc-cn"
          ) as HTMLParagraphElement;
          kycCn.textContent = application.citizenshipNumber;

          const kycCid = document.getElementById(
            "kyc-cid"
          ) as HTMLParagraphElement;
          kycCid.textContent = DateUtils.formatToYYYYMMDD(
            application.citizenshipIssueDate
          );

          const userImage = document.createElement("img") as HTMLImageElement;
          userImage.src = application.userPhotoUrl;
          userImage.alt = "kyc-user";
          userImage.classList.add("user-profile-image");
          kycImages.append(userImage);

          const citizenshipImage = document.createElement(
            "img"
          ) as HTMLImageElement;
          citizenshipImage.src = application.citizenshipPhotoUrl;
          citizenshipImage.alt = "kyc-citizenship";
          citizenshipImage.classList.add("user-profile-image");
          kycImages.append(citizenshipImage);
        })
        .catch((e) => {
          kycDetails.style.display = "flex";
          kycDetails.textContent = e.message;
        });
    }
  };

  /**
   * Updates the email address of the user.
   *
   * @return {Promise<void>} A promise that resolves when the email address is updated successfully.
   */
  static updateEmailAddress: () => Promise<void> = async (): Promise<void> => {
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const otpInput = document.getElementById("otp") as HTMLInputElement;

    const user = UserUtils.getUserDetails();
    const accessToken = UserUtils.getAccessToken();

    const emailButton = document.getElementById(
      "update-email-button"
    ) as HTMLButtonElement;

    const otpDiv = document.getElementById("otp-div") as HTMLDivElement;
    const confirmEmailButton = document.getElementById(
      "confirm-email-button"
    ) as HTMLButtonElement;

    const currentEmail = document.getElementById(
      "current-email"
    ) as HTMLParagraphElement;

    emailButton.onclick = async () => {
      const emailValue = emailInput.value;
      otpDiv.style.display = "none";
      otpInput.value = "";

      if (emailValue === user!.email) {
        Toast.showToast("Please enter a new email address.");
      } else if (emailValue.length <= 0) {
        Toast.showToast("Please enter a valid email address.");
      } else {
        await UserService.sendUpdateEmailOtp(accessToken, emailInput.value)
          .then((data) => {
            Toast.showToast(data.message);
            otpDiv.style.display = "flex";
          })
          .catch((e) => {
            Toast.showToast(e.message);
          });
      }
    };

    /**
     * Handles the click event for the confirm email button.
     * If the OTP input is empty, shows a toast message asking the user to enter the OTP.
     * Otherwise, calls the UserService.confirmUpdateEmailOtp method with the user ID, access token,
     * new email, and OTP. On success, updates the current email, clears the OTP input,
     * hides the OTP div, and fetches the updated user information. On failure, shows a toast message with the error.
     *
     * @return {Promise<void>} A Promise that resolves when the function completes.
     */
    confirmEmailButton.onclick = async (): Promise<void> => {
      if (otpInput.value.length <= 0) {
        Toast.showToast("Please enter the otp sent to this email address.");
      } else {
        await UserService.confirmUpdateEmailOtp(
          user!.id,
          accessToken,
          emailInput.value,
          otpInput.value
        )
          .then(async (data) => {
            Toast.showToast(data.message);
            currentEmail.textContent = emailInput.value;
            emailInput.value = "";
            otpInput.value = "";
            otpDiv.style.display = "none";
            await AuthService.fetchUser(accessToken);
          })
          .catch((e) => {
            Toast.showToast(e.message);
          });
      }
    };
  };

  /**
   * Listens for button events.
   *
   * @return {void} No return value
   */
  static listenForButtonEvents: () => void = (): void => {
    const resetPasswordButton = document.getElementById(
      "reset-password-button"
    ) as HTMLButtonElement;

    const loadBalanceButton = document.getElementById(
      "load-balance-button"
    ) as HTMLButtonElement;

    /**
     * Handles the click event of the load balance button.
     *
     * @return {void} This function does not return anything.
     */
    loadBalanceButton.onclick = (): void => {
      Navigator.navigateTo(`/${LOAD_BALANCE_PATH}`);
    };

    /**
     * Handles the click event of the reset password button.
     *
     * @return {void} This function does not return anything.
     */
    resetPasswordButton.onclick = (): void => {
      Navigator.navigateTo(`/${RESET_PASSWORD_PATH}`);
    };

    const redeemPointsButton = document.getElementById(
      "redeem-points-button"
    ) as HTMLButtonElement;

    redeemPointsButton.onclick = async (): Promise<void> => {
      const accessToken = UserUtils.getAccessToken();
      await UserService.redeeemEasyPayPoints(accessToken)
        .then(async (data) => {
          Toast.showToast(data.message);
          const user: IUser = await AuthService.fetchUser(accessToken);

          if (user) {
            localStorage.setItem("user", JSON.stringify(user));

            const profileBalance = document.getElementById(
              "user-profile-balance"
            ) as HTMLParagraphElement;
            profileBalance.textContent = `Rs. ${user!.balance}`;

            const easyPayPoints = document.getElementById(
              "easy-pay-points"
            ) as HTMLParagraphElement;
            easyPayPoints.textContent = user!.easyPayPoints;
          }
        })
        .catch((e) => {
          Toast.showToast(e.message);
        });
    };
  };
}
