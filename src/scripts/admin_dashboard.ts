import {
  MANAGE_USERS_PATH,
  VERIFY_KYC_APPLICATIONS_PATH,
} from "../constants/routes";
import Navigator from "../utils/navigate";

export class AdminDashboardActions {
  static dashboardHeader = () => {
    const hash = window.location.hash;

    const hashArray: string[] = hash.split("/");

    const subRoute = hashArray[hashArray.length - 1];

    const kycApplications = document.getElementById(
      "applications"
    ) as HTMLUListElement;
    const manageUsers = document.getElementById("users") as HTMLUListElement;

    if (subRoute === "manage-users") {
      manageUsers.classList.add("bg-sky-600");
      manageUsers.classList.add("text-white");
    } else {
      kycApplications.classList.add("bg-sky-600");
      kycApplications.classList.add("text-white");
    }

    kycApplications.onclick = (e: MouseEvent) => {
      e.preventDefault();
      Navigator.navigateTo(`/${VERIFY_KYC_APPLICATIONS_PATH}`);
    };

    manageUsers.onclick = (e: MouseEvent) => {
      e.preventDefault();
      Navigator.navigateTo(`/${MANAGE_USERS_PATH}`);
    };
  };
}
