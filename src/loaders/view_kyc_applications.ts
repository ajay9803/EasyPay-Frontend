import { ViewKycApplicationsAction } from "../scripts/view_kyc_applications";

export class ViewKycApplications {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/view_kyc_applications.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {
    ViewKycApplicationsAction.fetchApplications("All");
  };
}
