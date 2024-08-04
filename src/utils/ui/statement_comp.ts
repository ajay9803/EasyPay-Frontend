import { IBalanceTransferStatement } from "../../interfaces/statement";
import DateUtils from "../date";
import UserUtils from "../user";

export class StatementComponents {
  static lgStatementComponent = (
    tableBody: HTMLTableElement,
    statement: IBalanceTransferStatement
  ): HTMLTableRowElement => {
    const description =
      statement.cashFlow === "Debit"
        ? `Fund received from ${statement.senderUsername}`
        : `Fund transferred to ${statement.receiverUsername}`;

    /**
     * Create table row for larger screens.
     */
    const tableRow = document.createElement("tr") as HTMLTableRowElement;
    tableRow.className = "table-row";

    const idCell = document.createElement("td") as HTMLTableCellElement;
    idCell.classList.add("table-cell");
    idCell.textContent = statement.id.toString();

    const descriptionCell = document.createElement(
      "td"
    ) as HTMLTableCellElement;
    descriptionCell.classList.add("table-cell-desc");

    const imgIcon = document.createElement("img") as HTMLImageElement;
    imgIcon.src = "./images/e-wallet.png";
    imgIcon.classList.add("statement-mobile-icon-lg");
    descriptionCell.appendChild(imgIcon);

    const descParagraph = document.createElement("p") as HTMLParagraphElement;
    descParagraph.innerHTML = description;
    descriptionCell.appendChild(descParagraph);

    const dateCell = document.createElement("td") as HTMLTableCellElement;
    dateCell.classList.add("table-cell");
    dateCell.textContent = DateUtils.formatDateFromMilliseconds(
      +statement.createdAt
    );

    const channelCell = document.createElement("td") as HTMLTableCellElement;
    channelCell.classList.add("table-cell");
    channelCell.textContent = "Web";

    const drCell = document.createElement("td") as HTMLTableCellElement;
    drCell.classList.add("table-cell");
    drCell.textContent =
      statement.cashFlow === "Debit" ? `Rs. ${statement.amount}` : "--";

    const crCell = document.createElement("td") as HTMLTableCellElement;
    crCell.classList.add("table-cell");
    crCell.textContent =
      statement.cashFlow === "Credit" ? `Rs. ${statement.amount}` : "--";

    const balanceCell = document.createElement("td") as HTMLTableCellElement;
    balanceCell.classList.add("table-cell");

    const user = UserUtils.getUserDetails();

    if (user !== null) {
      balanceCell.textContent = `Rs. ${
        statement.senderUserId === user.id
          ? statement.senderTotalBalance
          : statement.receiverTotalBalance
      }`;
    }

    tableRow.appendChild(idCell);
    tableRow.appendChild(descriptionCell);
    tableRow.appendChild(dateCell);
    tableRow.appendChild(channelCell);
    tableRow.appendChild(drCell);
    tableRow.appendChild(crCell);
    tableRow.appendChild(balanceCell);

    tableBody.appendChild(tableRow);

    return tableRow;
  };

  static smStatementComponent = (
    tableBody: HTMLTableElement,
    statement: IBalanceTransferStatement
  ): HTMLDivElement => {
    const description =
      statement.cashFlow === "Debit"
        ? `Fund received from ${statement.senderUsername}`
        : `Fund transferred to ${statement.receiverUsername}`;

    const statementDiv = document.createElement("div") as HTMLDivElement;
    statementDiv.classList.add("statement-mobile-div");

    const iconDiv = document.createElement("div") as HTMLDivElement;
    iconDiv.classList.add("statement-mobile-icon-div");

    const mobileImageIcon = document.createElement("img") as HTMLImageElement;
    mobileImageIcon.src = "./images/e-wallet.png";
    mobileImageIcon.classList.add("statement-mobile-icon");
    iconDiv.appendChild(mobileImageIcon);

    const detailsDiv = document.createElement("div") as HTMLDivElement;
    detailsDiv.classList.add("statement-mobile-detail-div");

    const descriptionP = document.createElement("p") as HTMLParagraphElement;
    descriptionP.classList.add("statement-mobile-detail");
    descriptionP.innerHTML = `${description}`;

    const dateP = document.createElement("p") as HTMLParagraphElement;
    dateP.classList.add("statement-mobile-date-div");
    dateP.textContent = DateUtils.formatDateFromMilliseconds(
      +statement.createdAt
    );

    const balanceP = document.createElement("p") as HTMLParagraphElement;
    balanceP.classList.add("remaining-balance");
    balanceP.innerHTML = `Balance: `;

    const remainingBalance = document.createElement("span") as HTMLSpanElement;
    remainingBalance.classList.add("statement-mobile-div-remaining-balance");

    const user = UserUtils.getUserDetails();

    remainingBalance.textContent = `Rs. ${
      statement.senderUserId === user!.id
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

    statementDiv.appendChild(iconDiv);
    statementDiv.appendChild(detailsDiv);
    statementDiv.appendChild(amountP);

    tableBody.appendChild(statementDiv);

    return statementDiv;
  };
}
