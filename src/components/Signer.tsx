import React, { useEffect } from "react";
import { SafeSignerRequest } from "../";
import {
  PrepareTransactionRequestParameters,
  SignMessageParameters,
  SignTransactionParameters,
  SignTypedDataParameters,
  WalletClient,
} from "viem";
import { getChain } from "../utils/chains";
import { SocketIOEmitter } from "./SocketIOContext";

const handledRequests = new Set();

const Signer = ({
  emit,
  request,
  walletClient,
}: {
  emit: SocketIOEmitter;
  request: SafeSignerRequest;
  walletClient: WalletClient;
}) => {
  useEffect(() => {
    const handleRequest = async (req: SafeSignerRequest) => {
      const requestId = `SigningPhase:${JSON.stringify(req)}`;
      if (handledRequests.has(requestId)) {
        return;
      }

      handledRequests.add(requestId);
      try {
        let response;

        try {
          // Handle different types of requests
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
          console.error(error);
          response = { error: error?.message };
        }

        
        emit("response", response);
        
      } catch (error) {
        console.error("Failed to sign message:", error);
      }
    };

    handleRequest(request);
  }, [request, emit, walletClient]);

  return (
    <div>
      <h2>Received Requests</h2>
      <ul>
        {request && (
          <li key={JSON.stringify(request)}>{JSON.stringify(request)}</li>
        )}
      </ul>
    </div>
  );
};

export default Signer;
