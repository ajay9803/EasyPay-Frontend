import { Header } from "../loaders/header";
import { Router } from "../router";

document.addEventListener("DOMContentLoaded", async () => {
  const header = await Header.load();

  const appHeader = document.getElementById("header") as HTMLHeadElement;
  appHeader.innerHTML = header;

  Router.init();
  window.addEventListener("hashchange", () => Router.loadContent());
});
