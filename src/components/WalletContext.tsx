import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { SafeSignerRequest } from "..";
import { useWalletClient } from "wagmi";
import Signer from "./Signer";
import SwitchChain from "./SwitchChain";

const WalletContext = ({
  socket,
  request,
}: {
  socket: Socket;
  request: SafeSignerRequest;
}) => {
  const { data: walletClient } = useWalletClient();
  const [ isCorrectChain, setIsCorrectChain ] = useState(false);

  useEffect(() => {
    setIsCorrectChain(false);
  }, [request]);
  
  return (
    <div>
      <div>
      {walletClient && !isCorrectChain && (
        <SwitchChain socket={socket} request={request} walletClient={walletClient} setIsCorrectChain={setIsCorrectChain} />
        )
      }
      </div>
      <div>
      {walletClient && isCorrectChain && (
        <Signer socket={socket} request={request} walletClient={walletClient} />
        )
      }
      </div>
    </div>
  );
};

export default WalletContext;
