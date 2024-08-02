import { HOST_NAME } from "../constants/auth";

class UserSocketService {
  static createSocket = async (token: string, socketId: string) => {
    const url = `${HOST_NAME}/sockets`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          socketId: socketId,
        }),
      });

      const jsonData = await response.json();

      if (response.status === 200) {
        return jsonData;
      } else {
        throw new Error(jsonData.message);
      }
    } catch (e) {
      throw e;
    }
  };

  static deleteSocket = async (token: string) => {
    const url = `${HOST_NAME}/sockets`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const jsonData = await response.json();

      console.log("Deleting the socket.");

      console.log("The json data on deletion is: ", jsonData);
      if (response.status === 200) {
        return jsonData;
      } else {
        throw new Error(jsonData.message);
      }
    } catch (e) {
      throw e;
    }
  };
}

export default UserSocketService;
