export class AboutUsPage {
  static async load(): Promise<string> {
    const response = await fetch("src/views/pages/about_us.html");
    return response.text();
  }

  static initEventListeners() {}
}
