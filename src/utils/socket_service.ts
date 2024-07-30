import { io, Socket } from "socket.io-client";
import { Toast } from "./toast";

class SocketService {
  private url: string;
  // private userId: string;
  private socket: Socket | null;

  constructor(url: string) {
    this.url = url;
    // this.userId = userId;
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(this.url, {
        // query: { userId: this.userId },
      });

      this.socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
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
}

export default SocketService;
