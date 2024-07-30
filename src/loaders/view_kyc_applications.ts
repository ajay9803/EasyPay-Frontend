import { ViewKycApplicationsAction } from "../scripts/view_kyc_applications";

/**
 * The ViewKycApplications class represents the view KYC applications page.
 * It is responsible for loading and initializing the view KYC applications page.
 */
export class ViewKycApplications {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/view_kyc_applications.html");
    return response.text();
  };

  /**
   * Initializes the event listeners for the ViewKycApplications page.
   * @returns {void}
   */
  static initEventListeners: () => void = () => {
    ViewKycApplicationsAction.fetchApplications("All");
  };
}
