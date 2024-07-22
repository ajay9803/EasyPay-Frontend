import { HomePage } from "./event_listeners/home";
import { AboutUsPage } from "./event_listeners/about_us";
import { HomeActions } from "./scripts/home";
import { LoginPage } from "./event_listeners/login";

const routes: { [key: string]: { component: any; actions: (() => void)[] } } = {
  "#/home": {
    component: HomePage,
    actions: [
      HomeActions.toggleViewAmount,
      HomeActions.getQuickTransactions,
      HomeActions.getRecentTransactions,
    ],
  },
  "#/about-us": { component: AboutUsPage, actions: [] },
  "#/login": {component: LoginPage, actions: []}
};

export class Router {
  static async loadContent() {
    const hash = window.location.hash || "#/home";
    const route = routes[hash];
    if (route) {
      const content = await route.component.load();
      document.getElementById("body")!.innerHTML = content;
      route.actions.forEach((action) => {
        action();
      });

      route.component.initEventListeners();
    }
  }

  static handleRouteChange() {
    Router.loadContent();
  }
  static init() {
    window.addEventListener("popstate", () => this.handleRouteChange());
    this.handleRouteChange();
  }
}
