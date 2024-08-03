import { IBankAccount } from "../interfaces/bank_account";
import { IUser } from "../interfaces/user";
import AuthService from "../services/auth";
import BankAccountService from "../services/bank_account";
import UserService from "../services/user";
import { Toast } from "../utils/toast";
import UserUtils from "../utils/user";
import { HomeActions } from "./home";

/**
 * Class representing the actions for the load balance page.
 *
 * @class
 */
export class LoadBalancePageActions {
  /**
   * Loads the linked bank accounts and displays them on the page.
   *
   * @return {void} This function does not return anything.
   */
  static loadLinkedAccounts: () => void = (): void => {
    /**
     * Displays a modal to load balance from a linked bank account.
     *
     * @param {IBankAccount} bankAccount - The bank account to load balance from.
     * @return {void} This function does not return anything.
     */
    const showLoadBalanceModal = (bankAccount: IBankAccount): void => {
      const appElement = document.getElementById("app") as HTMLDivElement;

      const blackBackgroundElement = document.createElement(
        "div"
      ) as HTMLDivElement;

      /**
       * Creates and appends a black background element to the 'app' element
       * in the DOM. This element is used to display a modal and prevent user
       * interaction with the rest of the page until the modal is dismissed.
       *
       * @return {void} This function does not return anything.
       */
      const closeModal = (): void => {
        appElement.removeChild(blackBackgroundElement);
      };

      blackBackgroundElement.onclick = () => {
        closeModal();
      };

      blackBackgroundElement.classList.add("load-fund-modal");

      const modalContainer = document.createElement("div");
      modalContainer.classList.add("load-fund-modal-container");
      modalContainer.classList.add("load-fund-modal-container");

      /**
       * Prevents user interaction with the modal container when clicked
       */
      modalContainer.onclick = (e: Event) => {
        e.stopPropagation();
      };

      const header = document.createElement("p") as HTMLParagraphElement;
      header.classList.add("load-fund-modal-header");
      header.innerHTML = "Load Fund";

      const logoContainer = document.createElement("div") as HTMLDivElement;
      logoContainer.classList.add("load-fund-logo-container");
      const logoImage = document.createElement("img");
      logoImage.src = bankAccount.imageUrl;
      logoImage.alt = "bank-logo";
      logoImage.classList.add("load-fund-logo-image");
      logoContainer.appendChild(logoImage);

      const bankName = document.createElement("p") as HTMLParagraphElement;
      bankName.classList.add("load-fund-bank-name");
      bankName.innerHTML = bankAccount.name;

      const amountSection = document.createElement("div") as HTMLDivElement;
      amountSection.classList.add("mb-4");

      const amountInput = document.createElement("input") as HTMLInputElement;
      amountInput.type = "number";
      amountInput.id = "amount";
      amountInput.classList.add("load-fund-input");
      amountInput.classList.add("input");
      amountInput.placeholder = "Enter amount";

      const quickAmountButtons = document.createElement(
        "div"
      ) as HTMLDivElement;
      quickAmountButtons.classList.add("quick-amount-buttons");
      const amounts = [500, 1000, 2000, 5000, 10000];

      /**
       * Generates quick amount buttons for the load balance modal.
       * The buttons when clicked will set the amount input to the corresponding amount.
       *
       * @return {void} This function does not return anything.
       */
      amounts.forEach((amount) => {
        const button = document.createElement("button");
        button.classList.add("quick-amount-button");
        button.innerHTML = `+${amount}`;
        quickAmountButtons.appendChild(button);

        button.onclick = () => {
          amountInput.value = `${amount}`;
        };
      });

      amountSection.appendChild(amountInput);
      amountSection.appendChild(quickAmountButtons);

      const purposeSection = document.createElement("div") as HTMLDivElement;
      purposeSection.classList.add("purpose-section");
      const purposeLabel = document.createElement("label") as HTMLLabelElement;

      purposeLabel.innerHTML = "Purpose";
      const purposeSelect = document.createElement("select");
      purposeSelect.id = "purpose";
      purposeSelect.classList.add("load-fund-purpose-select");
      purposeSelect.classList.add("input");

      const options = [
        "Personal Use",
        "Lend / Borrow",
        "Bill Sharing",
        "Family Expenses",
      ];

      /**
       * Generates options for the purpose select element in the load balance modal.
       *
       * @return {void} This function does not return anything.
       */
      options.forEach((optionText) => {
        const option = document.createElement("option") as HTMLOptionElement;
        option.textContent = optionText;
        purposeSelect.appendChild(option);
      });
      purposeSection.appendChild(purposeLabel);
      purposeSection.appendChild(purposeSelect);

      const buttonsSection = document.createElement("div");
      buttonsSection.classList.add("buttons-section");
      const cancelButton = document.createElement("button");
      cancelButton.classList.add("load-fund-cancel-button");
      cancelButton.textContent = "Cancel";
      const proceedButton = document.createElement("button");
      proceedButton.classList.add("load-fund-proceed-button");
      proceedButton.textContent = "Proceed";

      const remarksInput = document.createElement("input") as HTMLInputElement;
      remarksInput.type = "text";
      remarksInput.id = "remarks";
      remarksInput.classList.add("load-fund-input");
      remarksInput.classList.add("input");
      remarksInput.placeholder = "Enter remarks";

      buttonsSection.appendChild(cancelButton);
      cancelButton.onclick = () => {
        closeModal();
      };

      buttonsSection.appendChild(proceedButton);

      /**
       * Handles the click event for the proceed button in the load balance modal.
       *
       * @return {Promise<void>} This function does not return anything.
       */
      proceedButton.onclick = async (): Promise<void> => {
        /**
         * Add basic validation to the input fields.
         */
        if (amountInput.value.length <= 0) {
          amountInput.classList.add("error-border");
          Toast.showToast("Please enter the amount.");
        } else if (+amountInput.value < 100) {
          amountInput.classList.add("error-border");
          Toast.showToast("Amount should be greater than Rs.99.");
        } else if (remarksInput.value.length <= 0) {
          remarksInput.classList.add("error-border");
          Toast.showToast("Please enter the remarks.");
        } else {
          amountInput.classList.remove("error-border");
          const accessToken = UserUtils.getAccessToken();

          /**
           * Call the load balance service.
           */
          await UserService.loadBalance(
            accessToken,
            bankAccount.id,
            +amountInput.value,
            purposeSelect.value,
            remarksInput.value
          )
            .then(async (data: any) => {
              Toast.showToast(data.message);
              closeModal();
              const user: IUser = await AuthService.fetchUser(accessToken);

              if (user) {
                localStorage.setItem("user", JSON.stringify(user));
              }
            })
            .catch((e) => {
              Toast.showToast(e.message);
            });
        }
      };

      modalContainer.appendChild(header);
      modalContainer.appendChild(logoContainer);
      modalContainer.appendChild(bankName);
      modalContainer.appendChild(amountSection);
      modalContainer.appendChild(purposeSection);
      modalContainer.appendChild(remarksInput);
      modalContainer.appendChild(buttonsSection);

      blackBackgroundElement.appendChild(modalContainer);

      appElement.appendChild(blackBackgroundElement);
    };

    const loadBalanceErrorElement = document.getElementById(
      "load-balance-error"
    ) as HTMLDivElement;
    const loadBalanceErrorMessage = document.getElementById(
      "load-balance-error-message"
    ) as HTMLParagraphElement;

    const linkedAccountsElement = document.getElementById(
      "linked-accounts"
    ) as HTMLDivElement;

    const accessToken = UserUtils.getAccessToken();
    loadBalanceErrorElement.style.display = "none";

    /**
     * Fetches all bank accounts linked to the user.
     * Create a card for each bank account.
     */
    BankAccountService.fetchUserBankAccounts(accessToken)
      .then((data: IBankAccount[]) => {
        data.forEach((bankAccount: IBankAccount) => {
          const accountCard = document.createElement("div") as HTMLDivElement;

          accountCard.classList.add("bank-account-card", "account-card");

          linkedAccountsElement.appendChild(accountCard);

          accountCard.onclick = () => {
            showLoadBalanceModal(bankAccount);
          };

          const bankNameHeads = document.createElement("div") as HTMLDivElement;
          bankNameHeads.classList.add("bank-name-heads");
          accountCard.appendChild(bankNameHeads);

          const bankName = document.createElement("p") as HTMLParagraphElement;
          bankName.innerHTML = bankAccount.name;
          bankName.classList.add("bank-name");
          bankNameHeads.appendChild(bankName);

          const bankImage = document.createElement("img") as HTMLImageElement;
          bankImage.src = bankAccount.imageUrl;
          bankImage.classList.add("bank-image");
          accountCard.appendChild(bankImage);

          const bankLocation = document.createElement(
            "p"
          ) as HTMLParagraphElement;
          bankLocation.innerHTML = bankAccount.location;
          bankLocation.classList.add("bank-location");
          bankNameHeads.appendChild(bankLocation);

          const bankAccountNumber = document.createElement(
            "p"
          ) as HTMLParagraphElement;
          bankAccountNumber.innerHTML = `XXXX XXXX XXXX XXX${bankAccount.id}`;
          bankAccountNumber.classList.add("bank-account-number");
          accountCard.appendChild(bankAccountNumber);
        });
      })
      .catch((e: any) => {
        loadBalanceErrorElement.style.display = "flex";
        loadBalanceErrorMessage.innerHTML =
          e.message || "Something went wrong. Please try again.";
      })
      .finally(() => {});
  };
}
