import KycFormActions from "../scripts/kyc_form";

/**
 * The KycFormPage class represents the KYC form page. It is responsible
 * for loading and initializing the KYC form page.
 */
export class KycFormPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/kyc_form.html");
    return response.text();
  };

  /**
   * Initializes the event listeners for the KYC form page.
   *
   * @returns {void}
   */
  static initEventListeners: () => void = () => {
    KycFormActions.submitKycForm();
  };
}
