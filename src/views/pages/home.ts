export class Home {
  static accountDetails = () => {
    const app = document.getElementById("app") as HTMLDivElement;

    let viewAmount: boolean = false;

    const currentTheme = localStorage.getItem("theme");
    console.log("The initial theme is: ", currentTheme);

    const homeSection = document.createElement("div") as HTMLDivElement;
    homeSection.classList.add("home-section");
    app.appendChild(homeSection);

    const homeSectionLeftBar = document.createElement("div") as HTMLDivElement;
    homeSectionLeftBar.classList.add("home-section-left-bar");
    homeSection.appendChild(homeSectionLeftBar);

    const accountDetailsSection = document.createElement(
      "div"
    ) as HTMLDivElement;
    accountDetailsSection.classList.add("account-details");
    homeSectionLeftBar.appendChild(accountDetailsSection);

    const accountDetailsTitle = document.createElement(
      "p"
    ) as HTMLParagraphElement;
    accountDetailsTitle.innerHTML = "My account";
    accountDetailsTitle.classList.add("account-details-title");
    accountDetailsSection.appendChild(accountDetailsTitle);

    const accountCard = document.createElement("div") as HTMLDivElement;
    accountCard.classList.add("account-card");
    accountDetailsSection.appendChild(accountCard);

    const cardAmount = document.createElement("p") as HTMLParagraphElement;
    cardAmount.innerHTML = viewAmount ? "Rs. 3,500" : "Rs. XXX.XX";
    cardAmount.classList.add("card-amount");
    accountCard.appendChild(cardAmount);

    cardAmount.onclick = () => {
      viewAmount = !viewAmount;
      cardAmount.innerHTML = viewAmount ? "Rs. 3,500" : "Rs. XXX.XX";
    };

    const cardTitle = document.createElement("p") as HTMLParagraphElement;
    cardTitle.innerHTML = "Main Wallet";
    cardTitle.classList.add("card-title");
    accountCard.appendChild(cardTitle);

    const quickTransactionsSection = document.createElement(
      "div"
    ) as HTMLDivElement;
    quickTransactionsSection.classList.add("quick-transactions-section");
    homeSectionLeftBar.appendChild(quickTransactionsSection);

    const quickTransactions = document.createElement("div") as HTMLDivElement;
    quickTransactions.classList.add("quick-transactions-section");
    quickTransactionsSection.appendChild(quickTransactions);

    const quickTransactionsSectionTitle = document.createElement(
      "p"
    ) as HTMLParagraphElement;
    quickTransactionsSectionTitle.innerHTML = "Quick Transactions";
    quickTransactionsSectionTitle.classList.add(
      "quick-transactions-section-title"
    );

    quickTransactions.appendChild(quickTransactionsSectionTitle);
    
    const addQuickTransactionElement = document.createElement('div') as HTMLDivElement;
    addQuickTransactionElement
  };
}
