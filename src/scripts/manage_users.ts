import { IUser } from "../interfaces/user";
import UserService from "../services/user";
import DateUtils from "../utils/date";
import { Toast } from "../utils/toast";
import UserUtils from "../utils/user";

export class ManageUsersActions {
  static manageUsers: () => Promise<void> = async (): Promise<void> => {
    let userId: string;
    const usersTableBody = document.getElementById(
      "users-table-body"
    ) as HTMLTableSectionElement;
    const deleteModal = document.getElementById(
      "deleteModal"
    ) as HTMLDivElement;
    const cancelButton = document.getElementById(
      "cancelButton"
    ) as HTMLButtonElement;
    const confirmDeleteButton = document.getElementById(
      "confirmDeleteButton"
    ) as HTMLButtonElement;

    let currentPageNumber: number = 1;
    const pageSize: number = 5;

    const paginationControls = document.getElementById(
      "pagination-controls"
    ) as HTMLDivElement;

    const fetchTheUsers = async (page: number, size: number) => {
      const accessToken = UserUtils.getAccessToken();
      usersTableBody.innerHTML = "";
      paginationControls.style.display = "none";
      await UserService.fetchUsers(accessToken, page, size)
        .then((data) => {
          data.users.forEach((user: IUser) => {
            const row = document.createElement("tr") as HTMLTableRowElement;
            row.classList.add("users-row");

            const nameCell = document.createElement(
              "td"
            ) as HTMLTableCellElement;
            nameCell.classList.add("users-cell");
            nameCell.textContent = user.username;
            row.appendChild(nameCell);

            const emailCell = document.createElement(
              "td"
            ) as HTMLTableCellElement;
            emailCell.classList.add("users-cell");
            emailCell.textContent = user.email;
            row.appendChild(emailCell);

            const roleCell = document.createElement(
              "td"
            ) as HTMLTableCellElement;
            roleCell.classList.add("users-cell");
            roleCell.textContent = user.roleId === "1" ? "Admin" : "User";
            row.appendChild(roleCell);

            const statusCell = document.createElement(
              "td"
            ) as HTMLTableCellElement;
            statusCell.classList.add("users-cell");
            statusCell.textContent = user.isVerified
              ? "Verified"
              : "Not Verified";
            row.appendChild(statusCell);

            const joinedDateCell = document.createElement(
              "td"
            ) as HTMLTableCellElement;
            joinedDateCell.classList.add("users-cell");
            joinedDateCell.textContent = DateUtils.formatToYYYYMMDD(
              user.createdAt
            );
            row.appendChild(joinedDateCell);

            const lastLoginCell = document.createElement(
              "td"
            ) as HTMLTableCellElement;
            lastLoginCell.classList.add("users-cell");
            lastLoginCell.textContent = user.gender;
            row.appendChild(lastLoginCell);

            const actionsCell = document.createElement(
              "td"
            ) as HTMLTableCellElement;
            actionsCell.classList.add("users-cell");
            const deleteButton = document.createElement(
              "button"
            ) as HTMLButtonElement;

            deleteButton.onclick = () => {
              userId = user.id;
              deleteModal.style.display = "flex";
            };
            deleteButton.classList.add("text-red-600", "hover:text-red-900");
            deleteButton.textContent = "Delete";
            actionsCell.appendChild(deleteButton);
            row.appendChild(actionsCell);

            usersTableBody.appendChild(row);
          });

          if (data.totalPages > pageSize) {
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

            // Add event listeners to the prev and next page buttons
            prevPageButton.onclick = async () => {
              currentPageNumber--;
              await fetchTheUsers(currentPageNumber, pageSize);
            };

            nextPageButton.onclick = async () => {
              currentPageNumber++;
              await fetchTheUsers(currentPageNumber, pageSize);
            };

            /**
             * Disable prev and next button based on the current page number
             */
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

            /**
             * Create page number buttons
             */
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
                await fetchTheUsers(currentPageNumber, pageSize);
              };
            }
          }
        })
        .catch((e) => {
          usersTableBody.innerHTML = e.message;
          paginationControls.style.display = "none";
        });
    };

    fetchTheUsers(1, pageSize);

    cancelButton.onclick = () => {
      deleteModal.style.display = "none";
      fetchTheUsers(currentPageNumber, pageSize);
    };

    confirmDeleteButton.onclick = async () => {
      const accessToken = UserUtils.getAccessToken();
      await UserService.deleteUser(accessToken, userId)
        .then(async (data) => {
          Toast.showToast(data.message);
          await fetchTheUsers(currentPageNumber, pageSize);
        })
        .catch((e) => {
          Toast.showToast(e.message);
        })
        .finally(() => {
          deleteModal.style.display = "none";
        });
    };
  };
}
