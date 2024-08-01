export class ManageUsers {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/manage_users.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {
  };
}
