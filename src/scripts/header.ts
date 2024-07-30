import { MAIN_LOGO_PATH } from "../constants/images_path";
import Theme from "../enums/theme";
import { Router } from "../router";
import Navigator from "../utils/navigate";

export class HeaderActions {
  /**
   * Handles user profile actions.
   * Handles events for opening and closing user menu
   *
   * @return {void} This function does not return anything.
   */
  static userProfile: () => void = () => {
    const userMenuBackground = document.getElementById(
      "user-menu-background"
    ) as HTMLDivElement;

    const userMenu = document.getElementById("user-menu") as HTMLDivElement;
    const userIcon = document.getElementById(
      "user-profile-icon"
    ) as HTMLDivElement;

    // Close the user menu
    const closeModal = () => {
      userMenuBackground.style.display = "none";
      userMenu.classList.remove("h-32");
      userMenu.classList.add("h-0");
    };

    const userProfileButton = document.getElementById(
      "user-profile-button"
    ) as HTMLDivElement;

    /**
     * Closes the user menu
     * Navigates to user profile
     */
    userProfileButton.onclick = () => {
      closeModal();
      Navigator.navigateTo("/#/user-profile");
    };

    userMenuBackground.onclick = () => {
      closeModal();
    };

    /**
     * Handles the click event on the user icon.
     *
     * This function sets the display style of the user menu background to "flex" to make it visible.
     * It also removes the "h-0" class from the user menu and adds the "h-32" class to make it visible.
     *
     * @return {void} This function does not return anything.
     */
    userIcon.onclick = (): void => {
      userMenuBackground.style.display = "flex";

      userMenu.classList.remove("h-0");
      userMenu.classList.add("h-32");
    };
  };

  /**
   * Toggles the theme of the application.
   *
   * @returns {void}
   */
  static toggleSwitch: () => void = (): void => {
    const currentTheme = localStorage.getItem("theme") ?? "LIGHT";

    document.documentElement.setAttribute(
      "theme",
      currentTheme && currentTheme === Theme.DARK ? "DARK" : "LIGHT"
    );

    const toggleSwitcher = document.getElementById(
      "toggle-switcher"
    ) as HTMLDivElement;

    /**
     * Toggles the class list of the toggle switcher based on the current theme.
     */
    if (currentTheme === Theme.LIGHT) {
      toggleSwitcher.classList.add("toggle-button-switcher-left");
      toggleSwitcher.classList.remove("toggle-button-switcher-right");
    } else {
      toggleSwitcher.classList.remove("toggle-button-switcher-left");
      toggleSwitcher.classList.add("toggle-button-switcher-right");
    }

    /**
     * Toggles the theme of the application.
     *
     * @return {void} This function does not return anything.
     */
    toggleSwitcher.onclick = (): void => {
      toggleSwitcher.classList.toggle("toggle-button-switcher-left");
      toggleSwitcher.classList.toggle("toggle-button-switcher-right");
      const currentTheme = document.documentElement.getAttribute("theme");

      const newTheme = currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
      document.documentElement.setAttribute("theme", newTheme);
      localStorage.setItem("theme", newTheme);
    };
  };

  /**
   * Handles the logout button click event.
   *
   * @return {void} This function does not return anything.
   */
  static logoutUser: () => void = () => {
    const logoutButton = document.getElementById(
      "log-out-button"
    ) as HTMLDivElement;

    logoutButton.onclick = () => {
      localStorage.clear();
      window.history.pushState(null, "", "/#/login");
      Router.handleRouteChange();
    };
  };

  /**
   * Gets the logged in state of the user.
   * Display logout button if the user is logged in
   */
  static getLoggedInState: () => void = () => {
    const user = localStorage.getItem("user");

    const logoutButton = document.getElementById(
      "log-out-button"
    ) as HTMLDivElement;

    const notificationsButton = document.getElementById(
      "notifications-button"
    ) as HTMLDivElement;

    const userProfile = document.getElementById(
      "user-profile"
    ) as HTMLDivElement;

    const loginButton = document.getElementById(
      "tab-login-button"
    ) as HTMLDivElement;

    if (user) {
      logoutButton.style.display = "flex";
      userProfile.style.display = "flex";
      notificationsButton.style.display = "flex";
      loginButton.style.display = "none";
    } else {
      logoutButton.style.display = "none";
      userProfile.style.display = "none";
      notificationsButton.style.display = "none";
      loginButton.style.display = "block";
    }
  };

  /**
   * Sets up listeners for the notifications button.
   * When the notifications button is clicked, it displays the notification modal with the list of notifications.
   * Each notification is displayed as a card with the Easy Pay logo, title, message, and date.
   * Clicking on the "View More Notifications" button navigates to the "/#/notifications" page.
   *
   * @return {void}
   */
  static notificationsButtonListeners: () => void = () => {
    const notifications: {
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
    const userMenuBackground = document.getElementById(
      "user-notification-background"
    ) as HTMLDivElement;

    const notificationModal = document.getElementById(
      "notification-modal"
    ) as HTMLDivElement;
    const notificationsIcon = document.getElementById(
      "notification-icon"
    ) as HTMLDivElement;

    const closeModal = () => {
      userMenuBackground.style.display = "none";
      notificationModal.classList.remove("h-80");
      notificationModal.classList.add("h-0");
    };

    userMenuBackground.onclick = () => {
      closeModal();
    };

    notificationsIcon.onclick = () => {
      userMenuBackground.style.display = "flex";

      const notificationsContainer = document.getElementById(
        "notifications-container"
      ) as HTMLDivElement;

      notificationsContainer.innerHTML = "";

      notifications.forEach((notification) => {
        const notificationDiv = document.createElement("div") as HTMLDivElement;
        notificationDiv.className = "notification-div";

        const img = document.createElement("img");
        img.src = MAIN_LOGO_PATH;
        img.alt = "easy pay logo";
        img.className = "w-8 h-8";

        const notificationContent = document.createElement(
          "div"
        ) as HTMLDivElement;
        notificationContent.classList.add("notification-content");

        const title = document.createElement("h3") as HTMLHeadingElement;
        title.classList.add("notification-title");
        title.innerText = "Easy Pay";

        const message = document.createElement("p") as HTMLParagraphElement;
        message.classList.add("text-sm");
        message.innerText = notification.message;

        const date = document.createElement("p") as HTMLParagraphElement;
        date.classList.add("notification-date");
        date.innerText = notification.date;

        notificationContent.appendChild(title);
        notificationContent.appendChild(message);
        notificationContent.appendChild(date);

        notificationDiv.appendChild(img);
        notificationDiv.appendChild(notificationContent);

        notificationsContainer.appendChild(notificationDiv);
      });

      notificationModal.classList.remove("h-0");
      notificationModal.classList.add("h-80");
    };

    const viewMoreNotificationsButton = document.getElementById(
      "view-more-notifications"
    ) as HTMLButtonElement;

    /**
     * Closes the notification modal and navigates to the notifications page.
     *
     * @return {void} This function does not return anything.
     */
    viewMoreNotificationsButton.onclick = (): void => {
      closeModal();
      Navigator.navigateTo("/#/notifications");
    };
  };
}
