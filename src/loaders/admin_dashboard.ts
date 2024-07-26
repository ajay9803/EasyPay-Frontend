export class AdminDashboard {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/admin_dashboard.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {};
}
