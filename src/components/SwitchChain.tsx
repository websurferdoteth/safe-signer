import React, { useCallback, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { SafeSignerRequest } from "..";
import { compareChains, getChain } from "../utils/chains";
import { Chain, PrepareTransactionRequestParameters, WalletClient } from "viem";
import { SignEip712TransactionParameters } from "viem/zksync";
import { SignTypedDataParameters } from "viem/accounts";

const handledSwitchChainRequests = new Set();

const SwitchChain = ({
  socket,
  request,
  walletClient,
  setIsCorrectChain,
}: {
  socket: Socket;
  request: SafeSignerRequest;
  walletClient: WalletClient;
  setIsCorrectChain: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  const handleSwitchChain = useCallback(async (req: SafeSignerRequest) => {
    console.log("Switching chain request:", req);
      const requestId = `SwitchingChainPhase:${JSON.stringify(req)}`;
      if (handledSwitchChainRequests.has(requestId)) {
        console.log("Already handled switch chain request");
        return;
      }
      handledSwitchChainRequests.add(requestId);
      try {
        // Find chain from request
        let chain: Chain | string | number | undefined | null;
        if ((req.data as unknown as SignTypedDataParameters)?.domain?.chainId) {
          chain = (req.data as unknown as SignTypedDataParameters)?.domain?.chainId;
        } else if ((req.data as PrepareTransactionRequestParameters)?.chain) {
          chain = (req.data as PrepareTransactionRequestParameters)?.chain;
        }
        
        // Switch chain if needed
        if (chain) {
          const requestChain = getChain(chain);
          // TODO: Add chain to wallet if not already there
          if (!requestChain) {
            console.error("Invalid chain:", chain);
            throw new Error("Unsupported chain");
          }
          const chainId = requestChain.id;
          const currentChainId = walletClient?.chain?.id;

          if (!compareChains(currentChainId as number, chainId)) {
            await walletClient?.switchChain({ id: chainId });
          }
        }
        setIsCorrectChain(true);
      } catch (error: any) {
        console.error("Failed to switch chain:", error);
        socket.emit("response", { error: error?.message });
      }
  }, [walletClient, request]);

  useEffect(() => {
    handleSwitchChain(request);
  }, []);

  return (
    <div>
      <h1>Switching to correct chain</h1>
    </div>
  );
};

export default SwitchChain;
