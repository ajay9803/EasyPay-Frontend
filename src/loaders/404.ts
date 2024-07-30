/**
 * Represents a not found page.
 * @class
 */
export class NotFoundPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/404.html");
    return response.text();
  };
}
