import { sendMoneySchema } from "../schemas/send_money";
import * as yup from "yup";
import UserService from "../services/user";
import UserUtils from "../utils/user";
import { Toast } from "../utils/toast";
import { IUser } from "../interfaces/user";

export class SendMoneyActions {
  static submitSendMoneyForm: () => void = () => {
    const confirmSendMoneySection = document.getElementById(
      "confirm-send-money-section"
    ) as HTMLDivElement;
    const sendMoneySection = document.getElementById(
      "send-money-section"
    ) as HTMLDivElement;

    const confirmSendMoneyEmail = document.getElementById(
      "send-money-email"
    ) as HTMLParagraphElement;
    const confirmSendMoneyAmount = document.getElementById(
      "send-money-amount"
    ) as HTMLParagraphElement;
    const confirmSendMoneyUsername = document.getElementById(
      "send-money-username"
    ) as HTMLParagraphElement;
    const confirmSendMoneyPurpose = document.getElementById(
      "send-money-purpose"
    ) as HTMLParagraphElement;
    const confirmSendMoneyRemarks = document.getElementById(
      "send-money-remarks"
    ) as HTMLParagraphElement;

    const emailInputElement = document.getElementById(
      "email"
    ) as HTMLInputElement;
    const amountInputElement = document.getElementById(
      "amount"
    ) as HTMLInputElement;
    const purposeInputElement = document.getElementById(
      "purpose"
    ) as HTMLSelectElement;
    const remarksInputElement = document.getElementById(
      "remarks"
    ) as HTMLInputElement;

    const emailErrorElement = document.getElementById(
      "send-money-email-error"
    ) as HTMLParagraphElement;
    const amountErrorElement = document.getElementById(
      "send-money-amount-error"
    ) as HTMLParagraphElement;
    const purposeErrorElement = document.getElementById(
      "send-money-purpose-error"
    ) as HTMLParagraphElement;
    const remarksErrorElement = document.getElementById(
      "send-money-remarks-error"
    ) as HTMLParagraphElement;

    const sendMoneyForm = document.getElementById(
      "send-money-form"
    ) as HTMLFormElement;

    const sendMoneyClearButton = document.getElementById(
      "send-money-clear-button"
    ) as HTMLButtonElement;

    const sendMoneyButton = document.getElementById(
      "send-money-button"
    ) as HTMLButtonElement;

    sendMoneyClearButton.onclick = () => {
      sendMoneyForm.reset();
    };


    const submitSendMoneyForm = async () => {
      const email = emailInputElement.value;
      const amount = amountInputElement.value;
      const purpose = purposeInputElement.value;
      const remarks = remarksInputElement.value;

      const formData = { email, amount, purpose, remarks };
      console.log("Initial form data is: ", formData);

      try {
        const accessToken = UserUtils.getAccessToken();
        clearErrorMessages();
        await sendMoneySchema.validate(formData, { abortEarly: false });

        await UserService.fetchUserByEmail(accessToken, email)
          .then(async (data: IUser) => {
            sendMoneySection.style.display = "none";
            confirmSendMoneySection.style.display = "flex";
            confirmSendMoneyEmail.innerHTML = data.email;
            confirmSendMoneyAmount.innerHTML = amount;
            confirmSendMoneyUsername.innerHTML = UserUtils.coverUsername(data.username);

            confirmSendMoneyPurpose.innerHTML = purpose;
            confirmSendMoneyRemarks.innerHTML = remarks;

            sendMoneyButton.onclick = async () => {
              await UserService.transferBalance(accessToken, {
                receiverEmail: data.email,
                amount: +amount,
                purpose: purpose,
                remarks: remarks,
              }).then((data) => {
                Toast.showToast(data.message);
                history.back();
              }).catch((e) => {
                Toast.showToast(e.message);
              });
            };

          })
          .catch((e) => {
            Toast.showToast(e.message);
          });
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          displayErrorMessages(err);
        }
      }
    };

    const clearErrorMessages = () => {
      emailErrorElement.innerHTML = "";
      amountErrorElement.innerHTML = "";
      purposeErrorElement.innerHTML = "";
      remarksErrorElement.innerHTML = "";
      emailInputElement.classList.remove("error-border");
      amountInputElement.classList.remove("error-border");
      purposeInputElement.classList.remove("error-border");
      remarksInputElement.classList.remove("error-border");
    };

    const displayErrorMessages = (err: yup.ValidationError) => {
      err.inner.forEach((error) => {
        switch (error.path) {
          case "email":
            emailErrorElement.innerHTML = error.message;
            emailInputElement.classList.add("error-border");
            break;
          case "amount":
            amountErrorElement.innerHTML = error.message;
            amountInputElement.classList.add("error-border");
            break;
          case "purpose":
            purposeErrorElement.innerHTML = error.message;
            purposeInputElement.classList.add("error-border");
            break;
          case "remarks":
            remarksErrorElement.innerHTML = error.message;
            remarksInputElement.classList.add("error-border");
            break;
          default:
            break;
        }
      });
    };

    sendMoneyForm.addEventListener("submit", async (e: Event) => {
      e.preventDefault();
      console.log("Submit button clicked.");

      await submitSendMoneyForm();
    });


  };
}
