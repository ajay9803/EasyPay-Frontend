import { HOST_NAME } from "../constants/auth";
import { Header } from "../loaders/header";
import { Router } from "../router";
import SocketService from "../utils/socket_service";
import UserUtils from "../utils/user";

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

  const user = UserUtils.getUserDetails();

  if (user) {
    const socketService = new SocketService(HOST_NAME);
    socketService.connect();
  }

  /**
   * Initialize the router.
   */
  Router.init();

  /**
   * Listen for hash changes and load the content.
   */
  window.addEventListener("hashchange", () => Router.loadContent());
});
