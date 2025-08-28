import { useContext } from "react";
import { useAccount } from "wagmi";
import { getIsCorrectChain } from "../utils/chains";
import { SocketIOContext } from "../components/SocketIOContext";


export const useIsRequestedChain = () => {
  const { chain } = useAccount();
  const { request } = useContext(SocketIOContext);

  return getIsCorrectChain(chain?.id ?? 0, request);
}; 