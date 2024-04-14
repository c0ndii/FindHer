import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";

export const useVideoChat = (targetId:string) => {
  const [connection, setConnection] = useState<HubConnection | undefined>(undefined);

  const conn = useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:44360/videoHub", {
        accessTokenFactory: () => `Bearer ${Cookies.get("token")}`,
      })
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection);

    newConnection.on("IncomingCall", (caller) => {
    });

    return () => {
      newConnection.off("IncomingCall");
      newConnection.stop();
    };
  }, []);

  const startConnection = async () => {
    try {
      await connection?.start();
      console.log("SignalR connected.");
    } catch (error) {
      console.error("SignalR connection error: ", error);
    }
  };

  const callUser = async (targetConnectionId: string) => {
    try {
      await connection?.invoke("CallUser", targetConnectionId);
    } catch (error) {
      console.error("Error calling user: ", error);
    }
  };

  return { startConnection, callUser };
};
