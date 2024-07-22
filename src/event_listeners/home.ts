export class HomePage {
  static async load(): Promise<string> {
    const response = await fetch("src/views/pages/home.html");
    return response.text();
  }

  static initEventListeners() {}
}
