import { HOST_NAME } from "../constants/auth";
import { Header } from "../loaders/header";
import { Router } from "../router";
import SocketService from "../utils/socket_service";
import UserUtils from "../utils/user";

export let userSocket: SocketService;

/**
 * Creates a new SocketService instance for the user and connects it to the server.
 * If a SocketService instance already exists, it disconnects and reconnects.
 *
 * @return {void}
 */
export const createUserSocket = (): void => {
  const user = UserUtils.getUserDetails();

  if (user) {
    if (userSocket) {
      userSocket.disconnect();
      userSocket.connect();
    }
    if (!userSocket) {
      userSocket = new SocketService(HOST_NAME);
      userSocket.connect();
    }
  }
};

/**
 * This is the main entry point for the application.
 * It loads the Header component and sets up the router.
 * It also sets up the socket service.
 * @module main
 */
document.addEventListener("DOMContentLoaded", async () => {
  /**
   * Load the header component.
   */
  const header = await Header.load();

  const appHeader = document.getElementById("header") as HTMLHeadElement;
  appHeader.innerHTML = header;

  /**
   * Initialize the router.
   */
  Router.init();

  /**
   * Listen for hash changes and load the content.
   */
  window.addEventListener("hashchange", () => {
    Router.loadContent();
  });
});
