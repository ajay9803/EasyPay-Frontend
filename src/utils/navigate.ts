import { Router } from "../router";

class Navigator {
  static navigateTo = (path: string) => {
    window.history.pushState(null, "", path);
    Router.loadContent();
  };
}

export default Navigator;
