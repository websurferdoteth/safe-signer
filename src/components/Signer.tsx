import { useContext, useEffect } from "react";
import { SocketIOContext } from "./SocketIOContext";
import { useProcessRequest } from "../hooks";

const Signer = () => {
  const { request } = useContext(SocketIOContext);
  const processRequest = useProcessRequest();

  useEffect(() => {
    if (!request) return;

    processRequest(request);
  }, [request, processRequest])

  return null;
};

export default Signer;
