import Theme from "../enums/theme";
import { Router } from "../router";

export class HeaderActions {
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
    const registerButton = document.getElementById(
      "tab-register-button"
    ) as HTMLDivElement;

    if (user) {
      logoutButton.style.display = "block";
      userProfile.style.display = "flex";
      notificationsButton.style.display = "flex";
      loginButton.style.display = "none";
      registerButton.style.display = "none";
    } else {
      logoutButton.style.display = "none";
      userProfile.style.display = "none";
      notificationsButton.style.display = "none";
      loginButton.style.display = "block";
      registerButton.style.display = "block";
    }
  };
}
