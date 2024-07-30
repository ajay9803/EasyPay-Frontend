import { HOST_NAME } from "../constants/auth";
import { Header } from "../loaders/header";
import { Router } from "../router";
import SocketService from "../utils/socket_service";
import { Toast } from "../utils/toast";
import UserUtils from "../utils/user";

document.addEventListener("DOMContentLoaded", async () => {
  const header = await Header.load();

  const appHeader = document.getElementById("header") as HTMLHeadElement;
  appHeader.innerHTML = header;

  const user = UserUtils.getUserDetails();

  if (user) {
    const socketService = new SocketService(HOST_NAME,);
    socketService.connect();
  } 

  Router.init();
  window.addEventListener("hashchange", () => Router.loadContent());
});
