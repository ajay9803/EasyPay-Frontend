import Theme from "../enums/theme";

export class HeaderActions {
  static toggleSwitch: () => void = () => {
    const currentTheme = localStorage.getItem("theme");

    document.documentElement.setAttribute(
      "theme",
      currentTheme === Theme.DARK ? "DARK" : "LIGHT"
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

  static getLoggedInState: () => void = () => {
    const user = localStorage.getItem("user");

    const logoutButton = document.getElementById(
      "log-out-button"
    ) as HTMLDivElement;

    const notificationsButton = document.getElementById('notifications-button') as HTMLDivElement;

    const userProfile = document.getElementById(
      "user-profile"
    ) as HTMLDivElement;

    console.log(user);
    if (user) {
      logoutButton.style.display = "block";
      userProfile.style.display = "block";
      notificationsButton.style.display = "block";
    } else {
      logoutButton.style.display = "none";
      userProfile.style.display = "none";
      notificationsButton.style.display = "none";

      const sideIcons = document.getElementById("side-icons") as HTMLDivElement;

      const loginButton = document.createElement("a") as HTMLAnchorElement;
      loginButton.innerHTML = "Login";
      loginButton.href = "/#/login";
      loginButton.classList.add("login-button");
      sideIcons.appendChild(loginButton);

      const registerButton = document.createElement("a") as HTMLAnchorElement;
      registerButton.innerHTML = "Register";
      registerButton.href = "/#/register"; 
      registerButton.classList.add("register-button");
      sideIcons.appendChild(registerButton);
    }
  };
}
