import { useCallback, useContext } from "react";
import { SafeSignerRequest } from "../";
import {
  PrepareTransactionRequestParameters,
  SignMessageParameters,
  SignTransactionParameters,
  SignTypedDataParameters,
} from "viem";
import { getChain } from "../utils/chains";
import { SocketIOContext } from "../components/SocketIOContext";
import { useWalletClient } from "wagmi";
import { useIsRequestedChain, useSwitchToRequestedChain } from "./index";

const handledRequests = new Set();

export const useProcessRequest = () => {
  const { emit } = useContext(SocketIOContext);
  const { data: walletClient } = useWalletClient();
  const isRequestedChain = useIsRequestedChain();
  const switchToRequestedChain = useSwitchToRequestedChain();
  
  const processRequest = useCallback(async (req: SafeSignerRequest) => {
    if (!isRequestedChain) await switchToRequestedChain()

    const requestId = `SigningPhase:${JSON.stringify(req)}`;
    if (handledRequests.has(requestId)) {
      return;
    }

    handledRequests.add(requestId);
    try {
      let response;
      try {
        if ((req as SignTypedDataParameters).types) {
          const signed = await walletClient?.signTypedData(
            req as unknown as SignTypedDataParameters
          );
          response = { data: signed };
        } else if ((req as SignMessageParameters).message) {
          const signed = await walletClient?.signMessage(
            req as unknown as SignMessageParameters
          );
          response = { data: signed };
        } else if (req as PrepareTransactionRequestParameters) {
          const unsignedTx = Object.assign({}, req) as PrepareTransactionRequestParameters;
          // Convert chain to Chain object
          if (unsignedTx.chain) {
            unsignedTx.chain = getChain(unsignedTx.chain);
          }
          const tx = await walletClient?.prepareTransactionRequest(unsignedTx);
          const signed = await walletClient?.sendTransaction(
            tx as unknown as SignTransactionParameters<any,any>
          );
          response = { data: signed };
        } 
      } catch (error: any) {
        response = { error: error?.message };
      }

      emit && emit("response", response);
      
    } catch (error) {
      console.error("Failed to sign message:", error);
    }
  }, [emit, walletClient, isRequestedChain, switchToRequestedChain]);

  return processRequest;
}; 