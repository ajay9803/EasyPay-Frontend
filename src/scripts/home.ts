import { IUser } from "../interfaces/user";
import AuthService from "../services/auth";
import UserUtils from "../utils/user";

let viewAmount: boolean = false;

export class HomeActions {
  static getUpdatedUserDetails: () => Promise<void> = async () => {
    const accessToken = UserUtils.getAccessToken();
    const user: IUser = await AuthService.fetchUser(accessToken);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      const amountElement = document.getElementById(
        "card-amount"
      ) as HTMLParagraphElement;

      amountElement.innerHTML = viewAmount
        ? `Rs. ${user.balance}`
        : "Rs. XXX.XX";
    }
  };

  static toggleViewAmount: () => void = () => {
    let balance: number;
    const userData = UserUtils.getUserDetails();

    balance = userData ? parseInt(userData.balance) : 0;
    const amountElement = document.getElementById(
      "card-amount"
    ) as HTMLParagraphElement;

    const toggle = () => {
      viewAmount = !viewAmount;

      amountElement.innerHTML = viewAmount ? `Rs. ${balance}` : "Rs. XXX.XX";
    };

    amountElement.onclick = () => {
      toggle();
    };
  };

  static getQuickTransactions: () => void = () => {
    const quickTransactions: { name: string; imageUrl: string }[] = [
      {
        name: "Test1",
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Test2",
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Test3",
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      },
    ];

    const quickTransactionsElement =
      document.getElementById("quick-transactions");

    quickTransactions.forEach((transaction) => {
      const quickTransaction = document.createElement("div") as HTMLDivElement;
      quickTransaction.classList.add("quick-transaction");

      const quickTransactionImage = document.createElement(
        "div"
      ) as HTMLDivElement;
      quickTransactionImage.style.backgroundImage = `URL(${transaction.imageUrl})`;
      quickTransactionImage.classList.add("quick-transaction-image");
      quickTransaction.appendChild(quickTransactionImage);

      const quickTransactionTitle = document.createElement(
        "p"
      ) as HTMLParagraphElement;
      quickTransactionTitle.innerHTML = transaction.name;
      quickTransactionTitle.classList.add("quick-transaction-title");
      quickTransaction.appendChild(quickTransactionTitle);

      quickTransactionsElement?.appendChild(quickTransaction);
    });
  };

  static getRecentTransactions = () => {
    const recentTransactions: {
      date: string;
      type: string;
      amount: string;
      userName: string;
    }[] = [
      {
        date: "31st July, 2024",
        type: "debit",
        amount: "200",
        userName: "Test1",
      },
      {
        date: "31st July, 2024",
        type: "credit",
        amount: "200",
        userName: "Test1",
      },
      {
        date: "31st July, 2024",
        type: "debit",
        amount: "200",
        userName: "Test1",
      },
      {
        date: "31st July, 2024",
        type: "credit",
        amount: "200",
        userName: "Test1",
      },
      {
        date: "31st July, 2024",
        type: "credit",
        amount: "200",
        userName: "Test1",
      },
    ];

    const recentTransactionsElement = document.getElementById(
      "recent-transactions"
    ) as HTMLDivElement;
    recentTransactions.forEach((transaction) => {
      // Create transaction item
      const transactionItem = document.createElement("div");
      transactionItem.classList.add("transaction-item");

      // Create transaction details
      const transactionDetails = document.createElement("div");
      transactionDetails.classList.add("transaction-details");

      // Create transaction type
      const transactionType = document.createElement("div");
      if (transaction.type === "debit") {
        transactionType.classList.add("transaction-type-debit");
      } else {
        transactionType.classList.add("transaction-type-credit");
      }

      // Create transaction details tab
      const transactionDetailsTab = document.createElement("div");

      transactionDetailsTab.classList.add("transaction-details-tab");

      const username = document.createElement("p");
      username.classList.add("transaction-username");
      username.innerHTML = transaction.userName;

      const time = document.createElement("p");
      time.innerHTML = transaction.date;

      transactionDetailsTab.appendChild(username);
      transactionDetailsTab.appendChild(time);

      transactionDetails.appendChild(transactionType);
      transactionDetails.appendChild(transactionDetailsTab);

      // Create transaction amount
      const transactionAmount = document.createElement("div");
      transactionAmount.classList.add("transaction-amount");
      transactionAmount.textContent = transaction.amount;

      transactionItem.appendChild(transactionDetails);
      transactionItem.appendChild(transactionAmount);

      // Append transaction item to the container
      recentTransactionsElement.appendChild(transactionItem);
    });
  };
}
