import Router from "universal-router";
import { Header } from "../views/components/header";

document.addEventListener("DOMContentLoaded", () => {
  Header.header();

  // custom routers using Universal-Router
  const router = new Router([
    { path: "/", action: () => "Home Page" },
    { path: "/two", action: () => "Page Two" },
  ]);

  // function to navigate to new-page
  const navigate = (path: string) => {
    history.pushState(null, "", path);
    handleNavigation();
  };

  const handleNavigation = async () => {
    const pathName = window.location.pathname;
    console.log(pathName);
    const result = await router.resolve(pathName);
    console.log("The result is: ", result);
    if (typeof result === "string") {
    }
  };
});
