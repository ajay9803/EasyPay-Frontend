import { sendMoneySchema } from "../schemas/send_money";
import * as yup from "yup";
import UserService from "../services/user";
import UserUtils from "../utils/user";
import { Toast } from "../utils/toast";
import { IUser } from "../interfaces/user";
import { userSocket } from "./main";

/**
 * Class representing the actions for the send money page.
 *
 * @class
 */
export class SendMoneyActions {
  /**
   * Submits the send money form.
   *
   * @return {void}
   */
  static submitSendMoneyForm: () => void = (): void => {
    /**
     * Define elements of the send money page
     */
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

    /**
     * Clear the send money form when the clear button is clicked.
     *
     * @returns {void}
     */
    sendMoneyClearButton.onclick = (): void => {
      sendMoneyForm.reset();
    };

    /**
     * Submit the send money form asynchronously.
     *
     * @returns {Promise<void>} A promise that resolves when the form is submitted.
     */
    const submitSendMoneyForm = async (): Promise<void> => {
      const email = emailInputElement.value;
      const amount = amountInputElement.value;
      const purpose = purposeInputElement.value;
      const remarks = remarksInputElement.value;

      const formData = { email, amount, purpose, remarks };

      try {
        const accessToken = UserUtils.getAccessToken();
        /**
         * Clear the error messages.
         */
        clearErrorMessages();

        /**
         * Validate the send money form using yup schema
         *
         * @param {Object} formData - The form data to be validated
         * @param {Object} options - The options for validation
         * @return {Promise<void>} - A promise that resolves when validation is successful
         * @throws {yup.ValidationError} - Throws an error if validation fails
         */
        await sendMoneySchema.validate(formData, { abortEarly: false });

        /**
         * Fetch user by email
         */
        await UserService.fetchUserByEmail(accessToken, email)
          .then(async (fetchedUser: IUser) => {
            /**
             * Display fetched user details.
             * Display confirm send money section.
             */
            sendMoneySection.style.display = "none";
            confirmSendMoneySection.style.display = "flex";
            confirmSendMoneyEmail.innerHTML = fetchedUser.email;
            confirmSendMoneyAmount.innerHTML = amount;
            confirmSendMoneyUsername.innerHTML = UserUtils.coverUsername(
              fetchedUser.username
            );

            confirmSendMoneyPurpose.innerHTML = purpose;
            confirmSendMoneyRemarks.innerHTML = remarks;

            /**
             * Handles the click event of the sendMoneyButton.
             *
             * @return {Promise<void>} A promise that resolves when the function is complete.
             */
            sendMoneyButton.onclick = async (): Promise<void> => {
              await UserService.transferBalance(accessToken, {
                receiverEmail: fetchedUser.email,
                amount: +amount,
                purpose: purpose,
                remarks: remarks,
              })
                .then((data) => {
                  Toast.showToast(data.message);

                  const user = UserUtils.getUserDetails();
                  userSocket.emit("balance-transfer", {
                    userId: fetchedUser.id,
                    amount: amount,
                    message: `${
                      user!.username
                    } has transferred Rs.${amount} to you.`,
                  });
                  history.back();
                })
                .catch((e) => {
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

    /**
     * Clears the error messages and removes the error border from the input elements.
     *
     * @return {void} This function does not return anything.
     */
    const clearErrorMessages = (): void => {
      emailErrorElement.innerHTML = "";
      amountErrorElement.innerHTML = "";
      purposeErrorElement.innerHTML = "";
      remarksErrorElement.innerHTML = "";
      emailInputElement.classList.remove("error-border");
      amountInputElement.classList.remove("error-border");
      purposeInputElement.classList.remove("error-border");
      remarksInputElement.classList.remove("error-border");
    };

    /**
     * Display error messages in the input elements.
     * Add error border to the input fields.
     */
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

      await submitSendMoneyForm();
    });
  };
}
