import { useEffect, useMemo, useRef, useState } from "react";
export enum WsStatus {
  UNINSTANTIATED = "UNINSTANTIATED",
  OPEN = "OPEN",
  CLOSING = "CLOSING",
  CLOSED = "CLOSED",
}

interface IUseWS {
  url: string;
  onOpen?(): void;
  onMessage?(message: any, event: WebSocketMessageEvent): void;
  onClose?(message?: any, event?: WebSocketCloseEvent): void;
  onError?(message?: any, event?: WebSocketErrorEvent): void;
}

const useWS = ({ url, onOpen, onMessage, onClose, onError }: IUseWS) => {
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [lastJsonMessage, setLastJsonMessage] = useState<any | null>(null);

  const [status, setStatus] = useState<WsStatus>(WsStatus.UNINSTANTIATED);

  const wsRef = useRef<WebSocket | null>(null);

  const getInstanceWS = (url: string) => {
    if (wsRef.current) {
      return wsRef.current;
    }
    wsRef.current = new WebSocket(url);
    return wsRef.current;
  };

  useEffect(() => {
    const ws = getInstanceWS(url);
    ws.onmessage = (event) => {
      onMessage && onMessage(event.data, event);
      setLastMessage(event.data);
      try {
        if (typeof event.data === "string") {
          setLastJsonMessage(JSON.parse(event.data));
        } else {
          setLastJsonMessage(event.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    ws.onopen = () => {
      setStatus(WsStatus.OPEN);
      onOpen && onOpen();
    };

    ws.onclose = (event) => {
      setStatus(WsStatus.CLOSED);
      //@ts-ignore
      onClose && onClose(event.data, event);
    };
    ws.onerror = (error) => {
      setStatus(WsStatus.CLOSING);
      onError && onError(error.message, error);
    };
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    try {
      wsRef.current?.send(message);
    } catch (error) {
      console.log(error);
    }
  };
  const sendJsonMessage = (message: Object | Array<any>) => {
    wsRef.current?.send(JSON.stringify(message));
  };

  return useMemo(
    () => ({
      lastMessage,
      lastJsonMessage,
      status,
      ws: wsRef.current,
      sendMessage,
      sendJsonMessage,
    }),
    [lastMessage, lastJsonMessage, status]
  );
};

export default useWS;
