import { IBalanceTransferStatement } from "../interfaces/statement";
import StatementService from "../services/statement";
import DateUtils from "../utils/date";
import { Toast } from "../utils/toast";
import UserUtils from "../utils/user";

export class StatementsActions {
  static fetchStatements: () => Promise<void> = async () => {
    const accessToken = UserUtils.getAccessToken();

    let fetchedStatements: IBalanceTransferStatement[];

    const tableBody = document.getElementById(
      "statement-table"
    ) as HTMLTableElement;

    const statementModalBackground = document.getElementById(
      "statement-modal-background"
    ) as HTMLDivElement;

    const statementModal = document.getElementById(
      "statement-modal"
    ) as HTMLDivElement;

    const openStatementModal = (statement: IBalanceTransferStatement) => {
      statementModalBackground.classList.remove("hidden");

      statementModal.classList.remove("translate-x-full");
      statementModal.classList.add("translate-x-0");

      const statementDetailDate = document.getElementById(
        "statement-detail-date"
      ) as HTMLParagraphElement;
      const statementDetailProcessor = document.getElementById(
        "statement-detail-processor"
      ) as HTMLParagraphElement;
      const statementDetailAmount = document.getElementById(
        "statement-detail-amount"
      ) as HTMLParagraphElement;
      const statementDetailSender = document.getElementById(
        "statement-detail-sender"
      ) as HTMLParagraphElement;
      const statementDetailReceiver = document.getElementById(
        "statement-detail-receiver"
      ) as HTMLParagraphElement;

      const user = UserUtils.getUserDetails();

      statementDetailDate.textContent = DateUtils.formatDateFromMilliseconds(
        +statement.createdAt
      );

      statementDetailProcessor.textContent =
        user.id === statement.senderUserId
          ? user.username
          : statement.senderUsername;

      statementDetailAmount.textContent = `Rs. ${statement.amount}`;
      statementDetailSender.textContent = statement.senderUsername;
      statementDetailReceiver.textContent = statement.receiverUsername;
    };

    const statementsErrorElement = document.getElementById(
      "statements-error"
    ) as HTMLDivElement;
    const statementsErrorMessage = document.getElementById(
      "statements-error-message"
    ) as HTMLParagraphElement;

    const statementTableHead = document.getElementById(
      "statement-table-head"
    ) as HTMLTableSectionElement;

    const closeStatementModal = () => {
      statementModalBackground.classList.add("hidden");
      statementModal.classList.remove("translate-x-0");
      statementModal.classList.add("translate-x-full");
    };

    const closeStatementModalButton = document.getElementById(
      "close-statement-modal-button"
    ) as HTMLElement;

    closeStatementModalButton.onclick = () => {
      closeStatementModal();
    };

    const statementFilterForm = document.getElementById(
      "statement-filter-form"
    ) as HTMLFormElement;

    const currentDate = new Date();

    const defaultStartDate = new Date(currentDate);
    defaultStartDate.setDate(currentDate.getDate() - 7);
    const formattedEndDate = currentDate.toISOString().split("T")[0];

    const formattedStartDate = defaultStartDate.toISOString().split("T")[0];

    const startDateInput = document.getElementById(
      "start-date"
    ) as HTMLInputElement;
    startDateInput.value = formattedStartDate;
    const endDateInput = document.getElementById(
      "end-date"
    ) as HTMLInputElement;
    endDateInput.value = formattedEndDate;

    const cashFLowSelector = document.getElementById(
      "drcr"
    ) as HTMLSelectElement;

    let cashFlowValue = cashFLowSelector.value;

    statementFilterForm.addEventListener("submit", async (e: SubmitEvent) => {
      e.preventDefault();
      if (!startDateInput.value || !endDateInput.value) {
        Toast.showToast("Please select Start and End date.");
        return;
      } else if (
        new Date(startDateInput.value) > new Date(endDateInput.value)
      ) {
        Toast.showToast("Start date cannot be greater than end date.");
        return;
      }
      await fetchTheStatements();
    });

    cashFLowSelector.onchange = async () => {
      cashFlowValue = cashFLowSelector.value;
      await fetchTheStatements();
    };

    const fetchTheStatements = async () => {
      fetchedStatements = [];
      tableBody.innerHTML = "";
      statementsErrorElement.style.display = "none";
      statementTableHead.style.display = "table-header-group";
      await StatementService.fetchBalanceTransferStatements(
        accessToken,
        1,
        20,
        cashFlowValue,
        startDateInput.value,
        endDateInput.value
      )
        .then(
          (data: {
            statements: IBalanceTransferStatement[];
            totalCount: number;
          }) => {
            tableBody.innerHTML = "";
            fetchedStatements = data.statements;
            console.log(data.statements);
            if (fetchedStatements.length !== 0) {
              const tableHead = document.createElement(
                "thead"
              ) as HTMLTableSectionElement;
              tableHead.className = "hidden md:table-header-group";

              const tableHeadRow = document.createElement(
                "tr"
              ) as HTMLTableRowElement;
              tableHeadRow.className = "text-sm statement-table-head-row";
              tableHead.appendChild(tableHeadRow);

              const headers = [
                "#",
                "DESCRIPTION",
                "DATE",
                "CHANNEL",
                "DR.",
                "CR.",
                "BALANCE",
              ];

              headers.forEach((headerText) => {
                const th = document.createElement("th") as HTMLTableCellElement;
                th.className = "p-2";
                th.textContent = headerText;
                tableHeadRow.appendChild(th);
              });

              tableBody.appendChild(tableHead);

              fetchedStatements.forEach((statement) => {
                const description =
                  statement.cashFlow === "Debit"
                    ? `Fund received from ${statement.senderUsername}`
                    : `Fund transferred to ${statement.receiverUsername}`;

                // Create table row for larger screens
                const tableRow = document.createElement(
                  "tr"
                ) as HTMLTableRowElement;
                tableRow.className = "table-row";

                const idCell = document.createElement(
                  "td"
                ) as HTMLTableCellElement;
                idCell.classList.add("table-cell");
                idCell.textContent = statement.id.toString();

                const descriptionCell = document.createElement(
                  "td"
                ) as HTMLTableCellElement;
                descriptionCell.classList.add("table-cell-desc");

                const imgIcon = document.createElement(
                  "img"
                ) as HTMLImageElement;
                imgIcon.src = "./images/e-wallet.png";
                imgIcon.classList.add("statement-mobile-icon-lg");
                descriptionCell.appendChild(imgIcon);

                const descParagraph = document.createElement(
                  "p"
                ) as HTMLParagraphElement;
                descParagraph.innerHTML = description;
                descriptionCell.appendChild(descParagraph);

                const dateCell = document.createElement(
                  "td"
                ) as HTMLTableCellElement;
                dateCell.classList.add("table-cell");
                dateCell.textContent = DateUtils.formatDateFromMilliseconds(
                  +statement.createdAt
                );

                const channelCell = document.createElement(
                  "td"
                ) as HTMLTableCellElement;
                channelCell.classList.add("table-cell");
                channelCell.textContent = "Web";

                const drCell = document.createElement(
                  "td"
                ) as HTMLTableCellElement;
                drCell.classList.add("table-cell");
                drCell.textContent =
                  statement.cashFlow === "Debit"
                    ? `Rs. ${statement.amount}`
                    : "--";

                const crCell = document.createElement(
                  "td"
                ) as HTMLTableCellElement;
                crCell.classList.add("table-cell");
                crCell.textContent =
                  statement.cashFlow === "Credit"
                    ? `Rs. ${statement.amount}`
                    : "--";

                const balanceCell = document.createElement(
                  "td"
                ) as HTMLTableCellElement;
                balanceCell.classList.add("table-cell");

                const user = UserUtils.getUserDetails();

                balanceCell.textContent = `Rs. ${
                  statement.senderUserId === user.id
                    ? statement.senderTotalBalance
                    : statement.receiverTotalBalance
                }`;

                tableRow.appendChild(idCell);
                tableRow.appendChild(descriptionCell);
                tableRow.appendChild(dateCell);
                tableRow.appendChild(channelCell);
                tableRow.appendChild(drCell);
                tableRow.appendChild(crCell);
                tableRow.appendChild(balanceCell);

                tableRow.onclick = () => {
                  openStatementModal(statement);
                };

                tableBody.appendChild(tableRow);

                const mobileDiv = document.createElement(
                  "div"
                ) as HTMLDivElement;
                mobileDiv.classList.add("statement-mobile-div");

                const iconDiv = document.createElement("div") as HTMLDivElement;
                iconDiv.classList.add("statement-mobile-icon-div");

                const mobileImageIcon = document.createElement(
                  "img"
                ) as HTMLImageElement;
                mobileImageIcon.src = "./images/e-wallet.png";
                mobileImageIcon.classList.add("statement-mobile-icon");
                iconDiv.appendChild(mobileImageIcon);

                const detailsDiv = document.createElement(
                  "div"
                ) as HTMLDivElement;
                detailsDiv.classList.add("statement-mobile-detail-div");

                const descriptionP = document.createElement(
                  "p"
                ) as HTMLParagraphElement;
                descriptionP.classList.add("statement-mobile-detail");
                descriptionP.innerHTML = `${description}`;

                const dateP = document.createElement(
                  "p"
                ) as HTMLParagraphElement;
                dateP.classList.add("statement-mobile-date-div");
                dateP.textContent = DateUtils.formatDateFromMilliseconds(
                  +statement.createdAt
                );

                const balanceP = document.createElement(
                  "p"
                ) as HTMLParagraphElement;
                balanceP.classList.add("remaining-balance");
                balanceP.innerHTML = `Balance: `;

                const remainingBalance = document.createElement(
                  "span"
                ) as HTMLSpanElement;
                remainingBalance.classList.add(
                  "statement-mobile-div-remaining-balance"
                );

                remainingBalance.textContent = `Rs. ${
                  statement.senderUserId === user.id
                    ? statement.senderTotalBalance
                    : statement.receiverTotalBalance
                }`;
                balanceP.appendChild(remainingBalance);

                detailsDiv.appendChild(descriptionP);
                detailsDiv.appendChild(dateP);
                detailsDiv.appendChild(balanceP);

                const amountP = document.createElement("p");
                amountP.classList.add(
                  statement.cashFlow === "Debit"
                    ? "cashflow-type-debit"
                    : "cashflow-type-credit"
                );
                amountP.textContent = `Rs. ${statement.amount.toString()}`;

                mobileDiv.appendChild(iconDiv);
                mobileDiv.appendChild(detailsDiv);
                mobileDiv.appendChild(amountP);

                tableBody.appendChild(mobileDiv);

                mobileDiv.onclick = () => {
                  openStatementModal(statement);
                };
              });
            }
          }
        )
        .catch((e) => {
          statementTableHead.style.display = "hidden";
          statementsErrorElement.style.display = "flex";
          statementsErrorMessage.innerHTML =
            e.message || "Something went wrong. Please try again.";
        });
    };

    fetchTheStatements();
  };
}
