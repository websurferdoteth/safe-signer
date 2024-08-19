import React, { useEffect } from "react";
import { Socket } from "socket.io-client";
import { SafeSignerRequest } from "../";
import { useWalletClient } from "wagmi";
import { SignMessageParameters, SignTransactionParameters, WalletClient } from "viem";
import { SignTypedDataParameters } from "viem/accounts";
import { compareChains, getChain } from "../utils/chains";

const Signer = ({
  socket,
  request,
}: {
  socket: Socket;
  request: SafeSignerRequest;
}) => {
  const { data: walletClient } = useWalletClient();
  const handleRequest = async (req: SafeSignerRequest) => {
    if (!walletClient) {
      console.error("Wallet client not available");
      return;
    }

    try {
      let response;

      try {
      if (req.type === "transaction") {
        const signed = await walletClient.signTransaction(req.data as unknown as SignTransactionParameters<any, any>);
        response = { success: true, data: signed };
        // TODO: DO I need to differentiate between signTransaction, signMessage and signTypedMessage?
      } else if (req.type === "EIP712Message") {
        const signed = await walletClient.signTypedData(
          req.data as unknown as SignTypedDataParameters
        );
        response = { success: true, data: signed };
      } else if (req.type === "message") {
          const signed = await walletClient.signMessage(
            req.data as unknown as SignMessageParameters
          );
          response = { success: true, data: signed };
      } else if (req.type === "switchChain") {
          const requestChain = getChain(
            (req.data as { network: string | number })?.network
          );
          // TODO: Add chain to wallet if not already there
          if (!requestChain) {
            console.error(
              "Invalid network:",
              (req.data as { network: string | number })?.network
            );
            throw new Error("Unsupported network");
          }
          const chainId = requestChain.id;
          const currentChainId = walletClient?.chain.id;
  
          if (!compareChains(currentChainId as number, chainId)) {
            await walletClient?.switchChain({ id: chainId });
          }
          // Chain must already be same as requested chain
          response = { success: true };
      }
    } catch (error: any) {
      console.error("Failed to switch chain:", error);
      response = { error: error?.message };
    }

      if (socket) {
        socket.emit("signedResponse", response);
      }
      window.close();
    } catch (error) {
      console.error("Failed to sign message:", error);
    }
  };

  useEffect(() => {
    if (walletClient && request) {
      handleRequest(request);
    }
  }, [request]);

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
