import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useWalletClient, useAccount } from "wagmi";
import { useContext } from "react";
import Signer from "../components/Signer";
import { SocketIOContext } from "../components/SocketIOContext";
import { RequireAddress } from "../components/RequireAddress";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Home: NextPage = () => {
  const { data: walletClient } = useWalletClient();
  const { address, addresses } = useAccount();
  const { options } = useContext(SocketIOContext);

  const specificAddressRequired = !!options && options.address;
  const isCorrectAddress = address?.toLowerCase() === options?.address?.toLowerCase();
  const shouldShowSigner = !!walletClient && (!specificAddressRequired || isCorrectAddress);

  return (
    <div className={styles.container}>
      <Head>
        <title>SafeSigner</title>
        <meta
          content="Sign transactions and messages from the CLI without needing to copy your private key from your mobile or browser wallet"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        zIndex: 10
      }}>
        <ConnectButton />
      </div>
      
      <h1>SafeSigner</h1>
      <p>Connect your wallet to sign transactions and messages</p>
      {specificAddressRequired && <RequireAddress />}
      {shouldShowSigner && <Signer />}
    </div>
  );
};

export default Home;
