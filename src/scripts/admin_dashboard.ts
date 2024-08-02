import { MANAGE_USERS_PATH, VERIFY_KYC_APPLICATIONS_PATH } from "../constants/routes";
import Navigator from "../utils/navigate";

export class AdminDashboardActions {
  static dashboardHeader = () => {
    console.log("Dashboard Header is running.");
    const hash = window.location.hash;
    console.log(hash);

    const hashArray: string[] = hash.split("/");

    const subRoute = hashArray[hashArray.length - 1];

    const kycApplications = document.getElementById(
      "applications"
    ) as HTMLUListElement;
    const manageUsers = document.getElementById("users") as HTMLUListElement;

    if (subRoute === "manage-users") {
      manageUsers.style.backgroundColor = "blue";
      manageUsers.style.color = "white";
      kycApplications.style.backgroundColor = "white";
      kycApplications.style.color = "black";
    } else {
      kycApplications.style.backgroundColor = "blue";
      kycApplications.style.color = "white";
      manageUsers.style.backgroundColor = "white";
      manageUsers.style.color = "black";
    }

    kycApplications.onclick = (e: MouseEvent) => {
        e.preventDefault();

        console.log("kyc applications clicked");
        Navigator.navigateTo(`/${VERIFY_KYC_APPLICATIONS_PATH}`);
    }

     manageUsers.onclick = (e: MouseEvent) => {
        e.preventDefault();

        console.log("kyc applications clicked");
        Navigator.navigateTo(`/${MANAGE_USERS_PATH}`);
    }
  };
}
