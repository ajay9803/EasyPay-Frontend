import Theme from "../enums/theme";
import { Router } from "../router";
import Navigator from "../utils/navigate";

export class HeaderActions {
  static initUserActions: () => void = () => {
    const userMenuBackground = document.getElementById(
      "user-menu-background"
    ) as HTMLDivElement;

    const userMenu = document.getElementById("user-menu") as HTMLDivElement;
    const userIcon = document.getElementById(
      "user-profile-icon"
    ) as HTMLDivElement;

    const closeModal = () => {
      userMenuBackground.style.display = "none";
      userMenu.classList.remove("h-32");
      userMenu.classList.add("h-0");
    };

    const userProfileButton = document.getElementById(
      "user-profile-button"
    ) as HTMLDivElement;

    userProfileButton.onclick = () => {
      closeModal();
      Navigator.navigateTo("/#/user-profile");
    };

    userMenuBackground.onclick = () => {
      closeModal();
    };

    userIcon.onclick = () => {
      userMenuBackground.style.display = "flex";
      console.log("user icon clicked");

      userMenu.classList.remove("h-0");
      userMenu.classList.add("h-32");
    };
  };
  
  static toggleSwitch: () => void = () => {
    const currentTheme = localStorage.getItem("theme") ?? "LIGHT";

    document.documentElement.setAttribute(
      "theme",
      currentTheme && currentTheme === Theme.DARK ? "DARK" : "LIGHT"
    );

    const toggleSwitcher = document.getElementById(
      "toggle-switcher"
    ) as HTMLDivElement;

    if (currentTheme === Theme.LIGHT) {
      toggleSwitcher.classList.add("toggle-button-switcher-left");
      toggleSwitcher.classList.remove("toggle-button-switcher-right");
    } else {
      toggleSwitcher.classList.remove("toggle-button-switcher-left");
      toggleSwitcher.classList.add("toggle-button-switcher-right");
    }

    toggleSwitcher.onclick = () => {
      toggleSwitcher.classList.toggle("toggle-button-switcher-left");
      toggleSwitcher.classList.toggle("toggle-button-switcher-right");
      const currentTheme = document.documentElement.getAttribute("theme");

      const newTheme = currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
      document.documentElement.setAttribute("theme", newTheme);
      localStorage.setItem("theme", newTheme);
    };
  };

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
}
