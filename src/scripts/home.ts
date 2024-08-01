import { IBalanceTransferStatement } from "../interfaces/statement";
import { IUser } from "../interfaces/user";
import AuthService from "../services/auth";
import StatementService from "../services/statement";
import DateUtils from "../utils/date";
import Navigator from "../utils/navigate";
import UserUtils from "../utils/user";
import { Toast } from "../utils/toast";
import { userSocket } from "./main";
import QuizService from "../services/quiz";
import { QUIZ_PATH } from "../constants/routes";

let viewAmount: boolean = false;

/**
 * Class representing the actions for the home page.
 *
 * @class
 */
export class HomeActions {
  /**
   * Retrieves the latest user details from the server and updates the local
   * storage with the new information.
   *
   * @return {Promise<void>} A promise that resolves when the user details are
   * updated successfully.
   */
  static getUpdatedUserDetails: () => Promise<void> =
    async (): Promise<void> => {
      const dummyButton = document.getElementById("dummy") as HTMLDivElement;

      dummyButton.onclick = () => {
        userSocket.emit("test", 4);
      };

      const accessToken = UserUtils.getAccessToken();

      if (accessToken) {
        const user: IUser = await AuthService.fetchUser(accessToken);

        if (user) {
          localStorage.setItem("user", JSON.stringify(user));

          const verifiedIcon = document.getElementById(
            "verified-icon"
          ) as HTMLElement;
          const checkIcon = document.getElementById(
            "check-icon"
          ) as HTMLElement;

          const easyPayPoints = document.getElementById('easy-pay-points-span') as HTMLParagraphElement;
          easyPayPoints.textContent = user.easyPayPoints;

          /**
           * Checks if the user is verified or not.
           * Display the verified icon if the user is verified.
           */
          if (user.isVerified) {
            verifiedIcon.style.display = "block";
            checkIcon.style.display = "block";
          } else {
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

  /**
   * Adds event listeners to the refresh icon.
   * When the icon is clicked, it retrieves the latest user details from the server and updates the UI.
   * @returns {Promise<void>} A promise that resolves when the event listeners are added.
   */
  static refreshIconEventlisteners: () => Promise<void> =
    async (): Promise<void> => {
      const refreshIcon = document.getElementById(
        "refresh-icon"
      ) as HTMLLIElement;

      refreshIcon.onclick = async () => {
        this.getUpdatedUserDetails();
      };
    };

  /**
   * Updates the home view with the latest user details.
   * This function retrieves the user details from the server and updates the UI accordingly.
   *
   * @returns {void} This function does not return anything.
   */
  static updateHomeView: () => void = (): void => {
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

    /**
     * If the user is not logged in, display the dashboard section.
     * If the user is logged in, display the home section.
     */
    if (user && user.roleId === "2") {
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

      slides.forEach((slide, index) => {
        slide.style.left = `${index * 100}%`;
      });

      /**
       * Slides the images in the carousel.
       *
       * @returns {void}
       */
      const slideImage = (): void => {
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

  /**
   * Toggles the view of the amount.
   * Toggles between Rs. XXX.XX and Rs. Actual Amount
   *
   * @returns {void} This function does not return anything.
   */
  static toggleViewAmount: () => void = (): void => {
    let balance: number;
    const userData = UserUtils.getUserDetails();

    balance = userData ? parseInt(userData.balance) : 0;
    const amountElement = document.getElementById(
      "card-amount"
    ) as HTMLParagraphElement;

    const toggle = () => {
      viewAmount = !viewAmount;
      /**
       * Toggles between Rs. XXX.XX and Rs. Actual Amount
       */
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

  /**
   * Asynchronously retrieves recent transactions and updates the UI.
   *
   * @return {Promise<void>} A Promise that resolves when the UI has been updated.
   */
  static getRecentTransactions = async (): Promise<void> => {
    const recentTransactionsElement = document.getElementById(
      "recent-transactions"
    ) as HTMLDivElement;

    const user = UserUtils.getUserDetails();

    if (user) {
      const currentDate = new Date();

      const defaultStartDate = new Date(currentDate);
      defaultStartDate.setDate(currentDate.getDate() - 7);

      /**
       * Get formatted start date and end date
       */
      const formattedEndDate = currentDate.toISOString().split("T")[0];
      const formattedStartDate = defaultStartDate.toISOString().split("T")[0];
      const accessToken = UserUtils.getAccessToken();
      await StatementService.fetchBalanceTransferStatements(
        accessToken,
        1,
        5,
        "All",
        formattedStartDate,
        formattedEndDate
      )
        .then(
          (data: {
            statements: IBalanceTransferStatement[];
            totalCount: number;
          }) => {
            data.statements.forEach((statement) => {
              // Create transaction item
              const transactionItem = document.createElement("div");
              transactionItem.classList.add("transaction-item");

              // Create transaction details
              const transactionDetails = document.createElement("div");
              transactionDetails.classList.add("transaction-details");

              const transactionAmount = document.createElement("div");

              transactionAmount.innerHTML = `Rs. ${statement.amount}`;

              // Create transaction type
              const transactionType = document.createElement("div");
              transactionType.classList.add("transaction-type");
              const transactionIcon = document.createElement(
                "i"
              ) as HTMLElement;
              transactionIcon.classList.add("fa-solid", "fa-arrow-right");
              const username = document.createElement("p");
              username.classList.add("transaction-username");

              if (statement.cashFlow === "Debit") {
                transactionType.classList.add("transaction-type-debit");
                transactionType.classList.add("transaction-icon-debit");
                transactionAmount.classList.add("transaction-amount-debit");
                username.innerHTML = statement.senderUsername;
              } else {
                transactionType.classList.add("transaction-type-credit");
                transactionType.classList.add("transaction-icon-credit");
                transactionAmount.classList.add("transaction-amount-credit");
                username.innerHTML = statement.receiverUsername;
              }

              transactionType.appendChild(transactionIcon);

              // Create transaction details tab
              const transactionDetailsTab = document.createElement("div");

              transactionDetailsTab.classList.add("transaction-details-tab");

              const time = document.createElement("p");
              time.innerHTML = DateUtils.formatDateFromMilliseconds(
                +statement.createdAt
              );

              transactionDetailsTab.appendChild(username);
              transactionDetailsTab.appendChild(time);

              transactionDetails.appendChild(transactionType);
              transactionDetails.appendChild(transactionDetailsTab);

              transactionItem.appendChild(transactionDetails);
              transactionItem.appendChild(transactionAmount);

              recentTransactionsElement.appendChild(transactionItem);

              transactionItem.onclick = () => {
                Navigator.navigateTo("/#/statements");
              };
            });
            const moreButton = document.createElement(
              "p"
            ) as HTMLParagraphElement;
            moreButton.innerHTML = "More";
            moreButton.classList.add("more-button");
            recentTransactionsElement.appendChild(moreButton);
            moreButton.onclick = () => {
              Navigator.navigateTo("/#/statements");
            };
          }
        )
        .catch((e) => {
          recentTransactionsElement.innerHTML = e.message;
        });
    }
  };

  static quizButtonEvenListener = async () => {
    const accessToken = UserUtils.getAccessToken();

    const quizButton = document.getElementById("quiz-button") as HTMLDivElement;

    quizButton.onclick = async () => {
      await QuizService.fetchExistingQuiz(accessToken)
        .then((data) => {
          Toast.showToast(data.message);
          Navigator.navigateTo(`/${QUIZ_PATH}`);
        })
        .catch((e) => {
          Toast.showToast(e.message);
        });
    };
  };
}
