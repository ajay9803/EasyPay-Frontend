import { HomePage } from "./event_listeners/home";
import { AboutUsPage } from "./event_listeners/about_us";
import { HomeActions } from "./scripts/home";
import { LoginPage } from "./event_listeners/login";
import { LoginActions } from "./scripts/login";
import { RegisterPage } from "./event_listeners/register";
import { RegisterActions } from "./scripts/register";

const routes: { [key: string]: { component: any } } = {
  "#/home": {
    component: HomePage,
  },
  "#/about-us": { component: AboutUsPage },
  "#/login": { component: LoginPage },
  "#/register": { component: RegisterPage },
};

export class Router {
  static async loadContent() {
    const hash = window.location.hash || "#/home";
    const route = routes[hash];
    if (route) {
      const content = await route.component.load();
      document.getElementById("body")!.innerHTML = content;

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
