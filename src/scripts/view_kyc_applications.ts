import KycService from "../services/kyc";
import { Toast } from "../utils/toast";
import UserUtils from "../utils/user";

/**
 * Class representing the actions for the view KYC applications page.
 */
export class ViewKycApplicationsAction {
  /**
   * Fetches the KYC applications based on the given status.
   *
   * @param {string} status - The status of the applications to fetch.
   * @return {Promise<void>} A promise that resolves when the applications are fetched.
   */
  static fetchApplications: (status: string) => Promise<void> = async (
    status: string
  ): Promise<void> => {
    const selectInput = document.getElementById(
      "select-application-status"
    ) as HTMLSelectElement;

    const searchInput = document.getElementById("email") as HTMLInputElement;

    /**
     * Fetches the KYC applications based on the given status.
     *
     * @param {string} status - The status of the applications to fetch.
     * @param {string} email - The email of the user.
     * @return {Promise<void>} A promise that resolves when the applications are fetched.
     */
    const fetchTheApplications = async (
      status: string,
      email: string
    ): Promise<void> => {
      const accessToken = UserUtils.getAccessToken();
      const tableBody = document.getElementById(
        "applications-table-body"
      ) as HTMLDivElement;

      tableBody.classList.remove("py-5");
      await KycService.fetchKycApplications(status, email, accessToken)
        .then((data) => {
          tableBody.innerHTML = "";
          tableBody.classList.remove("application-padding-y");
          tableBody.classList.add("table-body");

          data.applications.forEach((application: any) => {
            const tableRow = document.createElement(
              "div"
            ) as HTMLTableRowElement;
            tableRow.classList.add("kyc-table-row");

            const userName = document.createElement(
              "p"
            ) as HTMLParagraphElement;
            userName.classList.add("table-row-username");
            userName.innerHTML = application.username;
            tableRow.appendChild(userName);

            const actions = document.createElement("div") as HTMLDivElement;
            actions.classList.add("table-item-actions");

            if (application.status === "Pending") {
              const approveButton = document.createElement(
                "button"
              ) as HTMLButtonElement;
              approveButton.classList.add("approve-button");
              approveButton.innerHTML = "Approve";
              actions.appendChild(approveButton);

              approveButton.onclick = async () => {
                await KycService.verifyKycApplication(
                  accessToken,
                  application.userId,
                  true
                )
                  .then(async (data) => {
                    const selectedStatus = selectInput.value;
                    await fetchTheApplications(
                      selectedStatus,
                      searchInput.value
                    );
                    Toast.showToast(data.message);
                  })
                  .catch((e) => {
                    Toast.showToast(e.message);
                  });
              };

              const rejectButton = document.createElement(
                "button"
              ) as HTMLButtonElement;
              rejectButton.classList.add("reject-button");
              rejectButton.innerHTML = "Reject";
              actions.appendChild(rejectButton);
              rejectButton.onclick = async () => {
                await KycService.verifyKycApplication(
                  accessToken,
                  application.userId,
                  false
                )
                  .then(async (data) => {
                    const selectedStatus = selectInput.value;
                    await fetchTheApplications(
                      selectedStatus,
                      selectInput.value
                    );
                    Toast.showToast(data.message);
                  })
                  .catch((e) => {
                    Toast.showToast(e.message);
                  });
              };
            }

            const viewDetailsButton = document.createElement(
              "button"
            ) as HTMLButtonElement;
            viewDetailsButton.classList.add("view-details-button");
            viewDetailsButton.innerHTML = "View Details";
            actions.appendChild(viewDetailsButton);

            /**
             * Attach a click event listener to the view details button.
             * When clicked, it will open a modal with the user's details.
             */
            viewDetailsButton.onclick = () => {
              const citizenshipNumber = application.citizenshipNumber;
              const issueDate = application.citizenshipIssueDate;
              const userPhoto = application.userPhotoUrl;
              const citizenshipPhoto = application.citizenshipPhotoUrl;

              const modalContent = document.getElementById(
                "modal-content"
              ) as HTMLDivElement;
              modalContent.innerHTML = "";

              const createDetailDiv = (label: string, value: string) => {
                const div = document.createElement("div") as HTMLDivElement;
                div.classList.add("kyc-details");
                const labelElement = document.createElement(
                  "p"
                ) as HTMLParagraphElement;
                labelElement.innerHTML = label;
                const valueElement = document.createElement(
                  "p"
                ) as HTMLParagraphElement;
                valueElement.innerHTML = value;
                valueElement.classList.add("kyc-details-value");
                div.appendChild(labelElement);
                div.appendChild(valueElement);
                return div;
              };

              const createImageDiv = (
                label: string,
                src: string,
                alt: string
              ) => {
                const div = document.createElement("div") as HTMLDivElement;
                div.classList.add("kyc-img-div");
                const imageTitle = document.createElement(
                  "p"
                ) as HTMLParagraphElement;
                imageTitle.innerHTML = label;
                const link = document.createElement("a") as HTMLAnchorElement;
                link.href = src;
                link.target = "_blank";
                const img = document.createElement("img") as HTMLImageElement;
                img.src = src;
                img.alt = alt;
                img.classList.add("kyc-img");

                link.appendChild(img);
                div.appendChild(imageTitle);
                div.appendChild(link);
                return div;
              };

              modalContent.appendChild(
                createDetailDiv("Citizenship Number:", citizenshipNumber)
              );
              modalContent.appendChild(
                createDetailDiv("Issue Date:", issueDate)
              );

              const images = document.createElement("div") as HTMLDivElement;
              images.classList.add("mt-5");
              modalContent.appendChild(images);

              modalContent.appendChild(
                createImageDiv("User Photo:", userPhoto, "User Photo")
              );
              modalContent.appendChild(
                createImageDiv(
                  "Citizenship Photo:",
                  citizenshipPhoto,
                  "Citizenship Photo"
                )
              );

              const modal = document.getElementById(
                "kyc-details-modal"
              ) as HTMLElement;
              modal.classList.remove("hidden");
              modal.classList.add("flex");

              const closeModal = document.getElementById(
                "close-modal"
              ) as HTMLElement;
              closeModal.onclick = () => {
                modal.classList.add("hidden");
                modal.classList.remove("flex");
              };
            };

            tableRow.appendChild(actions);

            tableBody.appendChild(tableRow);
          });
        })
        .catch((e) => {
          tableBody.innerHTML = e.message;
          tableBody.classList.add("py-5", "text-center");
        });
    };

    fetchTheApplications(status, searchInput.value);

    /**
     * Event handler for the 'onchange' event of the select input.
     *
     * @returns {Promise<void>} A promise that resolves when the event handler is complete.
     */
    selectInput.onchange = async (): Promise<void> => {
      const selectedStatus = selectInput.value;
      await fetchTheApplications(selectedStatus, searchInput.value);
    };

    const viewKycApplicationsForm = document.getElementById(
      "view-kyc-applications-form"
    ) as HTMLFormElement;

    viewKycApplicationsForm.addEventListener(
      "submit",
      async (e: SubmitEvent) => {
        e.preventDefault();
        await fetchTheApplications(status, searchInput.value);
      }
    );
  };
}
