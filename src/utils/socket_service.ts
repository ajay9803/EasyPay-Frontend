import { io, Socket } from "socket.io-client";
import { Toast } from "./toast";
import UserSocketService from "../services/user_socket";
import UserUtils from "./user";
import { HomeActions } from "../scripts/home";

class SocketService {
  private url: string;
  private socket: Socket | null;

  constructor(url: string) {
    this.url = url;
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(this.url);

      this.socket.on("connect", async () => {
        const accessToken = UserUtils.getAccessToken();

        await UserSocketService.createSocket(accessToken, this.getSocketId()!)
          .then((data) => {
            console.log(data.message);
          })
          .catch((e) => {
            console.log(e.message);
          });
      });

      this.socket.on("disconnect", async () => {
        console.log("Disconnected from socket server");

        const accessToken = UserUtils.getAccessToken();
        console.log("Socket ID: ", this.getSocketId());

        await UserSocketService.deleteSocket(accessToken)
          .then((data) => {
            console.log(data.message);
          })
          .catch((e) => {
            console.log(e.message);
          });
      });

      this.socket.on("balance-transfer", (data: any) => {
        this.handleBalanceTransfer(data);
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  private async handleBalanceTransfer(data: {
    amount: number;
    message: string;
  }) {
    Toast.showToast(data.message);
    const hash = window.location.hash || "#/home";

    if (hash.includes("/home")) {
      HomeActions.getUpdatedBalance(`${data.amount}`);
    }
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  getSocketId(): string | null | undefined {
    return this.socket ? this.socket.id : null;
  }
}

export default SocketService;
