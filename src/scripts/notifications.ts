export class NotificationsPageActions {
  notifications: {
    message: string;
    date: string;
  }[] = [
    {
      message: "This is test message.",
      date: "10:00",
    },
    {
      message: "This is test message.",
      date: "10:00",
    },
    {
      message: "This is test message.",
      date: "10:00",
    },
  ];
  static fetchNotifications: () => void = () => {
    const notificationsSection = document.getElementById(
      "notifications-section"
    ) as HTMLDivElement;

    // Clear the notifications section first
    notificationsSection.innerHTML = "";

    const notifications = new NotificationsPageActions().notifications;

    notifications.forEach((notification) => {
      // Create the main notification container
      const notificationDiv = document.createElement("div");
      notificationDiv.className = "notification-item";

      // Create the image container
      const imgContainer = document.createElement("div");
      imgContainer.className = "notification-img-container";

      // Create the image element
      const img = document.createElement("img");
      img.src = "./images/e-wallet.png";
      img.alt = "easy pay logo";
      img.className = "notification-img";
      imgContainer.appendChild(img);

      // Create the text container
      const textContainer = document.createElement("div");
      textContainer.className = "notification-text-container";

      // Create the title element
      const title = document.createElement("h3");
      title.className = "notification-item-title";
      title.innerText = "Easy Pay";

      // Create the message element
      const message = document.createElement("p");
      message.className = "text-sm";
      message.innerText = notification.message;

      // Create the date element
      const date = document.createElement("p");
      date.className = "notification-item-date";
      date.innerText = notification.date;

      // Append title, message, and date to the text container
      textContainer.appendChild(title);
      textContainer.appendChild(message);
      textContainer.appendChild(date);

      // Append the image container and text container to the main notification container
      notificationDiv.appendChild(imgContainer);
      notificationDiv.appendChild(textContainer);

      // Append the main notification container to the notifications section
      notificationsSection.appendChild(notificationDiv);
    });
  };
}
