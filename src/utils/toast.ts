/**
 * A class that provides functionality for displaying toast messages.
 */
export class Toast {
  static showToast = (errorMessage: string) => {
    const app = document.getElementById("app") as HTMLDivElement;

    const messageElement = document.createElement("div");
    messageElement.classList.add("toast");
    messageElement.innerHTML = errorMessage;

    app.appendChild(messageElement);
  };
}
