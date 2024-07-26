import { IUser } from "../interfaces/user";
import AuthService from "../services/auth";
import UserUtils from "../utils/user";

let viewAmount: boolean = false;

export class HomeActions {
  static getUpdatedUserDetails: () => Promise<void> = async () => {
    const accessToken = UserUtils.getAccessToken();

    if (accessToken) {
      const user: IUser = await AuthService.fetchUser(accessToken);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));

        const verifiedIcon = document.getElementById(
          "verified-icon"
        ) as HTMLElement;
        const checkIcon = document.getElementById("check-icon") as HTMLElement;

        if (user.isVerified) {
          console.log("User is verified.");
          verifiedIcon.style.display = "block";
          checkIcon.style.display = "block";
        } else {
          console.log("User is not verified.");
          verifiedIcon.style.display = "none";
          checkIcon.style.display = "none";
        }

        const amountElement = document.getElementById(
          "card-amount"
        ) as HTMLParagraphElement;

        amountElement.innerHTML = viewAmount
          ? `Rs. ${user.balance}`
          : "Rs. XXX.XX";
      }
    }
  };

  static refreshIconEventlisteners: () => Promise<void> = async () => {
    const refreshIcon = document.getElementById(
      "refresh-icon"
    ) as HTMLLIElement;

    refreshIcon.onclick = async () => {
      console.log("Refresh icon is clicked.");
      this.getUpdatedUserDetails();
    };
  };

  static updateHomeView: () => void = () => {
    const user = UserUtils.getUserDetails();

    const homeSection = document.getElementById(
      "home-section"
    ) as HTMLDivElement;
    const kycFormServiceItem = document.getElementById(
      "kyc-service-item"
    ) as HTMLDivElement;

    const dashboardSection = document.getElementById(
      "dashboard-section"
    ) as HTMLDivElement;

    if (user) {
      dashboardSection.style.display = "none";
      homeSection.style.display = "flex";
      if (!user.isVerified) {
        kycFormServiceItem.style.display = "flex";
      } else {
        kycFormServiceItem.style.display = "none";
      }
    } else {
      homeSection.style.display = "none";
      dashboardSection.style.display = "flex flex-col";

      const slides = document.querySelectorAll(
        ".carousel-inner-img"
      ) as NodeListOf<HTMLImageElement>;
      let counter = 0;
      let direction = 1;

      console.log(slides);
      slides.forEach((slide, index) => {
        slide.style.left = `${index * 100}%`;
      });

      const slideImage = () => {
        slides.forEach((slide) => {
          slide.style.transform = `translateX(-${counter * 100}%)`;
        });
      };

      setInterval(() => {
        counter += direction;

        if (counter === slides.length - 1) {
          direction = -1;
        } else if (counter === 0) {
          direction = 1;
        }

        slideImage();
      }, 2000);
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

      const transactionAmount = document.createElement("div");

      transactionAmount.innerHTML = `Rs. ${transaction.amount}`;

      // Create transaction type
      const transactionType = document.createElement("div");
      transactionType.classList.add("transaction-type");
      const transactionIcon = document.createElement("i") as HTMLElement;
      transactionIcon.classList.add("fa-solid", "fa-arrow-right");
      if (transaction.type === "debit") {
        transactionType.classList.add("transaction-type-debit");
        transactionType.classList.add("transaction-icon-debit");
        transactionAmount.classList.add("transaction-amount-debit");
      } else {
        transactionType.classList.add("transaction-type-credit");
        transactionType.classList.add("transaction-icon-credit");
        transactionAmount.classList.add("transaction-amount-credit");
      }

      transactionType.appendChild(transactionIcon);

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

      transactionItem.appendChild(transactionDetails);
      transactionItem.appendChild(transactionAmount);

      recentTransactionsElement.appendChild(transactionItem);
    });
  };
}
