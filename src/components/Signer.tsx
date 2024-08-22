import React, { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { SafeSignerRequest } from "../";
import {
  PrepareTransactionRequestParameters,
  SignMessageParameters,
  SignTransactionParameters,
  SignTypedDataParameters,
  WalletClient,
} from "viem";

const handledRequests = new Set();

const Signer = ({
  socket,
  request,
  walletClient,
}: {
  socket: Socket;
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
            const tx = await walletClient?.prepareTransactionRequest(req as PrepareTransactionRequestParameters);
            const signed = await walletClient?.sendTransaction(
              tx as unknown as SignTransactionParameters<any,any>
            );
            response = { data: signed };
          } 
        } catch (error: any) {
          console.error(error);
          response = { error: error?.message };
        }

        if (socket) {
          socket.emit("response", response);
        }
      } catch (error) {
        console.error("Failed to sign message:", error);
      }
    };

    handleRequest(request);
  }, []);

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
