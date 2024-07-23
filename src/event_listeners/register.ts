import { RegisterActions } from "../scripts/register";

export class RegisterPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/register");
    return response.text();
  };

  static initEventListeners: () => void = () => {
    RegisterActions.register();
  };
}
