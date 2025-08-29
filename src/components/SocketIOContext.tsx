import React, {
  ReactNode,
  useEffect,
  useState,
  useRef,
  createContext,
} from "react";
import io, { Socket } from "socket.io-client";
import { SafeSignerOptions, SafeSignerRequest } from "..";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export type SocketIOEmitter = (<Ev extends string>(
  ev: Ev,
  ...args: any[]
) => Socket<DefaultEventsMap, DefaultEventsMap>);

const defaultContext = {
  request: null as SafeSignerRequest | null,
  options: null as SafeSignerOptions | null,
  emit: undefined as SocketIOEmitter | undefined,
};

export const SocketIOContext = createContext(defaultContext);

export const SocketIOProvider = ({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element => {
  const [request, setRequest] = useState<SafeSignerRequest | null>(null);
  const [options, setOptions] = useState<SafeSignerOptions | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io();

      socketRef.current.on("connect", () => {
        console.log("Connected to server");
        socketRef.current?.emit("ready");
      });

      socketRef.current.on("request", (newRequest, options) => {
        setRequest(newRequest);
        setOptions(options);
        console.log("Received request", newRequest, options);
      });

      socketRef.current.on("disconnect", () => {
        console.log("Disconnected from server");
        window.close();
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  const ret = {
    request,
    options,
    emit: socketRef.current?.emit.bind(socketRef.current),
  };

  return (
    <SocketIOContext.Provider value={ret}>{children}</SocketIOContext.Provider>
  );
};
