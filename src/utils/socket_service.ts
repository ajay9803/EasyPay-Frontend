import { io, Socket } from "socket.io-client";
import { Toast } from "./toast";
import UserSocketService from "../services/user_socket";
import UserUtils from "./user";

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
        console.log("Connected to socket server");

        const accessToken = UserUtils.getAccessToken();
        console.log("Socket ID: ", this.getSocketId());

        await UserSocketService.createSocket(accessToken, this.getSocketId()!)
          .then((data) => {
            Toast.showToast(data.message);
          })
          .catch((e) => {
            Toast.showToast(e.message);
          });
      });

      this.socket.on("disconnect", async () => {
        console.log("Disconnected from socket server");

        const accessToken = UserUtils.getAccessToken();
        console.log("Socket ID: ", this.getSocketId());

        await UserSocketService.deleteSocket(accessToken)
          .then((data) => {
            Toast.showToast(data.message);
          })
          .catch((e) => {
            Toast.showToast(e.message);
          });
      });

      this.socket.on("test", (data: any) => {
        console.log("GOT TEST MESSAGE FROM SERVER.");
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

  private handleBalanceTransfer(data: any) {
    Toast.showToast(data);
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
