import React, { useCallback, useEffect, useState } from "react";
import { SafeSignerRequest } from "..";
import { compareChains, getChain } from "../utils/chains";
import { Chain, PrepareTransactionRequestParameters, WalletClient } from "viem";
import { SignTypedDataParameters } from "viem/accounts";
import Signer from "./Signer";;
import { SocketIOEmitter } from "./SocketIOContext";

const handledSwitchChainRequests = new Set();

const SwitchChain = ({
  emit,
  request,
  walletClient,
}: {
  emit: SocketIOEmitter;
  request: SafeSignerRequest;
  walletClient: WalletClient;
}) => {
  const [ isCorrectChain, setIsCorrectChain ] = useState(false);

  const handleSwitchChain = useCallback(async (req: SafeSignerRequest) => {
      const requestId = `SwitchingChainPhase:${JSON.stringify(req)}`;
      if (handledSwitchChainRequests.has(requestId)) {
        return;
      }
      handledSwitchChainRequests.add(requestId);
      try {
        // Find chain from request
        let chain: Chain | string | number | undefined | null;
        if ((req as unknown as SignTypedDataParameters)?.domain?.chainId) {
          chain = (req as unknown as SignTypedDataParameters)?.domain?.chainId;
        } else if ((req as PrepareTransactionRequestParameters)?.chain) {
          chain = (req as PrepareTransactionRequestParameters)?.chain;
        }

        // Switch chain if needed
        if (chain) {
          const requestChain = getChain(chain);
          if (!requestChain) {
            console.error("Invalid chain:", chain);
            throw new Error("Unsupported chain");
          }

          const chainId = requestChain.id;
          const currentChainId = walletClient?.chain?.id;
          if (!compareChains(currentChainId as number, chainId)) {
            try {
              await walletClient?.switchChain({ id: chainId });
            } catch (error: any) {
              // Handle chain not found error
              if (error.code == 4902) {
                // Adding the chain
                await walletClient?.addChain({ chain: requestChain });
                await walletClient?.switchChain({ id: chainId });
              } else {
                throw error;
              }
            }
          }
        }
        setIsCorrectChain(true);
      } catch (error: any) {
        console.error("Failed to switch chain:", error);
        emit("response", { error: error?.message });
        setIsCorrectChain(false);
      }
  }, [walletClient, emit]);

  useEffect(() => {
    if (!isCorrectChain) {
      handleSwitchChain(request);
    }
  }, [handleSwitchChain, isCorrectChain, request]);

  return (
    <div>
      <div>
        {!isCorrectChain ? <h1>Switched to correct chain</h1> : null}
      </div>
      <div>
        {isCorrectChain ? <Signer emit={emit} request={request} walletClient={walletClient} /> : null}
      </div>
    </div>
  );
};

export default SwitchChain;
