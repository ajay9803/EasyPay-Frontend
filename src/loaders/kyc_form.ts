import KycFormActions from "../scripts/kyc_form";

export class KycFormPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/kyc_form.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {
    KycFormActions.submitKycForm();
  };
}
