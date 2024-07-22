export class LoginPage {
  static async load(): Promise<string> {
    const response = await fetch("src/views/pages/login.html");
    return response.text();
  }

  static initEventListeners() {}
}
