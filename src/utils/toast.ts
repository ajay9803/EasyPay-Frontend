export class Toast {
  static showToast = (errorMessage: string) => {
    const app = document.getElementById("app") as HTMLDivElement;

    const messageElement = document.createElement("div");
    messageElement.classList.add("toast");
    messageElement.innerHTML = errorMessage;

    app.appendChild(messageElement);

    setTimeout(() => {
      if (messageElement.parentElement) {
        messageElement.parentElement.removeChild(messageElement);
      }
    }, 3000);
  };
}
