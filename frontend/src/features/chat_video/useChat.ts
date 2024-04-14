import * as signalR from "@microsoft/signalr";


    const connection = new signalR.HubConnectionBuilder()
      .withUrl("/videoHub")
      .configureLogging(signalR.LogLevel.None)
      .build();

    connection.on("IncomingCall", (caller) => {
    });

  export const startConnection= async ()=> {
    try {
      await connection.start();
      console.log("SignalR connected.");
    } catch (error) {
      console.error("SignalR connection error: ", error);
    }
  }

  export const callUser = async (targetConnectionId: string) => {
    try {
      await connection.invoke("CallUser", targetConnectionId);
    } catch (error) {
      console.error("Error calling user: ", error);
    }
  }


