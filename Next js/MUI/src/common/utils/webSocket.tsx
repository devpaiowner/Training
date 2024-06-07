import { useState, useCallback, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import useStore from "../zustand/store";

const WebSocketComponent = ({ socketClient = "" } = {}) => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl] = useState(process.env.NEXT_PUBLIC_WS_HOST);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    queryParams: {
      "x-request-socket-client": socketClient,
    },
    onOpen: () => console.log("Socket opened"),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: 1000,
    reconnectInterval: 3000,
    retryOnError: true,
  });
  const { storeData, setStoreData } = useStore((state) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));

  const onMessage = useCallback(
    (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (e) {}
      const traceId = data?.traceId;
      console.log("socket response");
      console.log(data);
      console.log(traceId);
      if (traceId) {
        setStoreData({ [storeData?.[traceId] || "loginStatus"]: data });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storeData]
  );

  useEffect(() => {
    setStoreData({ socketStatus: readyState });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyState]);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("socket message", lastMessage);
      onMessage(lastMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage]);
  return null;
};

export default WebSocketComponent;
