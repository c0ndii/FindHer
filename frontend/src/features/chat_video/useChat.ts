import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useVideoChat = (target:string) => {
    const [connection, setConnection] = useState<HubConnection>()

    const joinChatRoom = async () => {
      try {
        const conn = new HubConnectionBuilder()
          .withUrl('https://localhost:44360/videoHub', {
            accessTokenFactory: () => `Bearer ${Cookies.get('token')}`,
          })
          .configureLogging(LogLevel.None)
          .build()

        await conn.start()
        console.log(conn)
        setConnection(conn)
      } catch (e) {
        console.log(e)
      }
    }

  useEffect(() => {
    if (target !== '' && connection?.state === 'Connected') {
      //callUser(target);
    }
  }, [target, connection]);


  const callUser = async (targetId: string) => {
    try {
      await connection?.invoke("CallUser", targetId);
      console.log('called')
    } catch (error) {
      console.error("Error calling user: ", error);
    }
  };

  const receiveSignal = (eventName: string, handler: (data: any) => void) => {
    connection?.on(eventName, handler);
  };

  const sendSignal = async (eventName: string, data: any) => {
    if (connection?.state === "Connected") {
      try {
        await connection?.send(eventName, data);
        console.log('sending signal:', eventName)
      } catch (error) {
        console.error("Error sending signal: ", error);
      }
    } else {
      console.error("Cannot send data if the connection is not in the 'Connected' State.");
    }
  };


  return { joinChatRoom,callUser, receiveSignal, sendSignal };
};
