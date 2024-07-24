import { HomePage } from "./loaders/home";
import { AboutUsPage } from "./loaders/about_us";
import { LoginPage } from "./loaders/login";
import { RegisterPage } from "./loaders/register";
import { Header } from "./loaders/header";
import { VerifyOtpPage } from "./loaders/verify_otp";
import { LoadBalancePage } from "./loaders/load_balance";
import { KycFormPage } from "./loaders/kyc_form";

const routes: { [key: string]: { component: any } } = {
  "#/home": {
    component: HomePage,
  },
  "#/about-us": { component: AboutUsPage },
  "#/login": { component: LoginPage },
  "#/register": { component: RegisterPage },
  "#/verify-otp": { component: VerifyOtpPage },
  "#/load-balance": { component: LoadBalancePage },
  "#/fill-kyc-form": { component: KycFormPage },
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
    Header.initEventListeners();
    Router.loadContent();
  }
  static init() {
    window.addEventListener("popstate", () => this.handleRouteChange());
    this.handleRouteChange();
  }
}
