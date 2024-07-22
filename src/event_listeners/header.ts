export class Header {
  static async load(): Promise<string> {
    const response = await fetch("src/views/components/header.html");
    return response.text();
  }

  static initEventListeners() {}
}
