export class ForgotPasswordPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/forgot_password.html");
    return response.text();
  };
}
