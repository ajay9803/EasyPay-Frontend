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

    toggleSwitcher.onclick = () => {
      toggleSwitcher.classList.toggle("toggle-button-switcher-left");
      toggleSwitcher.classList.toggle("toggle-button-switcher-right");
      const currentTheme = document.documentElement.getAttribute("theme");

      const newTheme = currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
      document.documentElement.setAttribute("theme", newTheme);
      localStorage.setItem("theme", newTheme);
    };
  };
}
