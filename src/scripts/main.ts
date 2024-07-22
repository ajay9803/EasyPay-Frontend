import { Header } from "../event_listeners/header";
import { Router } from "../router";
import { HeaderActions } from "./header";

document.addEventListener("DOMContentLoaded", async () => {
  const header = await Header.load();

  const appHeader = document.getElementById("header") as HTMLHeadElement;
  appHeader.innerHTML = header;
  HeaderActions.toggleSwitch();

  Router.init();
  window.addEventListener("hashchange", () => Router.loadContent());
});
