/**
 * Class representing an admin dashboard page.
 * @class
 */
export class AdminDashboard {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/admin_dashboard.html");
    return response.text();
  };
}
