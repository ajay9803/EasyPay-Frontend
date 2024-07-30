import { IKycApplication } from "../interfaces/kyc";
import AuthService from "../services/auth";
import KycService from "../services/kyc";
import UserService from "../services/user";
import DateUtils from "../utils/date";
import Navigator from "../utils/navigate";
import { Toast } from "../utils/toast";
import UserUtils from "../utils/user";

export class UserProfileActions {
  static fetchUserProfile: () => Promise<void> = async () => {
    const user = UserUtils.getUserDetails();

    const username = document.getElementById(
      "user-profile-username"
    ) as HTMLHeadingElement;
    username.textContent = user.username;

    const joinedAt = document.getElementById(
      "user-profile-joined-at"
    ) as HTMLParagraphElement;
    joinedAt.textContent = DateUtils.formatDate(user.createdAt);

    const profileBalance = document.getElementById(
      "user-profile-balance"
    ) as HTMLParagraphElement;
    profileBalance.textContent = `Rs. ${user.balance}`;

    const currentEmail = document.getElementById(
      "current-email"
    ) as HTMLParagraphElement;
    currentEmail.textContent = user.email;
  };
  static fetchUserKycDetails: () => Promise<void> = async () => {
    const user = UserUtils.getUserDetails();

    if (user.isVerified) {
      const accessToken = UserUtils.getAccessToken();

      const kycDetails = document.getElementById(
        "kyc-details"
      ) as HTMLDivElement;

      kycDetails.style.display = "none";
      await KycService.fetchKycApplication(accessToken)
        .then((application: IKycApplication) => {
          console.log(application);
          kycDetails.style.display = "flex";

          const kycDob = document.getElementById(
            "kyc-dob"
          ) as HTMLParagraphElement;
          kycDob.textContent = DateUtils.formatYearMonthDate(user.dob);

          const kycGender = document.getElementById(
            "kyc-gender"
          ) as HTMLParagraphElement;
          kycGender.textContent = user.gender;

          const kycCn = document.getElementById(
            "kyc-cn"
          ) as HTMLParagraphElement;
          kycCn.textContent = application.citizenshipNumber;

          const kycCid = document.getElementById(
            "kyc-cid"
          ) as HTMLParagraphElement;
          kycCid.textContent = DateUtils.formatYearMonthDate(
            application.citizenshipIssueDate
          );

          const kycImages = document.getElementById(
            "kyc-images"
          ) as HTMLDivElement;

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
          console.log(e);
        });
    }
  };

  static updateEmailAddress: () => Promise<void> = async () => {
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

      if (emailValue === user.email) {
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

    confirmEmailButton.onclick = async () => {
      if (otpInput.value.length <= 0) {
        Toast.showToast("Please enter the otp sent to this email address.");
      } else {
        await UserService.confirmUpdateEmailOtp(
          user.id,
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

  static listenForButtonEvents: () => void = () => {
    const resetPasswordButton = document.getElementById(
      "reset-password-button"
    ) as HTMLButtonElement;

    const loadBalanceButton = document.getElementById(
      "load-balance-button"
    ) as HTMLButtonElement;

    loadBalanceButton.onclick = () => {
      Navigator.navigateTo("/#/load-balance");
    };

    resetPasswordButton.onclick = () => {
      Navigator.navigateTo("/#/reset-password");
    };
  };
}
