import { IBalanceTransferStatement } from "../interfaces/statement";
import { IUser } from "../interfaces/user";
import AuthService from "../services/auth";
import StatementService from "../services/statement";
import DateUtils from "../utils/date";
import Navigator from "../utils/navigate";
import UserUtils from "../utils/user";
import { Toast } from "../utils/toast";
import QuizService from "../services/quiz";
import { LOGIN_PATH, QUIZ_PATH } from "../constants/routes";
import { MAIN_LOGO_PATH } from "../constants/images_path";
import { Slides } from "../utils/ui/slides";

let viewAmount: boolean = false;

/**
 * Class representing the actions for the home page.
 *
 * @class
 */
export class HomeActions {
  static getUpdatedBalance = (amount: string) => {
    const user = UserUtils.getUserDetails();
    const amountElement = document.getElementById(
      "card-amount"
    ) as HTMLParagraphElement;

    amountElement.innerHTML = viewAmount
      ? `Rs. ${+user!.balance + +amount}`
      : "Rs. XXX.XX";
  };

  /**
   * Retrieves the latest user details from the server and updates the local
   * storage with the new information.
   *
   * @return {Promise<void>} A promise that resolves when the user details are
   * updated successfully.
   */
  static getUpdatedUserDetails: () => Promise<void> =
    async (): Promise<void> => {
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

          const easyPayPoints = document.getElementById(
            "easy-pay-points-span"
          ) as HTMLParagraphElement;
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

      const sliderSection = document.getElementById(
        "dashboard-slider"
      ) as HTMLDivElement;

      const images = [
        "https://www.forbes.com/advisor/wp-content/uploads/2023/08/image1-25.png",
        "https://adyen.getbynder.com/transform/4298074a-0912-4f9d-972c-7ba9270df075/blog-header-digital-wallets",
        "https://www.forbes.com/advisor/wp-content/uploads/2023/08/image1-25.png",
      ];
      new Slides(sliderSection, images);
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

  /**
   * Loads the slider with the given images.
   *
   * @returns {void} This function does not return anything.
   */
  static loadSlider: () => void = (): void => {
    const sliderSection = document.getElementById(
      "slider-section"
    ) as HTMLDivElement;

    const images = [
      "https://www.cognyte.com/wp-content/uploads/2022/03/Digital_wallet_02_1920X960-01.jpg",
      "https://www.cuinsight.com/wp-content/uploads/2022/12/bigstock-Smartphone-And-Internet-Bankin-426663185.jpg",
      "https://cdn.aarp.net/content/dam/aarp/home-and-family/personal-technology/2021/12/1140-smartphone-digital-wallet.jpg",
    ];
    new Slides(sliderSection, images);
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

  static homeDashboardEvents = async () => {
    const dummyElements = document.querySelectorAll(
      ".dummy-feature"
    ) as NodeListOf<HTMLParagraphElement>;

    dummyElements.forEach((element) => {
      element.onclick = () => {
        Navigator.navigateTo(`/${LOGIN_PATH}`);
      };
    });
  };
}
