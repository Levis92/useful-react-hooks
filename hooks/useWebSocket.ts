import { useRef, useEffect, MutableRefObject } from 'react';

export type OnMessage = (this: WebSocket, ev: MessageEvent) => any;

export type OnError = (this: WebSocket, ev: Event) => any;

export type Protocols = string | string[];

export const useWebSocket = (
  url: string,
  protocols: Protocols,
  onMessage: OnMessage,
  onError: OnError
): MutableRefObject<any> => {
  const ws = useRef(null);
  useEffect(() => {
    const socket = new WebSocket(url, protocols);
    socket.onmessage = onMessage;
    socket.onerror = onError;
    ws.current = socket;
    return () => {
      ws.current.close();
    };
  }, []);

  return ws;
};
