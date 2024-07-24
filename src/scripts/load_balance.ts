import BankAccountService from "../services/bank_account";
import { Toast } from "../utils/toast";
import UserUtils from "../utils/user";

export class LoadBalancePageActions {
  showLoadBalanceModal = () => {};
  static loadLinkedAccounts: () => void = () => {
    const linkedAccountsElement = document.getElementById(
      "linked-accounts"
    ) as HTMLDivElement;

    const accessToken = UserUtils.getAccessToken();
    BankAccountService.fetchUserBankAccounts(accessToken)
      .then((data: []) => {
        console.log("The data is: ", data);
        data.forEach((bankAccount: any) => {
          const accountCard = document.createElement("div") as HTMLDivElement;

          accountCard.classList.add("account-card");

          linkedAccountsElement.appendChild(accountCard);

          accountCard.onclick = () => {};

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
        Toast.showToast(e.message);
      })
      .finally(() => {});
  };
}
