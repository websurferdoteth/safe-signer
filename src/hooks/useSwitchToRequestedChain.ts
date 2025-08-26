import { useCallback, useContext } from "react";
import { useWalletClient } from "wagmi";
import { extractChainIdFromRequest, getChain } from "../utils/chains";
import { SocketIOContext } from "../components/SocketIOContext";


export const useSwitchToRequestedChain = () => {
  const { data: walletClient } = useWalletClient();
  const { request } = useContext(SocketIOContext);

  const switchChain = useCallback(async (): Promise<void> => {
    if (!request) return;
    
    const targetChainId = extractChainIdFromRequest(request);
    if (!targetChainId) return;
    
    try {
      await walletClient?.switchChain({ id: targetChainId });
    } catch (error: any) {
      console.log("error in switchToChain", error);
      if (error.code === 4902) {
        console.log("chain not found, adding chain");
        const requestChain = getChain(targetChainId);
        console.log("requestChain", requestChain);
        if (!requestChain) {
          throw new Error(`Unable to find chain configuration for chain ID: ${targetChainId}`);
        }
        await walletClient?.addChain({ chain: requestChain });
        await walletClient?.switchChain({ id: targetChainId });
        
      } else {
        throw error;
      }
    }
  }, [walletClient, request]);

  return switchChain;
}; 