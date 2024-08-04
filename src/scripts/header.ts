import { MAIN_LOGO_PATH } from "../constants/images_path";
import { HOME_PATH, LOGIN_PATH, STATEMENTS_PATH } from "../constants/routes";
import Theme from "../enums/theme";
import { INotification } from "../interfaces/notification";
import { Router } from "../router";
import NotificationService from "../services/notification";
import DateUtils from "../utils/date";
import Navigator from "../utils/navigate";
import UserUtils from "../utils/user";
import { userSocket } from "./main";

export class HeaderActions {
  /**
   * Handles user profile actions.
   * Handles events for navigating to user-profile
   *
   * @return {void} This function does not return anything.
   */
  static userProfile: () => void = (): void => {
    const userProfileButton = document.getElementById(
      "user-profile"
    ) as HTMLDivElement;

    /**
     * Navigates to user profile
     */
    userProfileButton.onclick = () => {
      Navigator.navigateTo("/#/user-profile");
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
  static logoutUser: () => void = (): void => {
    const logoutButton = document.getElementById(
      "log-out-button"
    ) as HTMLDivElement;

    logoutButton.onclick = async () => {
      userSocket.disconnect();
      localStorage.clear();

      Navigator.navigateTo(`/${LOGIN_PATH}`);
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

    /**
     * If the user is logged in, display logout button
     * If the user is not logged in, display login button
     */
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
  static notificationsButtonListeners: () => void = (): void => {
    const userMenuBackground = document.getElementById(
      "user-notification-background"
    ) as HTMLDivElement;

    const notificationModal = document.getElementById(
      "notification-modal"
    ) as HTMLDivElement;
    const notificationsButton = document.getElementById(
      "notification-button"
    ) as HTMLDivElement;

    const closeModal = () => {
      userMenuBackground.style.display = "none";
      notificationModal.classList.remove("h-80");
      notificationModal.classList.add("h-0");
    };

    userMenuBackground.onclick = () => {
      closeModal();
    };

    notificationsButton.onclick = async () => {
      userMenuBackground.style.display = "flex";

      const notificationsContainer = document.getElementById(
        "notifications-container"
      ) as HTMLDivElement;

      notificationsContainer.innerHTML = "";
      notificationsContainer.classList.remove("text-center", "mt-5");

      const token = UserUtils.getAccessToken();

      await NotificationService.fetchNotifications(token, 1, 5)
        .then(
          (data: { notifications: INotification[]; totalCount: number }) => {
            /**
             * Loop through the notifications and display them as cards
             */
            data.notifications.forEach((notification) => {
              const notificationDiv = document.createElement(
                "div"
              ) as HTMLDivElement;
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

              const message = document.createElement(
                "p"
              ) as HTMLParagraphElement;
              message.classList.add("text-sm");
              message.innerText = notification.message;

              const date = document.createElement("p") as HTMLParagraphElement;
              date.classList.add("notification-date");
              date.innerText = DateUtils.formatDate(notification.createdAt);

              notificationContent.appendChild(title);
              notificationContent.appendChild(message);
              notificationContent.appendChild(date);

              notificationDiv.appendChild(img);
              notificationDiv.appendChild(notificationContent);

              notificationsContainer.appendChild(notificationDiv);
            });
          }
        )
        .catch((e) => {
          notificationsContainer.innerHTML = e.message;
          notificationsContainer.classList.add("text-center", "mt-5");
        })
        .finally(() => {
          notificationModal.classList.remove("h-0");
          notificationModal.classList.add("h-80");
        });
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

  /**
   * Initializes the event listener for the menu button.
   *
   * @return {Promise<void>} Promise that resolves when the event listener is initialized.
   */
  static menuListener = async (): Promise<void> => {
    const userMenuBackground = document.getElementById(
      "user-menu-background"
    ) as HTMLDivElement;
    const menuButton = document.getElementById("menu-button") as HTMLDivElement;
    const menu = document.getElementById("sliding-menu") as HTMLDivElement;
    menuButton.onclick = () => {
      userMenuBackground.style.display = "block";
      menu.classList.toggle("-translate-x-full");
    };

    userMenuBackground.onclick = () => {
      userMenuBackground.style.display = "none";
      menu.classList.toggle("-translate-x-full");
    };

    const closeMenuButton = document.getElementById(
      "close-menu"
    ) as HTMLButtonElement;

    /**
     * Closes the side menu.
     *
     * @return {void} This function does not return anything.
     */
    const closeSideMenu = (): void => {
      userMenuBackground.style.display = "none";
      menu.classList.toggle("-translate-x-full");
    };
    closeMenuButton.onclick = () => {
      closeSideMenu();
    };

    const sideMenuHomeButton = document.getElementById(
      "side-menu-home"
    ) as HTMLButtonElement;
    /**
     * Event listener for the "side-menu-home" button. Closes the side menu and navigates to the home page.
     *
     * @return {void} This function does not return anything.
     */
    sideMenuHomeButton.onclick = (): void => {
      closeSideMenu();
      Navigator.navigateTo(`/${HOME_PATH}`);
    };

    const sideMenuTransactionButton = document.getElementById(
      "side-menu-transaction"
    ) as HTMLButtonElement;

    sideMenuTransactionButton.onclick = () => {
      closeSideMenu();
      Navigator.navigateTo(`/${STATEMENTS_PATH}`);
    };
  };

  static updateHeaderTabs = () => {
    const hash = window.location.hash;

    const route = hash.split("#")[1];

    const headerTabs = document.querySelectorAll(
      ".header-tab-item"
    ) as NodeListOf<HTMLAnchorElement>;

    headerTabs.forEach((item) => {
      item.classList.remove("header-tab-item-active");

      if (item.href.includes(route)) {
        item.classList.add("header-tab-item-active");
      } else {
        item.classList.add("header-tab-item");
      }
    });
  };
}
