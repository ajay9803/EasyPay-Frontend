import { IBalanceTransferStatement } from "../interfaces/statement";
import StatementService from "../services/statement";
import DateUtils from "../utils/date";
import { Toast } from "../utils/toast";
import UserUtils from "../utils/user";
import { PDFUtils } from "../utils/pdf";
import { StatementComponents } from "../utils/ui/statement_comp";

/**
 * Class representing the actions for the statements page.
 */
export class StatementsActions {
  /**
   * Fetches balance transfer statements from the server and updates the table
   * with the fetched data.
   *
   * @return {Promise<void>} A promise that resolves when the statements are
   * successfully fetched and the table is updated.
   */
  static fetchStatements: () => Promise<void> = async (): Promise<void> => {
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

    const paginationControls = document.getElementById(
      "pagination-controls"
    ) as HTMLDivElement;

    /**
     * Opens the statement modal and displays the details of a specific statement.
     *
     * @param {IBalanceTransferStatement} statement - The statement object containing the details to be displayed.
     * @return {void}
     */
    const openStatementModal = (statement: IBalanceTransferStatement): void => {
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

      if (user !== null) {
        statementDetailProcessor.textContent =
          user.id === statement.senderUserId
            ? user.username
            : statement.senderUsername;
      }

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

    /**
     * Submit event handler for the statement filter form.
     *
     * @param {SubmitEvent} e - The submit event.
     * @return {Promise<void>} Promise that resolves when the function completes.
     */
    statementFilterForm.addEventListener(
      "submit",
      async (e: SubmitEvent): Promise<void> => {
        currentPageNumber = 1;
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
      }
    );

    cashFLowSelector.onchange = async () => {
      cashFlowValue = cashFLowSelector.value;
    };

    let currentPageNumber = 1;
    const pageSize = 1;

    /**
     * Fetches balance transfer statements based on the selected filters.
     *
     * @return {Promise<void>} Promise that resolves when the function completes.
     */
    const fetchTheStatements = async (): Promise<void> => {
      fetchedStatements = [];
      tableBody.innerHTML = "";
      statementsErrorElement.style.display = "none";
      statementTableHead.style.display = "table-header-group";
      await StatementService.fetchBalanceTransferStatements(
        accessToken,
        currentPageNumber,
        pageSize,
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
                const tableRow = StatementComponents.lgStatementComponent(
                  tableBody,
                  statement
                );

                tableRow.onclick = () => {
                  openStatementModal(statement);
                };

                tableBody.appendChild(tableRow);

                /**
                 * Create statement div for mobile view.
                 */
                const statementDiv = StatementComponents.smStatementComponent(
                  tableBody,
                  statement
                );

                statementDiv.onclick = () => {
                  openStatementModal(statement);
                };
              });

              if (data.totalCount <= pageSize) {
                paginationControls.style.display = "none";
              } else {
                paginationControls.style.display = "flex";

                const pageNumbers = document.getElementById(
                  "page-numbers"
                ) as HTMLDivElement;
                const totalPages = Math.ceil(data.totalCount / pageSize);
                pageNumbers.innerHTML = "";

                const prevPageButton = document.getElementById(
                  "prev-page"
                ) as HTMLButtonElement;
                const nextPageButton = document.getElementById(
                  "next-page"
                ) as HTMLButtonElement;

                prevPageButton.onclick = async () => {
                  currentPageNumber--;
                  await fetchTheStatements();
                };

                nextPageButton.onclick = async () => {
                  currentPageNumber++;
                  await fetchTheStatements();
                };

                if (currentPageNumber === 1) {
                  prevPageButton.disabled = true;
                  prevPageButton.style.cursor = "not-allowed";
                } else {
                  prevPageButton.disabled = false;
                  prevPageButton.style.cursor = "pointer";
                }

                if (currentPageNumber === totalPages) {
                  nextPageButton.disabled = true;
                  nextPageButton.style.cursor = "not-allowed";
                } else {
                  nextPageButton.disabled = false;
                  nextPageButton.style.cursor = "pointer";
                }

                for (let i = 1; i <= totalPages; i++) {
                  const pageNumber = document.createElement(
                    "div"
                  ) as HTMLDivElement;
                  pageNumber.innerHTML = i.toString();
                  pageNumber.classList.add("page-number");
                  if (i === currentPageNumber) {
                    pageNumber.classList.add("bg-blue-500", "text-white");
                  } else {
                    pageNumber.classList.remove("bg-blue-500");
                  }
                  pageNumbers.appendChild(pageNumber);
                  pageNumber.onclick = async () => {
                    currentPageNumber = i;
                    await fetchTheStatements();
                  };
                }
              }
            }
          }
        )
        .catch((e) => {
          statementTableHead.style.display = "hidden";
          statementsErrorElement.style.display = "flex";
          statementsErrorMessage.innerHTML =
            e.message || "Something went wrong. Please try again.";
          paginationControls.style.display = "none";
        });
    };

    fetchTheStatements();
  };

  static downloadPdfEventListener: () => void = () => {
    const pdfButton = document.getElementById("pdf-button") as HTMLElement;

    pdfButton.onclick = () => {
      const element = document.getElementById(
        "statement-modal-details"
      ) as HTMLDivElement;

      PDFUtils.dowloadPdf(element);
    };
  };
}
