import React, { useContext } from "react";
import { Socket } from "socket.io-client";
import { SafeSignerRequest } from "..";
import { useWalletClient } from "wagmi";
import SwitchChain from "./SwitchChain";
import { SocketIOContext } from "./SocketIOContext";

const WalletContext = () => {
  const { data: walletClient } = useWalletClient();
  const socketContext = useContext(SocketIOContext);

  return (
    <div>
      <div>
      {walletClient && socketContext && socketContext.request && socketContext.emit && (
        <SwitchChain emit={socketContext.emit} request={socketContext.request} walletClient={walletClient} />
        )
      }
      </div>
    </div>
  );
};

export default WalletContext;
