import { MAIN_LOGO_PATH } from "../constants/images_path";
import { INotification } from "../interfaces/notification";
import NotificationService from "../services/notification";
import DateUtils from "../utils/date";
import UserUtils from "../utils/user";

/**
 * Class representing the actions for the notifications page.
 *
 * @class
 */
export class NotificationsPageActions {
  /**
   * Fetches the notifications for the user and populates the notifications section of the page.
   *
   * @return {Promise<void>} This function does not return anything.
   */
  static fetchNotifications: () => Promise<void> = async (): Promise<void> => {
    const notificationsSection = document.getElementById(
      "notifications-section"
    ) as HTMLDivElement;

    const token = UserUtils.getAccessToken();

    /**
     * Define current page number
     * Define page size
     */
    let currentPageNumber = 1;
    const pageSize = 5;

    const paginationControls = document.getElementById(
      "pagination-controls"
    ) as HTMLDivElement;

    const notificationsErrorElement = document.getElementById(
      "notifications-error"
    ) as HTMLDivElement;
    const notificationsErrorMessage = document.getElementById(
      "notifications-error-message"
    ) as HTMLParagraphElement;

    /**
     * Fetches the notifications for the user and populates the notifications section of the page.
     *
     * @param {string} token - The access token of the user.
     * @param {number} page - The page number of notifications to fetch.
     * @param {number} size - The size of each page of notifications.
     * @return {Promise<void>} This function does not return anything.
     */
    const fetchTheNotifications = async (
      token: string,
      page: number,
      size: number
    ): Promise<void> => {
      // Hide the notifications error element
      notificationsErrorElement.style.display = "none";
      await NotificationService.fetchNotifications(token, page, size)
        .then(
          (data: { notifications: INotification[]; totalCount: number }) => {
            // Clear the notifications section first
            notificationsSection.innerHTML = "";

            data.notifications.forEach((notification) => {
              // Create the main notification container
              const notificationDiv = document.createElement("div");
              notificationDiv.className = "notification-item";

              // Create the image container
              const imgContainer = document.createElement("div");
              imgContainer.className = "notification-img-container";

              // Create the image element
              const img = document.createElement("img");
              img.src = MAIN_LOGO_PATH;
              img.alt = "easy pay logo";
              img.className = "notification-img";
              imgContainer.appendChild(img);

              // Create the text container
              const textContainer = document.createElement("div");
              textContainer.className = "notification-text-container";

              // Create the title element
              const title = document.createElement("h3");
              title.className = "notification-item-title";
              title.innerText = "Easy Pay";

              // Create the message element
              const message = document.createElement("p");
              message.className = "text-sm";
              message.innerText = notification.message;

              // Create the date element
              const date = document.createElement("p");
              date.className = "notification-item-date";
              date.innerText = DateUtils.formatDate(notification.createdAt);

              // Append title, message, and date to the text container
              textContainer.appendChild(title);
              textContainer.appendChild(message);
              textContainer.appendChild(date);

              // Append the image container and text container to the main notification container
              notificationDiv.appendChild(imgContainer);
              notificationDiv.appendChild(textContainer);

              // Append the main notification container to the notifications section
              notificationsSection.appendChild(notificationDiv);
            });

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
              await fetchTheNotifications(token, currentPageNumber, pageSize);
            };

            nextPageButton.onclick = async () => {
              currentPageNumber++;
              await fetchTheNotifications(token, currentPageNumber, pageSize);
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
                await fetchTheNotifications(token, currentPageNumber, pageSize);
              };
            }
          }
        )
        .catch((e) => {
          notificationsErrorElement.style.display = "flex";
          notificationsErrorMessage.innerHTML =
            e.message || "Something went wrong. Please try again.";
          paginationControls.style.display = "none";
        });
    };

    fetchTheNotifications(token, 1, pageSize);
  };
}
