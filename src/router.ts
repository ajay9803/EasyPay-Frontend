import { HomePage } from "./loaders/home";
import { AboutUsPage } from "./loaders/about_us";
import { LoginPage } from "./loaders/login";
import { RegisterPage } from "./loaders/register";
import { Header } from "./loaders/header";
import { VerifyOtpPage } from "./loaders/verify_otp";
import { LoadBalancePage } from "./loaders/load_balance";
import { KycFormPage } from "./loaders/kyc_form";
import { AdminDashboard } from "./loaders/admin_dashboard";
import { ViewKycApplications } from "./loaders/view_kyc_applications";

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
  "#/admin": { component: AdminDashboard },
  "#/admin/verify-kyc-applications": { component: ViewKycApplications },
};

export class Router {
  static async loadContent() {
    const hash = window.location.hash || "#/home";
    const route = routes[hash];
    if (route) {
      if (hash.startsWith("#/admin")) {
        const adminMarkup = await AdminDashboard.load();
        document.getElementById("body")!.innerHTML = adminMarkup;
        const subRoute = routes[hash];
        if (subRoute) {
          const markup = await subRoute.component.load();
          document.getElementById("main-content")!.innerHTML = markup;
          subRoute.component.initEventListeners();
        } else {
          // document.getElementById("main-content")!.innerHTML =
          //   await notFound.load();
        }
      } else {
        const content = await route.component.load();
        document.getElementById("body")!.innerHTML = content;

        route.component.initEventListeners();
      }
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
