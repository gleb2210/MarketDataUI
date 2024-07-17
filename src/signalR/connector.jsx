import React from "react";

import * as signalR from "@microsoft/signalr";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect, disconnect, updateCache } from "../redux/dataSlice";

const Connector = () => {
  const dispatch = useDispatch();
  const { connection } = useSelector((state) => state.data);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (connection) {
      connection.start().catch((e) => console.log("Connection Failed", e));
    }
  }, [connection]);

  const handleConnect = () => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl("wss://localhost:7218/market-hub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    conn.on("ReceivedMessage", (deleteIds, updateData) => {
      dispatch(updateCache({ deleteIds, updateData }));
    });

    dispatch(connect(conn));
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    connection?.stop();
    dispatch(disconnect(null));
    setIsConnected(false);
  };

  return (
    <>
      <div>
        <button onClick={handleConnect} disabled={isConnected}>
          Connect
        </button>
        <button onClick={handleDisconnect} disabled={!isConnected}>
          Disconnect
        </button>
      </div>
    </>
  );
};

export default Connector;
