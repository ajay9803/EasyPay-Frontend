export class Header {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/components/header.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {};
}
