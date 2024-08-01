import { Router } from "../router";

/**
 * The Navigator class provides static methods for navigating to different pages.
 */
class Navigator {
  /**
   * Navigates the user to the specified path.
   *
   * @param {string} path - The path to navigate to.
   * @returns {void}
   */
  static navigateTo = (path: string): void => {
    window.history.pushState(null, "", path);
    Router.handleRouteChange();
  };
}

export default Navigator;
