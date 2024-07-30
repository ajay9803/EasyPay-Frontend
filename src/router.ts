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
import { NotFoundPage } from "./loaders/404";
import { SendMoneyPage } from "./loaders/send_money";
import { ForgotPasswordPage } from "./loaders/forgot_password";
import { StatementsPage } from "./loaders/statement";
import { UserProfilePage } from "./loaders/user_profile";
import { ResetPasswordPage } from "./loaders/reset_password";
import { SetNewPasswordPage } from "./loaders/set_new_password";

/**
 * A mapping of route paths to their corresponding components.
 * @type {{[key: string]: {component: any}}}
 */
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
  "#/send-money": { component: SendMoneyPage },
  "#/forgot-password": { component: ForgotPasswordPage },
  "#/statements": { component: StatementsPage },
  "#/user-profile": { component: UserProfilePage },
  "#/reset-password": { component: ResetPasswordPage },
  "#/set-new-password": { component: SetNewPasswordPage },
};

/**
 * The Router class is responsible for managing the routing of the application.
 * It maps route paths to their corresponding components and loads the content
 * of the respective pages based on the current hash in the URL.
 */
export class Router {
  /**
   * Loads the content based on the current hash of the window.
   *
   * @return {Promise<void>} A Promise that resolves when the content is loaded.
   */
  static loadContent: () => Promise<void> = async () => {
    const hash = window.location.hash || "#/home";
    const staticRoute = routes[hash];

    if (hash) {
      /**
       * Check for dynamic set-new-password route
       * Load set-new-password page
       */
      if (hash.includes("/set-new-password")) {
        const route = routes["#/set-new-password"];
        console.log(route);
        const content = await route.component.load();
        document.getElementById("body")!.innerHTML = content;
        route.component.initEventListeners();
      } else {
        // Check if a static route exists for the current hash
        if (staticRoute) {
          // Check if the current hash starts with "#/admin"
          // Load the markup for the admin page
          if (hash.startsWith("#/admin")) {
            const adminMarkup = await AdminDashboard.load();
            document.getElementById("body")!.innerHTML = adminMarkup;
            // Get the sub-route for the current hash
            const subRoute = routes[hash];
            // If a sub-route exists
            if (subRoute) {
              const markup = await subRoute.component.load();
              document.getElementById("main-content")!.innerHTML = markup;
              subRoute.component.initEventListeners();
            } else {
              // If no sub-route exists, load and display the 404 page
              document.getElementById("body")!.innerHTML =
                await NotFoundPage.load();
            }
          } else {
            // If the current hash does not start with "#/admin", load and display the content for the static route
            const content = await staticRoute.component.load();
            document.getElementById("body")!.innerHTML = content;
            staticRoute.component.initEventListeners();
          }
        } else {
          // If no static route exists for the current hash, load and display the 404 page
          document.getElementById("body")!.innerHTML =
            await NotFoundPage.load();
        }
      }
    }
  };

  /**
   * Handles route change and updates the content of the page accordingly.
   *
   * @return {Promise<void>} Promise that resolves when the content is updated.
   */
  static handleRouteChange() {
    Header.initEventListeners();
    Router.loadContent();
  }

  /**
   * Initializes the router by adding a popstate event listener and calling the handleRouteChange function.
   *
   * @return {void} This function does not return anything.
   */
  static init: () => void = () => {
    window.addEventListener("popstate", () => this.handleRouteChange());
    this.handleRouteChange();
  }
}
