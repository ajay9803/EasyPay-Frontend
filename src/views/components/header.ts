import Theme from "../../enums/theme";

interface IHeaderTabItem {
  title: string;
  className: string;
}

export class Header {
  static header = () => {
    const headerTabItems: IHeaderTabItem[] = [
      {
        title: "Home",
        className: "header-tab-item",
      },
      {
        title: "Transactions",
        className: "header-tab-item",
      },
      {
        title: "Analytics",
        className: "header-tab-item",
      },
      {
        title: "Settings",
        className: "header-tab-item",
      },
    ];

    const userImage =
      "https://xsgames.co/randomusers/assets/avatars/male/74.jpg";

    const app = document.getElementById("app") as HTMLDivElement;

    const currentTheme = localStorage.getItem("theme");
    console.log("The initial theme is: ", currentTheme);

    document.documentElement.setAttribute(
      "theme",
      currentTheme === Theme.DARK ? Theme.DARK : Theme.LIGHT
    );

    const header = document.createElement("div");
    header.classList.add("header");
    app.appendChild(header);

    const headerItems = document.createElement("div") as HTMLDivElement;
    headerItems.classList.add("header-items");
    header.appendChild(headerItems);

    const headerTabs = document.createElement("div") as HTMLDivElement;
    headerTabs.classList.add("header-tabs");
    headerItems.appendChild(headerTabs);

    headerTabItems.forEach((headerTabItem) => {
      let headerTabElement = document.createElement("div") as HTMLDivElement;
      headerTabElement.innerHTML = headerTabItem.title;
      headerTabs.appendChild(headerTabElement);
      headerTabElement.classList.add(headerTabItem.className);
    });

    const headerSideTabs = document.createElement("div") as HTMLDivElement;
    headerSideTabs.classList.add("header-side-tabs");
    headerItems.appendChild(headerSideTabs);

    const userProfileItem = document.createElement("div") as HTMLDivElement;
    userProfileItem.classList.add("user-profile-item");
    userProfileItem.style.backgroundImage = `URL(${userImage})`;
    headerSideTabs.appendChild(userProfileItem);

    const headerSideTabsSideIcons = document.createElement(
      "div"
    ) as HTMLDivElement;
    headerSideTabsSideIcons.classList.add("header-side-tabs-side-icons");
    headerSideTabs.appendChild(headerSideTabsSideIcons);

    const notificationsButton = document.createElement("div") as HTMLDivElement;
    notificationsButton.classList.add("notifications-button");
    headerSideTabsSideIcons.appendChild(notificationsButton);

    const iconElement = document.createElement("i");
    iconElement.classList.add("fas", "fa-bell");

    notificationsButton.appendChild(iconElement);

    const logoutButton = document.createElement("div") as HTMLDivElement;
    logoutButton.classList.add("log-out-button");
    headerSideTabsSideIcons.appendChild(logoutButton);

    const logoutButtonTitle = document.createElement("p");

    logoutButtonTitle.classList.add("log-out-button-title");
    logoutButtonTitle.innerHTML = "Logout";
    logoutButton.appendChild(logoutButtonTitle);

    const toggleThemeButton = document.createElement("div") as HTMLDivElement;
    toggleThemeButton.classList.add("toggle-theme-button");
    headerSideTabsSideIcons.appendChild(toggleThemeButton);

    const toggleSwitcher = document.createElement("div") as HTMLDivElement;
    toggleSwitcher.classList.add(
      currentTheme === Theme.LIGHT
        ? "toggle-button-switcher-left"
        : "toggle-button-switcher-right"
    );
    toggleThemeButton.appendChild(toggleSwitcher);

    toggleSwitcher.onclick = () => {
      toggleSwitcher.classList.toggle("toggle-button-switcher-left");
      toggleSwitcher.classList.toggle("toggle-button-switcher-right");
      const currentTheme = document.documentElement.getAttribute("theme");
      console.log("The current theme is: ", currentTheme);

      const newTheme = currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
      document.documentElement.setAttribute("theme", newTheme);
      localStorage.setItem("theme", newTheme);
    };
  };
}
