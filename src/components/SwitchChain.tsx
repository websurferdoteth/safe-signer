import React, { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { SafeSignerRequest } from "..";
import { compareChains, getChain } from "../utils/chains";
import { WalletClient } from "viem";

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
  const isTriggered = useRef(false);

  useEffect(() => {
    const handleSwitchChain = async (req: SafeSignerRequest) => {
        const requestId = `SwitchingChainPhase:${JSON.stringify(req)}`;
        if (handledSwitchChainRequests.has(requestId)) {
          return;
        }
        handledSwitchChainRequests.add(requestId);
        try {
          isTriggered.current = true;
          // Switch chain if needed
          if (req.chain) {
            const requestChain = getChain(req.chain);
            // TODO: Add chain to wallet if not already there
            if (!requestChain) {
              console.error("Invalid chain:", req.chain);
              throw new Error("Unsupported chain");
            }
            const chainId = requestChain.id;
            const currentChainId = walletClient?.chain?.id;

            if (!compareChains(currentChainId as number, chainId)) {
              await walletClient?.switchChain({ id: chainId });
            }
            setIsCorrectChain(true);
          }
        } catch (error: any) {
          console.error("Failed to switch chain:", error);
          socket.emit("response", { error: error?.message });
        }
    };

    handleSwitchChain(request);
  }, []);

  return (
    <div>
      <h1>Switching to correct chain</h1>
    </div>
  );
};

export default SwitchChain;
